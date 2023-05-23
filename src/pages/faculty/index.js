import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/FacultyPage.module.css";
import FacultyCard from "@/components/FacultyCard";
import filterImg from "../../assets/filterImg.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/utils/hooks/useFetch";
import { useRouter } from "next/router";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";

const Faculty = () => {
  const router = useRouter();

  const [gender, setGender] = useState("");
  const [sortType, setSortType] = useState("");
  const [searchInput, setsearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (router) {
      if (router.query.gender) setGender(router.query.gender);
      if (router.query.sortType) setSortType(router.query.sortType);
    }
  }, [router]);

  const { isLoading, apiData, serverError } = useFetch(
    `/api/faculty?gender=${gender}&sortType=${sortType}`
  );

  if (isLoading) return <Loader />;
  if (serverError) return <SomethingWentWrong error={serverError} />;

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    setsearchInput(searchWord);

    const newFilter = apiData?.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.facultyPage}>
        <div className={styles.f_left}>
          <div className={styles.filterBtn}>
            Filters
            <Image src={filterImg} alt="filterIMg" />
          </div>

          <div className={styles.filters}>
            <select
              value={gender}
              onChange={(e) => {
                const query = { ...router.query, gender: e.target.value };
                if (e.target.value == "") {
                  delete query.gender;
                }
                router.replace({ query: query });
                setGender(e.target.value);
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={sortType}
              onChange={(e) => {
                const query = { ...router.query, sortType: e.target.value };
                if (e.target.value == "") {
                  delete query.sortType;
                }
                router.replace({ query: query });
                setSortType(e.target.value);
              }}
            >
              <option value="">Sort by Rating</option>
              <option value={-1}>Highest to Lowest</option>
              <option value={1}>Lowest to highest</option>
            </select>
          </div>
        </div>

        {/* *************************************** */}

        <div className={styles.f_right}>
          <SearchBar searchInput={searchInput} handleSearch={handleSearch} />

          {/* *************************************** */}

          <div className={styles.f_right_bottom}>
            {searchData.length > 0
              ? searchData?.map((prof) => (
                  <FacultyCard
                    key={prof.email}
                    data={prof}
                    isFrontPage={false}
                  />
                ))
              : apiData?.map((prof) => (
                  <FacultyCard
                    key={prof.email}
                    data={prof}
                    isFrontPage={false}
                  />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faculty;
