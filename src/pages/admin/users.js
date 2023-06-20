import React from "react";
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from "@/components/AdminDrawer";
import { useRouter } from "next/router";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import UserTable from "@/components/UserTable";

const UserManage = () => {
    const router = useRouter();

    const { isLoading, apiData, serverError } = useFetch("/api/user");
    if (serverError) return <SomethingWentWrong error={serverError} />;


    return (
        <>
            <div className={styles.main}>
                <AdminDrawer styles={styles} />
                <div className={styles.contentWrapper}>
                    <div className={styles.rightTopHeader}>
                        <h2>All Users</h2>
                    </div>
                    {isLoading ? <Loader/> : <UserTable data={apiData} />}
                </div>
            </div>
        </>
    );
};

export default UserManage;
