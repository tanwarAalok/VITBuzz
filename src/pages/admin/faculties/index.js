import React, { useEffect, useState } from "react";
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from "@/components/AdminDrawer";
import FacultyTable from "@/components/FacultyTable";
import { useRouter } from "next/router";

const FacultyManage = () => {
    const router = useRouter();
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


  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>All Faculty</h2>
            <button onClick={() => router.push("/admin/faculties/newFaculty") } >Create new + </button>
          </div>
          {isLoading ? <h3>Loading...</h3> : <FacultyTable data={allFaculty} />}
        </div>
      </div>
    </>
  );
};

export default FacultyManage;
