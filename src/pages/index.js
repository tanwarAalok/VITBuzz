import Navbar from '@/components/Navbar'
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import vitImg from "../assets/vit1.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import Footer from '@/components/Footer';
import FacultyCard from '@/components/FacultyCard';
import { useEffect, useState } from 'react';


export default function Home() {
  const [allFaculty, setAllfaculty] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/faculty")
      .then((res) => res.json())
      .then((data) => {
        setAllfaculty(data.faculty);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  const topFaculty = allFaculty
    ?.sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <div className={styles.vitImage}>
        <Image src={vitImg} alt="vitImage" />
        <div className={styles.vitb}>
          <div>VITB</div>
          <div>
            the best place <br /> to be...
          </div>
        </div>
      </div>

      {/* *************************************** */}

      <div className={styles.topFaculty}>
        <h2>Top Rated Professors</h2>
        <div className={styles.boxParent}>
          {topFaculty?.map((prof) => (
            <FacultyCard key={prof.email} data={prof} isFrontPage={true} />
          ))}
        </div>
      </div>

      {/* *************************************** */}

      <div className={styles.clubSection}>
        <h2>Recent Club Activities</h2>
        <div className={styles.cscp}>
          <Image src={leftArrow} alt="left Arrow" width="50" height="50" />
          <div className={styles.cvc}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ZzE2ejjyEKM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <Image src={rightArrow} alt="right Arrow" width="50" height="50" />
        </div>
      </div>
      {/* *************************************** */}

      <Footer />
    </>
  );
}
