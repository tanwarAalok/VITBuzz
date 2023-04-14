import Image from 'next/image';
import React from 'react'
import styles from "@/styles/FacultyCard.module.css"
import ReactStars from "react-rating-stars-component";
import { useRouter } from 'next/router';

const FacultyCard = ({ data, isFrontPage }) => {
  const router = useRouter();
  return (
    <div
      className={styles.profBox}
      onClick={() => router.push(`faculty/${data._id}`)}
    >
      <Image src={data.image} alt="Image" width="350" height="400" />
      <h3 style={{ color: isFrontPage ? "white" : "#020381" }}>{data.name}</h3>
      <div className={styles.starDiv}>
        <ReactStars
          count={5}
          value={data.overallRating}
          isHalf={true}
          edit={false}
          size={36}
          activeColor={"#ffd700"}
        />
      </div>
    </div>
  );
}

export default FacultyCard