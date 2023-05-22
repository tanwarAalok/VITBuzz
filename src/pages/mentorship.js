import React from 'react'
import styles from "@/styles/MentorshipPage.module.css"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MentorCard from '@/components/MentorCard';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';
import ComingSoon from '@/components/ComingSoon';

const MentorshipPage = () => {
  const [done, setDone] = useState(false);
  return (
    <>
      <Navbar />
      {!done ? (
        <ComingSoon/>
      ) : (
        <div className={styles.mainPage}>
          <SearchBar />
          <div className={styles.cardWrapper}>
            <MentorCard styles={styles} />
            <MentorCard styles={styles} />
            <MentorCard styles={styles} />
            <MentorCard styles={styles} />
            <MentorCard styles={styles} />
            <MentorCard styles={styles} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MentorshipPage;