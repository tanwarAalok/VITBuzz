import Navbar from '@/components/Navbar'
import Image from 'next/image';
import React from 'react'
import comingSoon from "../assets/coming.png";
import styles from "@/styles/Paper.module.css";
import Footer from '@/components/Footer';

const Paper = () => {
  return (
    <>
      <Navbar />
      <div className={styles.paperPage}>
        {/* <h1>Coming soon...</h1> */}
        <div className={styles.topOptions}>
          <div className={styles.selectWrapper}>
            <select>
              <option>Select Faculty..</option>
              <option>Dr. Sriram</option>
              <option>Dr. Ganeshan</option>
            </select>

            <select>
              <option>Select Course..</option>
              <option>Computer Networks</option>
              <option>Computer Hardware</option>
            </select>

            <select>
              <option>Select Exam Type..</option>
              <option>Mid-term</option>
              <option>Term-end</option>
            </select>
          </div>
          <button>Search</button>
        </div>
        <div className={styles.result}>
          <object
            type="application/pdf"
            data="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
            width="400"
            height="500"
          ></object>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Paper