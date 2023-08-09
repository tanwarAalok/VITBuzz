import ClubTable from '@/components/ClubTable'
import React, {useEffect} from 'react';
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from '@/components/AdminDrawer';
import { useRouter } from 'next/router';
import SomethingWentWrong from '@/components/SomethingWentWrong';
import useFetch from '@/utils/hooks/useFetch';
import Loader from '@/components/Loading';
import {signIn, useSession} from "next-auth/react";

const ClubManage = () => {
  const { isLoading, apiData, serverError } = useFetch("/api/club"); 
  if (serverError) return <SomethingWentWrong error={serverError} />;
  
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
          {isLoading ? <Loader/> : <ClubTable data={apiData} />}
        </div>
      </div>
    </>
  );
}

export default ClubManage