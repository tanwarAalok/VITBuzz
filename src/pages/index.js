import Navbar from '@/components/Navbar'
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

import Footer from '@/components/Footer';
import FacultyCard from '@/components/FacultyCard';
import { useEffect, useState } from 'react';
import LandingPage from '@/components/LandingPage';


export default function Home() {
  const [allFaculty, setAllfaculty] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/faculty")
      .then((res) => res.json())
      .then((data) => {
        setAllfaculty(data.faculty);
        setLoading(false);
      });
  }, []);


  const topFaculty = allFaculty
    ?.sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <LandingPage styles={styles} topFaculty={topFaculty} isLoading={isLoading} />
      <Footer />
    </>
  );
}
