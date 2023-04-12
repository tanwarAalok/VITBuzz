import Image from "next/image";
import React from "react";
import instaLogo from "@/assets/insta.svg"
import linkedInlogo from "@/assets/linkedIn.svg";


const ClubCard = ({ styles }) => {
  return (
    <div className={styles.clubcard}>
      <Image
        src={"https://avatars.githubusercontent.com/u/109692859?s=200&v=4"}
        alt="Club Image"
        width={350}
        height={320}
      />
      <div className={styles.clubContent}>
        <h4>Club Name</h4>
        <p>Tech</p>
      </div>

      <hr />

      <div className={styles.clubLinks}>
        <Image
          className={styles.link}
          src={instaLogo}
          width={35}
          height={35}
          alt="instalogo"
        />
        <Image
          className={styles.link}
          src={linkedInlogo}
          width={40}
          height={40}
          alt="instalogo"
        />
      </div>
    </div>
  );
};

export default ClubCard;
