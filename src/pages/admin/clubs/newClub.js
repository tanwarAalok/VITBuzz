import AdminDrawer from "@/components/AdminDrawer";
import ClubForm from "@/components/ClubForm";
import styles from "@/styles/AdminHome.module.css";
import React, {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const NewClub = () => {
  const [data, setData] = useState({});
  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>Add new Club</h2>
          </div>
          <ClubForm setData={setData} />
        </div>
      </div>
    </>
  );
};

export default NewClub;
