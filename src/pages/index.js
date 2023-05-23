import Navbar from "@/components/Navbar";
import styles from "@/styles/Home.module.css";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";

export default function Home() {
  const { isLoading, apiData, serverError } = useFetch("/api/faculty/top");
  if (isLoading) return <Loader />;
  if (serverError) return <SomethingWentWrong error={serverError} />;

  return (
    <>
      <Navbar />
      <LandingPage styles={styles} topFaculty={apiData} isLoading={isLoading} />
      <Footer />
    </>
  );
}
