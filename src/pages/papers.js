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
        <h1>Coming soon...</h1>
      </div>
      <Footer />
    </>
  );
}

export default Paper