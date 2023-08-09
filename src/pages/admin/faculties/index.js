import React, {useEffect} from "react";
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from "@/components/AdminDrawer";
import FacultyTable from "@/components/FacultyTable";
import { useRouter } from "next/router";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import {signIn, useSession} from "next-auth/react";

const FacultyManage = () => {
  
  const { isLoading, apiData, serverError } = useFetch("/api/faculty");
  if (serverError) return <SomethingWentWrong error={serverError} />;


  return (
    <>
      <div className={styles.main}>
        <AdminDrawer styles={styles} />
        <div className={styles.contentWrapper}>
          <div className={styles.rightTopHeader}>
            <h2>All Faculty</h2>
            <button onClick={() => router.push("/admin/faculties/newFaculty")}>
              Create new +{" "}
            </button>
          </div>
          {isLoading ? <Loader/> : <FacultyTable data={apiData} />}
        </div>
      </div>
    </>
  );
};

export default FacultyManage;
