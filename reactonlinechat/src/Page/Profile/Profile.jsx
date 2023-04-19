import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import styles from "./Profile.module.scss";
import { AiOutlineHome, AiOutlineWechat } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Chats from "../../components/Chats/Chats";
import Chat from "../../components/Chat/Chat";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import Search from "../../components/Search/Search";
import { Link } from "react-router-dom";
import readDocument from "../../hooks/read-data-user";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    displayName: "",
    photoURL: "",
    uid: "",
    email: "",
  });

  useEffect(() => {
    readDocument(currentUser.uid)
      .then((result) => {
        if (result) {
 
          setUserInfo({
            displayName: result.displayName,
            photoURL: result.photoURL,
            uid: result.uid,
            email: result.email,
          });
        }
      })
      .catch((err) => {
        console.warn("Something went wrong!", err);
      });
  }, [currentUser.uid]);



  return (
    <Container className={styles.container}>
      <div className={styles.appWindow}>
        <Row className={styles.appWindow__Container}>
          <Col xs={1} className={styles.menu}>
            <div className={styles.menuItem}>
              <Row>
                <Link to="/profile">
                  <AiOutlineHome className={styles.menuIcon} />
                </Link>
              </Row>
              <Row>
                <BiCube className={styles.menuIcon} />
              </Row>
              <Row>
                <Link to="/">
                  {" "}
                  <BsChatDots className={styles.menuIcon} />
                </Link>
              </Row>
              <Row>
                <Link to="/settings">
                  {" "}
                  <FiSettings className={styles.menuIcon} />
                </Link>
              </Row>
            </div>
          </Col>
          <Col className="m-0 p-0">
            <Row className={styles.header}>
              <div className={styles.logo}>
                <BsChatDots />
                <h3>WiseConnect</h3>
              </div>
            </Row>
            <Row className="m-0 p-0">
              <div className={styles.profileWindow}>
                <img
                  src={userInfo.photoURL}
                  alt=""
                />
                <div className={styles.profileInfo}>
                  <h4>{userInfo.displayName}</h4>
                  <h4>{userInfo.email}</h4>
                  <h5>{userInfo.uid}</h5>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;
