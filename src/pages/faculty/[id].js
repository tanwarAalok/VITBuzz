import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "@/styles/FacultyDetailPage.module.css";
import Image from 'next/image';
import RatingModal from '@/components/RatingModal';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';
import RatingGraphs from '@/components/RatingGraphs';


const FacultyDetails = () => {
  const { query } = useRouter();
  const [data, setData] = useState(null);
  
  const [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    useEffect(() => {
      setLoading(true);
      fetch(`/api/faculty/${query.id}`)
        .then((res) => res.json())
        .then((d) => {
          setData(d.data);
          setLoading(false);
        });
    }, [query]);

  if (isLoading) return <h1>Loading..</h1>;
  if (!data) return <p>No data found</p>
  
  return (
    <>
      <Navbar />
      <div className={styles.mainPage}>
        <div className={styles.sec1}>
          <div className={styles.imgCont}>
            <Image src={data?.image} alt="image" width="350" height="400" />
            <div className={styles.ratingBtn} onClick={handleOpen}>
              Rate Teacher
            </div>
            <RatingModal show={open} handleClose={handleClose} />
          </div>
          <div className={styles.contentDiv}>
            <h1>{data?.name}</h1>
            <div>
              <p>{data?.description}</p>
            </div>
          </div>
        </div>

        {data.reviews.length > 0 ? (
          <>
            <div className={styles.sec2}>
              <RatingGraphs styles={styles} data={data}/>
            </div>

            <div className={styles.sec3}>
              <h3>Reviews</h3>
              {data?.reviews?.map((review) => (
                <ReviewCard key={review._id} review={review} styles={styles} />
              ))}

            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
}

export default FacultyDetails