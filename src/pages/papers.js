import Navbar from '@/components/Navbar'
import React, { useReducer } from 'react'
import styles from "@/styles/Paper.module.css";
import Footer from '@/components/Footer';
import PaperCarousel from '@/components/PaperCarousel';
import Loader from '@/components/Loading';
import SomethingWentWrong from '@/components/SomethingWentWrong';
import useFetch from '@/utils/hooks/useFetch';

const Paper = () => {

  const [filter, updateFilter] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      faculty: "",
      course: "",
      paperType: "",
    }
  );

  const { isLoading, apiData, serverError } = useFetch(`/api/paper?faculty=${filter.faculty}&course=${filter.course
    }&paperType=${filter.paperType}`);
  if (isLoading) return <Loader />;
  if (serverError) return <SomethingWentWrong error={serverError} />;

  
  return (
    <>
      <Navbar />
      <div className={styles.paperPage}>
        <div className={styles.topOptions}>
          <div className={styles.selectWrapper}>
            <select
              value={filter.faculty}
              onChange={(e) => {
                updateFilter({ faculty: e.target.value });
              }}
            >
              <option value={""}>Select Faculty..</option>
              <option value={"Venkat Prasad"}>Venkat Prasad</option>
              <option value={"Baseera A"}>Baseera A</option>
            </select>

            <select
              value={filter.course}
              onChange={(e) => {
                updateFilter({ course: e.target.value });
              }}
            >
              <option value={""}>Select Course..</option>
              <option value={"Internet and Web Programming"}>
                Internet and Web Programming
              </option>
              <option value={"Competitive Programming"}>
                Competitive Programming
              </option>
            </select>

            <select
              value={filter.paperType}
              onChange={(e) => {
                updateFilter({ paperType: e.target.value });
              }}
            >
              <option value={""}>Select Exam Type..</option>
              <option value={"Mid Term"}>Mid-term</option>
              <option value={"Term End"}>Term-end</option>
            </select>
          </div>
        </div>
        <PaperCarousel styles={styles} apiData={apiData} />
      </div>
      <Footer />
    </>
  );
}

export default Paper