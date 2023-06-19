import React from 'react'
import FacultyCard from './FacultyCard';
import Image from 'next/image';
import vitImg from "../assets/vit1.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import { Spinner } from 'react-bootstrap';
import ClubActivityCarousel from "@/components/ClubActivityCarousel";

const LandingPage = ({styles, topFaculty, isLoading}) => {
  return (
    <div className={styles.mainPage}>
      <div className={styles.vitImage}>
        <Image src={vitImg} alt="vitImage" />
        <div className={styles.vit_slogan}>
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
            <ClubActivityCarousel styles={styles}/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage