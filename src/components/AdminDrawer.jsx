import Link from 'next/link';
import React from 'react'

const AdminDrawer = ({styles}) => {
  return (
    <div className={styles.drawer}>
      <h4>Hello, Admin !!</h4>
      <div className={styles.divider}></div>
      <div className={styles.linkWrapper}>
        <Link href={"/admin/faculties"}>Faculties</Link>
        <Link href={"/admin/papers"}>Papers</Link>
        <Link href={"/admin/clubs"}>Clubs</Link>
      </div>
    </div>
  );
}

export default AdminDrawer