import AdminDrawer from "@/components/AdminDrawer";
import FacultyForm from "@/components/FacultyForm";
import PaperForm from "@/components/Paperform";
import styles from "@/styles/AdminHome.module.css";
import React, { useState } from "react";

const NewPaper = () => {
  const [data, setData] = useState({});
  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>Add new paper</h2>
          </div>
          <PaperForm setData={setData} />
        </div>
      </div>
    </>
  );
};

export default NewPaper;
