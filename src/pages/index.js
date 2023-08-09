import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Cookie} from "@next/font/google";
import {cookies} from "next/headers";

export default function Home() {

  const { isLoading, apiData, serverError } = useFetch("/api/faculty/top");
  if (serverError) return <SomethingWentWrong error={serverError} />;


  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <LandingPage
          styles={styles}
          topFaculty={apiData}
          isLoading={isLoading}
        />
      )}
      <Footer />
    </>
  );
}
