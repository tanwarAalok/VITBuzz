import Navbar from '@/components/Navbar'
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import vitImg from "../assets/vit1.png";
import sriramImg from "../assets/sriram.jpg"
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import Footer from '@/components/Footer';
import FacultyCard from '@/components/FacultyCard';


export default function Home() {
  const rating = 5;
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
          <FacultyCard/>
          <FacultyCard/>
          <FacultyCard/>
        </div>
      </div>

      {/* *************************************** */}

      <div className={styles.clubSection}>
        <h2>Recent Club Activities</h2>
        <div className={styles.cscp}>
          <Image src={leftArrow} alt="left Arrow" width="50" height="50" />
          <div className={styles.cvc}>
            <iframe src="https://www.youtube.com/watch?v=ZzE2ejjyEKM"></iframe>
          </div>
          <Image src={rightArrow} alt="right Arrow" width="50" height="50" />
        </div>
      </div>
      {/* *************************************** */}

      <Footer/>
      
    </>
  );
}
