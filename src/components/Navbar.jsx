import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import Logo from 'public/logo.png'
import Image from 'next/image';

function CgProfile(props) {
  return <svg style={{cursor: 'pointer'}} stroke="currentColor" fill="none" strokeWidth={0} viewBox="0 0 24 24" height="2em" width="2em" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor" /></svg>;
}

function GiTwoCoins(props) {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height="1.9em" width="1.9em" {...props}><path d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z" /></svg>;
}


function RiCoinsLine(props) {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1.9em" width="1.9em" {...props}><g><path fill="none" d="M0 0h24v24H0z" /><path fillRule="nonzero" d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5V9h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z" /></g></svg>;
}



const Navbar = () => {
  return (
    <div className={styles.navbarComponent}>
      <Link href={"/"} className={styles.logo}>
        <Image src={Logo} alt="logo" />
        <p>
          VIT<span>Buzz</span>
        </p>
      </Link>

      <div className={styles.linkBox}>
        <Link href="/faculty">Faculty</Link>
        <Link href="/clubs">Clubs</Link>
        <Link href="/papers">Papers</Link>
        <Link href="/placements">Placements</Link>
      </div>

      <div className="d-flex gap-5 align-items-center">
        <div className="d-flex gap-1 align-items-center">
          <GiTwoCoins />
          <h6 className="mt-1 ms-1 fs-5">0</h6>
        </div>
        <CgProfile />
      </div>
    </div>
  );
}

export default Navbar