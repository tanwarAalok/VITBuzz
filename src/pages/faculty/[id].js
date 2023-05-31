import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/FacultyDetailPage.module.css";
import Image from "next/image";
import RatingModal from "@/components/RatingModal";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import RatingGraphs from "@/components/RatingGraphs";
import { useSession, signIn } from "next-auth/react";
import Loader from "@/components/Loading";
import useFetch from "@/utils/hooks/useFetch";
import SomethingWentWrong from "@/components/SomethingWentWrong";

const FacultyDetails = () => {
  const { data: session } = useSession();
  const { query } = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    isLoading,
    apiData: data,
    serverError,
    setUpdate
  } = useFetch(`/api/faculty/${query.id}`, query.id ? true : false);
  if (serverError) return <SomethingWentWrong error={serverError} />;


  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainPage}>
          <div className={styles.sec1}>
            <div className={styles.imgCont}>
              <Image src={data?.image} alt="image" width="350" height="400" />
              {session ? (
                <div className={styles.ratingBtn} onClick={handleOpen}>
                  Rate Teacher
                </div>
              ) : (
                <div className={styles.ratingBtn} onClick={() => signIn()}>
                  Rate Teacher
                </div>
              )}
              <RatingModal
                show={open}
                handleClose={handleClose}
                setUpdate={setUpdate}
              />
            </div>
            <div className={styles.contentDiv}>
              <h1>{data?.name}</h1>
              <div>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>

          {data?.reviews?.length > 0 ? (
            <>
              <div className={styles.sec2}>
                <RatingGraphs styles={styles} data={data} />
              </div>

              <div className={styles.sec3}>
                <h3>Reviews</h3>
                {data?.reviews?.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    styles={styles}
                    setUpdate={setUpdate}
                  />
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default FacultyDetails;
