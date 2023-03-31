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
        <Image src={comingSoon} alt="coming soon image" />
        <div className="cover"></div>
        <div className="cover2"></div>
      </div>
      <Footer />
    </>
  );
}

export default Paper