import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ClubsPage.module.css";
import Footer from "@/components/Footer";
import ClubCard from "@/components/ClubCard";
import useFetch from "@/utils/hooks/useFetch";
import Loader from "@/components/Loading";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import SearchBar from "@/components/SearchBar";

export default function ClubPage() {
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  const { isLoading, apiData, serverError } = useFetch("/api/club");

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.clubPage}>
          <div className={styles.options}>
            <SearchBar searchInput={searchInput} handleSearch={handleSearch} />
          </div>

          <div className={styles.clubCardWrapper}>
            {searchData.length > 0
              ? searchData?.map((club) => (
                  <ClubCard key={club._id} styles={styles} data={club} />
                ))
              : apiData?.map((club) => (
                  <ClubCard key={club._id} styles={styles} data={club} />
                ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
