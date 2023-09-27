import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
// import {setLoading, getTopFaculty, setError} from "../redux/slices/facultySlice";
import {fetchTopFaculty} from "@/utils/apiFunctions/facultyApi";


export default function Home() {

  const dispatch = useDispatch();

  useEffect( () => {
      if(dispatch) fetchTopFaculty(dispatch);
  }, [dispatch]);

  const {loading, error, topFaculty} = useSelector(state => state.faculty);
  if(error) return <SomethingWentWrong error={error} />

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <LandingPage
          styles={styles}
          topFaculty={topFaculty}
          isLoading={loading}
        />
      )}
      <Footer />
    </>
  );
}
