import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ClubsPage.module.css";
import Footer from "@/components/Footer";
import ClubCard from "@/components/ClubCard";

export default function ClubPage() {

   const [allClubs, setAllClubs] = useState(null);
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
     setLoading(true);
     fetch("/api/club")
       .then((res) => res.json())
       .then((data) => {
         setAllClubs(data.club);
         setLoading(false);
       });
   }, []);


  return (
    <>
      <Navbar />
      <div className={styles.clubPage}>
        <div className={styles.options}>
          <input placeholder="Search Club name..." />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.clubCardWrapper}>
            {allClubs?.map((club) => (
              <ClubCard key={club._id} styles={styles} data={club} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
