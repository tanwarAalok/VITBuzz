import Image from "next/image";
import React from "react";
import instaLogo from "@/assets/insta.svg"
import linkedInlogo from "@/assets/linkedIn.svg";
import Link from "next/link";


const ClubCard = ({ styles, data }) => {
  
  return (
    <div className={styles.clubcard}>
      <Image src={data.image} alt="Club Image" width={350} height={320} />
      <div className={styles.bottomDiv}>
        <div className={styles.clubContent}>
          <h4>{data.name}</h4>
          <p>{data.clubType}</p>
        </div>

        <hr />

        <div className={styles.clubLinks}>
          {data.instagram ? (
            <Link href={data.instagram} target="_blank">
              <Image
                className={styles.link}
                src={instaLogo}
                width={35}
                height={35}
                alt="instalogo"
              />
            </Link>
          ) : (
            ""
          )}

          {data.linkedIn ? (
            <Link href={data.linkedIn} target="_blank">
              <Image
                className={styles.link}
                src={linkedInlogo}
                width={40}
                height={40}
                alt="linkedIn"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
