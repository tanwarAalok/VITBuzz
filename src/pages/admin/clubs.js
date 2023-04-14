import ClubTable from '@/components/ClubTable'
import React from 'react';
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from '@/components/AdminDrawer';

const ClubManage = () => {
  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <h2>All Clubs</h2>
          <ClubTable />
        </div>
      </div>
    </>
  );
}

export default ClubManage