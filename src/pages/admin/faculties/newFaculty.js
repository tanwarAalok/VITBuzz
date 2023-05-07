import AdminDrawer from '@/components/AdminDrawer';
import FacultyForm from '@/components/FacultyForm';
import styles from "@/styles/AdminHome.module.css";
import React, { useState } from 'react'

const NewFaculty = () => {
    const [data, setData] = useState({});
  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>Add new Faculty</h2>
          </div>
                  <FacultyForm setData={setData} />
        </div>
      </div>
    </>
  );
}

export default NewFaculty;