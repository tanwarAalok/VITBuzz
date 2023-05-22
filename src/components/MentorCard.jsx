import Image from 'next/image';
import React from 'react';
import Avatar from 'public/profile2.png'

const MentorCard = ({styles}) => {
  return (
      <div className={styles.card}>
          <div className={styles.contentWrapper}>
              <Image src={Avatar} alt='Profile Pic' width={100} height={100}/>
              <h4>Abhinav Goyal</h4>
              <p>SDE Intern at Microsoft</p>
              <button>Connect</button>
          </div>
    </div>
  )
}

export default MentorCard;