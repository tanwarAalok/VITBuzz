import Image from 'next/image';
import React from 'react'
import styles from "@/styles/FacultyCard.module.css"
import ReactStars from "react-rating-stars-component";
import { useRouter } from 'next/router';

const FacultyCard = ({ data }) => {
  const router = useRouter();
  return (
    <div className={styles.profBox}>
      <Image src={data.image} alt="Image" width="350" height="400" />
      <h3>{data.name}</h3>
      <div className={styles.starDiv}>
        <ReactStars
          count={5}
          value={data.ratings.avgRating}
          isHalf={true}
          edit={false}
          size={36}
          activeColor={"#ffd700"}
        />
      </div>
      <p onClick={() => router.push(`faculty/${data._id}`)}>
        more info..&nbsp;&nbsp;<span>→</span>
      </p>
    </div>
  );
}

export default FacultyCard