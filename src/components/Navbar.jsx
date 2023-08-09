import React from "react";
import styles from "@/styles/Navbar.module.css";
import Logo from "public/logo.png";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {LogInIcon, LogOutIcon} from "@/utils/Icons";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";

const NavbarComponent = () => {
  const { data: session, update } = useSession();

  return (
      <Navbar expand="lg" style={{background: '#020381', color: 'white'}}>
          <Container>
              <Navbar.Brand href="/" className="d-flex align-items-center">
                  <Image
                      alt=""
                      src={Logo}
                      width="45"
                      height="45"
                      className="d-inline-block align-top rounded-circle"
                  />{' '}
                  <span className="fs-3 mx-1">VIT<span className={styles.buzz}>Buzz</span></span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.custom}/>
              <Navbar.Collapse id="basic-navbar-nav" className="mx-lg-5">
                  <Nav className="me-auto">
                      <Nav.Link className="mx-3" href="/faculty">Faculty</Nav.Link>
                      <Nav.Link className="mx-3" href="/clubs">Clubs</Nav.Link>
                      <Nav.Link className="mx-3" href="/papers">Papers</Nav.Link>
                      <Nav.Link className="mx-3" href="/mentorship">Mentors</Nav.Link>
                  </Nav>
                  {
                      !session ? <LogInIcon className="mx-3 mt-1" onClick={() => signIn()} /> : (
                          <div className="d-flex align-items-center">
                              {
                                  session?.role === "admin" ? <Button href="/admin">Admin Panel</Button> : ""
                              }
                              <LogOutIcon className="mx-3" onClick={() => signOut()} />
                          </div>
                      )
                  }
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
};

export default NavbarComponent;



