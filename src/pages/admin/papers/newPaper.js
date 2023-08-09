import AdminDrawer from "@/components/AdminDrawer";
import FacultyForm from "@/components/FacultyForm";
import PaperForm from "@/components/Paperform";
import styles from "@/styles/AdminHome.module.css";
import React, {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

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
