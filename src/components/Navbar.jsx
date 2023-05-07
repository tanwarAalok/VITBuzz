import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link';
import Logo from 'public/logo.png'
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

function GiTwoCoins(props) {
  return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" height="1.9em" width="1.9em" {...props}><path d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8 10.07 19.3 35.53 30.4 71.22 30.4 35.69.1 80.29-11.2 124.19-34 44-22.9 78.8-53 99.2-82.2 20.5-29.2 25.9-56.4 15.9-75.8-10.1-19.3-35.5-30.49-71.2-30.49zm91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3-22.6 32.3-59.5 63.8-105.7 87.8-46.2 24.1-93.1 36.2-132.5 36.2-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5 35.7 0 80.3-11.2 124.2-34.1 44-22.8 78.8-52.9 99.2-82.2 20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7-18.9 27.1-47.8 53.4-83.6 75.4 11.1 1.2 22.7 1.8 34.5 1.8 49.5 0 94.3-10.6 125.9-27.1 31.7-16.5 49.1-38.1 49.1-59.9 0-21.8-17.4-43.4-49.1-59.9-16.1-8.4-35.7-15.3-57.6-20zm106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31-35 18.2-82.2 29.1-134.3 29.1-21.2 0-41.6-1.8-60.7-5.2-23.2 11.7-46.5 20.4-68.9 26.1 1.2.7 2.4 1.3 3.7 2 31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z" /></svg>;
}

function FiLogIn(props) {
  return <svg style={{cursor: "pointer"}} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.8em" width="1.8em" {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1={15} y1={12} x2={3} y2={12} /></svg>;
}

function FiLogOut(props) {
  return <svg style={{cursor: "pointer"}} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.8em" width="1.8em" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>;
}


const Navbar = () => {
  const { data: session } = useSession();

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

      {!session ? (
        <FiLogIn onClick={() => signIn()} />
      ) : (
        <div className="d-flex gap-5 align-items-center">
          <div className="d-flex gap-1 align-items-center">
            <GiTwoCoins />
            <h6 className="mt-1 ms-1 fs-5">0</h6>
          </div>
            <FiLogOut onClick={() => signOut()} />
        </div>
      )}
    </div>
  );
}

export default Navbar