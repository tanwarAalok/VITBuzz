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
import axios from "axios";

const FacultyDetails = () => {
  const { data: session, status } = useSession();

  const { query } = useRouter();

  const [open, setOpen] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [rated, setRated] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchReviews() {
    try {
      const res = await axios.get("/api/review", {
        params: { facultyId: query.id },
      });
      setRatingData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function checkIfAlreadyRated(reviews) {
    return reviews.find((r) => r.user.email == session.user.email) != undefined;
  }
  
  useEffect(() => {
    if (query && query.id) {
      fetchReviews();
    }
  }, [query, trigger]);

  useEffect(() => {
    if (ratingData && (status === "authenticated")) {
      setRated(checkIfAlreadyRated(ratingData.reviews));
    }
  }, [ratingData, status])


  const {
    isLoading,
    apiData: data,
    serverError,
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
              {rated ? "" : session ? (
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
                trigger={trigger}
                setTrigger={setTrigger}
              />
            </div>
            <div className={styles.contentDiv}>
              <h1>{data?.name}</h1>
              <div>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>

          {ratingData && ratingData.reviews.length > 0 ? (
            <>
              <div className={styles.sec2}>
                <RatingGraphs styles={styles} data={ratingData} />
              </div>

              <div className={styles.sec3}>
                <h3>Reviews</h3>
                <div className={styles.reviewCardParent}>
                  {ratingData.reviews?.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      styles={styles}
                      trigger={trigger}
                      setTrigger={setTrigger}
                    />
                  ))}
                </div>
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
