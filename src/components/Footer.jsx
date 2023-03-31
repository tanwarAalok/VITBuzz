import React from 'react'
import styles from "@/styles/Footer.module.css";
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.sectionOne}>
        <h3>VIT <span>Buzz</span></h3>
      </div>
      <div className={styles.sectionTwo}>
        <h4>UNIVERSITY ADDRESS</h4>
        <div>
          <Link href="placements">Placements</Link>
          <Link href="papers">Papers</Link>
          <Link href="faculty">Faculty</Link>
          <Link href="clubs">Clubs</Link>
        </div>
      </div>
      <div className={styles.sectionThree}>
        <h4>VIT Bhopai University</h4>
        <div>
          <p>
            Bhopai-Indore Highway <br />
            Kothrikalan, Sehore <br />
            Madhya Pradesh - 466114 <br />
            Phone: <span>+91/0 75 6025 4500 / 501 / 502 </span>
          </p>
        </div>
      </div>
      <div className={styles.sectionFour}>
        <p> © 2023 All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer