import ClubTable from '@/components/ClubTable'
import React, { useEffect, useState } from 'react';
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from '@/components/AdminDrawer';
import { useRouter } from 'next/router';

const ClubManage = () => {
  const router = useRouter();
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
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>All Clubs</h2>
            <button onClick={() => router.push("/admin/clubs/newClub")}>
              Create new +{" "}
            </button>
          </div>
          {isLoading ? <h3>Loading...</h3> : <ClubTable data={allClubs} />}
        </div>
      </div>
    </>
  );
}

export default ClubManage