import React from 'react'
import styles from "@/styles/Placement.module.css"
import Navbar from '@/components/Navbar';
import comingSoon from "../assets/coming.png";
import Image from 'next/image';
import Footer from '@/components/Footer';

const Placement = () => {
  return (
    <>
      <Navbar/>
      <div className={styles.placementPage}>
        <Image src={comingSoon} alt="coming soon image" />
        <div className="cover"></div>
        <div className="cover2"></div>
        <Footer />
      </div>
    </>
  )
}

export default Placement;