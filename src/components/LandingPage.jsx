import React from 'react'
import FacultyCard from './FacultyCard';
import Image from 'next/image';
import vitImg from "../assets/vit1.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import { Spinner } from 'react-bootstrap';

const LandingPage = ({styles, topFaculty, isLoading}) => {
  return (
    <div className={styles.mainPage}>
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
        {isLoading ? (
          <Spinner/>
        ) : (
          <div className={styles.boxParent}>
            {topFaculty?.map((prof) => (
              <FacultyCard key={prof.email} data={prof} isFrontPage={true} />
            ))}
          </div>
        )}
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
    </div>
  );
}

export default LandingPage