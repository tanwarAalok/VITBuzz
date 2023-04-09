import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.navbarComponent}>
      <div className={styles.logoBox}>
        <Link href="/placements">Placements</Link>
        <Link href="/faculty">Faculty</Link>
      </div>
      <Link href="/" className={styles.logo}>
        VIT<span>Buzz</span>
      </Link>
      <div className={styles.logoBox}>
        <Link href="/clubs">Clubs</Link>
        <Link href="/papers">Papers</Link>
      </div>
    </div>
  );
}

export default Navbar