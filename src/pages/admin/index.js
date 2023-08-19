import React, {useEffect, useState} from 'react';
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from '@/components/AdminDrawer';
import useFetch from "@/utils/hooks/useFetch";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import Loader from "@/components/Loading";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {isAdmin} from "@/utils/helper/Computations";
import ProtectedRoute from "@/server/middlewares/ProtectedRoute";
import {notFound, redirect} from "next/navigation";

const AdminHome = () => {
    const { isLoading, apiData, serverError } = useFetch("/api/admin");
    if (serverError) return <SomethingWentWrong error={serverError} />;


     return (
         <div className={styles.main}>
            <AdminDrawer styles={styles}/>
            <div className={styles.contentWrapper}>
                {
                    isLoading ? <Loader/> : (
                        <>
                            <h1>Admin Dashboard</h1>
                            <div className={styles.homeCardWrapper}>
                                <div className={styles.homeCard}>
                                    <h3>{apiData?.totalUsers}</h3>
                                    <h5>Total Users</h5>
                                </div>
                                <div className={styles.homeCard}>
                                    <h3>{apiData?.totalfaculties}</h3>
                                    <h5>Total Faculty</h5>
                                </div>
                                <div className={styles.homeCard}>
                                    <h3>{apiData?.totalPapers}</h3>
                                    <h5>Total Papers</h5>
                                </div>
                                <div className={styles.homeCard}>
                                    <h3>{apiData?.totalClubs}</h3>
                                    <h5>Total Clubs</h5>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default AdminHome;