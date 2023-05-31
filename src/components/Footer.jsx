import React from 'react'
import styles from "@/styles/Footer.module.css";
import Link from 'next/link'
import Image from 'next/image';
import Logo from "public/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.sectionOne}>
        <Image src={Logo} alt="logo" height={60} width={60} />
        <h3>
          VIT <span>Buzz</span>
        </h3>
      </div>
      <div className={styles.sectionTwo}>
        <h4>University Address </h4>
        <div>
          <Link href="faculty">Faculty</Link>
          <Link href="papers">Papers</Link>
          <Link href="clubs">Clubs</Link>
          <Link href="mentorship">Mentors</Link>
        </div>
      </div>
      <div className={styles.sectionThree}>
        <h4>VIT Bhopal University</h4>
        <div>
          <p>
            Bhopal-Indore Highway <br />
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
  );
}

export default Footer