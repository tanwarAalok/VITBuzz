import React from 'react';
import styles from "@/styles/AdminHome.module.css";
import Link from 'next/link';
import AdminDrawer from '@/components/AdminDrawer';

const AdminHome = () => {
  return (
      <div className={styles.main}>
          <AdminDrawer styles={styles}/>
          <div className={styles.contentWrapper}></div>
    </div>
  )
}

export default AdminHome;