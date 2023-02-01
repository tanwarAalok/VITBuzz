import React from 'react'
import styles from "@/styles/Placement.module.css"
import Navbar from '@/components/Navbar';
import comingSoon from "../assets/coming.png";
import Image from 'next/image';

const Placement = () => {
  return (
    <>
      <Navbar/>
      <div className={styles.placementPage}>
        <Image src={comingSoon} alt="coming soon image" />
        <div className="cover"></div>
        <div className="cover2"></div>
      </div>
    </>
  )
}

export default Placement;