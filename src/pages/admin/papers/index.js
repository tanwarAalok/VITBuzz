import React from "react";
import styles from "@/styles/AdminHome.module.css";
import AdminDrawer from "@/components/AdminDrawer";
import { useRouter } from "next/router";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import useFetch from "@/utils/hooks/useFetch";
import PaperTable from "@/components/PaperTable";
import Loader from "@/components/Loading";

const PaperManage = () => {
  const router = useRouter();

  const { isLoading, apiData, serverError } = useFetch("/api/paper");
  if (serverError) return <SomethingWentWrong error={serverError} />;

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
          {isLoading ? <Loader/> : <PaperTable data={apiData} />}
        </div>
      </div>
    </>
  );
};

export default PaperManage;
