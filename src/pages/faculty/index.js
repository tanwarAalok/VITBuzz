import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/FacultyPage.module.css";
import FacultyCard from "@/components/FacultyCard";
import filterImg from "../../assets/filterImg.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import {useDispatch, useSelector} from "react-redux";
import {setGender, setSortType} from "@/redux/slices/facultySlice"
import {fetchAllFaculty} from "@/utils/apiFunctions/facultyApi";

const Faculty = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {loading, error, allFaculty: apiData, gender, sortType} = useSelector(state => state.faculty);

  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
     if(dispatch) fetchAllFaculty(dispatch, gender, sortType)
  }, [gender, sortType, dispatch])

  useEffect(() => {
    if (router) {
      if (router.query.gender) dispatch(setGender(router.query.gender));
      if (router.query.sortType) dispatch(setSortType(router.query.sortType));
    }
  }, [router]);


  if (error) return <SomethingWentWrong error={error} />;

  const handleSearch = (e) => {
    const searchWord = e.target.value;
    setSearchInput(searchWord);

    const newFilter = apiData?.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSearchData([]);
    } else {
      setSearchData(newFilter);
    }
  };

  const handleGenderChange = (e) => {
    const query = { ...router.query, gender: e.target.value };
    if (e.target.value === "") {
      delete query.gender;
    }
    router.replace({ query: query });
    dispatch(setGender(e.target.value));
  }

  const handleSortChange = (e) => {
    const query = { ...router.query, sortType: e.target.value };
    if (e.target.value == "") {
      delete query.sortType;
    }
    router.replace({ query: query });
    dispatch(setSortType(e.target.value));
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.facultyPage}>

            <div className={styles.filtersWrapper}>

              <SearchBar searchInput={searchInput} handleSearch={handleSearch} />

              <div className={styles.filters}>
                <select
                    value={gender}
                    onChange={handleGenderChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select
                    value={sortType}
                    onChange={handleSortChange}
                >
                  <option value="">Sort by Rating</option>
                  <option value="-1">Highest to Lowest</option>
                  <option value="1">Lowest to highest</option>
                </select>
              </div>

            </div>



            {/* *************************************** */}

            <div className={styles.contentWrapper}>
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
          {/*</div>*/}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Faculty;
