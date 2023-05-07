import ClubTable from "@/components/ClubTable";
import React, { useEffect, useState } from "react";
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from "@/components/AdminDrawer";
import { useRouter } from "next/router";

const PaperManage = () => {
  const router = useRouter();
   const [allPapers, setAllPapers] = useState(null);
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
     setLoading(true);
     fetch("/api/paper")
       .then((res) => res.json())
       .then((data) => {
         setAllPapers(data.papers);
         setLoading(false);
       });
   }, []);

  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>All Papers</h2>
            <button onClick={() => router.push("/admin/papers/newPaper")}>
              Create new +{" "}
            </button>
          </div>
          {isLoading ? <h3>Loading...</h3> : <ClubTable data={allPapers} />}
        </div>
      </div>
    </>
  );
};

export default PaperManage;
