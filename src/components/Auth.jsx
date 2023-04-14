import React from 'react';
import styles from '@/styles/Auth.module.css';

const Auth = () => {
  return (
      <div className={styles.adminPage}>
          <div className={styles.authWrapper}>
              <h2>Admin Login</h2>
              <input type='email' placeholder='Email'/>
              <input type='password' placeholder='Password' />
              <button>Login</button>
          </div>
    </div>
  )
}

export default Auth