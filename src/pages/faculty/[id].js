import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "@/styles/FacultyDetailPage.module.css";
import Image from 'next/image';

const FacultyDetails = () => {
    const { query } = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetch(`/api/faculty/${query.id}`)
        .then((res) => res.json())
        .then((d) => {
          setData(d.data);
          setLoading(false);
        });
    }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>
  
  const { avgRating, paperRating, behaviourRating, teachingRating } = data?.ratings;

  const BarColorWidth = (value) => {
    const percentageValue = value * 20;

    if (percentageValue >= 80) {
      return {backgroundColor: "green", width: `${percentageValue}%`}
    }
    else if (percentageValue >= 50) {
      return { backgroundColor: "yellow", width: `${percentageValue}%` };
    }
    else return { backgroundColor: "red", width: `${percentageValue}%` };
  }
  
  return (
    <>
      <Navbar />
      <div className={styles.mainPage}>
        <div className={styles.sec1}>
          <div className={styles.imgCont}>
            <Image src={data?.image} alt="image" width="350" height="400" />
            <div className={styles.ratingBtn}>Rate Teacher</div>
          </div>
          <div className={styles.contentDiv}></div>
        </div>

        <div className={styles.sec2}>
          <div className={styles.ratingDiv}>
            <p>Overall Rating</p>
            <div className={styles.barParent}>
              <div
                style={BarColorWidth(avgRating)}
                className={styles.bar}
              ></div>
            </div>
          </div>
          <div className={styles.ratingDiv}>
            <p>Paper Rating</p>
            <div className={styles.barParent}>
              <div
                style={BarColorWidth(paperRating)}
                className={styles.bar}
              ></div>
            </div>
          </div>
          <div className={styles.ratingDiv}>
            <p>Teaching Rating</p>
            <div className={styles.barParent}>
              <div
                style={BarColorWidth(teachingRating)}
                className={styles.bar}
              ></div>
            </div>
          </div>
          <div className={styles.ratingDiv}>
            <p>Behaviour Rating</p>
            <div className={styles.barParent}>
              <div
                style={BarColorWidth(behaviourRating)}
                className={styles.bar}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyDetails