import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import styles from "./Home.module.scss";
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



const Home = () => {
  const [displayName,setDisplayName] = useState('')
  const [avatar,setAvatar] = useState('')
  const {currentUser} = useContext(AuthContext)
  

  useEffect(() => {
    readDocument(currentUser.uid)
      .then((result) => {
        if (result) {
    
          // console.log(result)
          setDisplayName(result.displayName)
          setAvatar(result.photoURL)
          
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
                <AiOutlineHome className={styles.menuIcon} />
              </Row>
              <Row>
                <BiCube className={styles.menuIcon} />
              </Row>
              <Row>
              <Link to='/'> <BsChatDots className={styles.menuIcon} /></Link>
              </Row>
              <Row>
               <Link to='/settings'> <FiSettings className={styles.menuIcon} /></Link>
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
            <Row className={styles.chat}>
              <Col xs={4} className={styles.membersList}>
                <Row>
                  <div className={styles.profile}>
                    <img src={avatar} alt="iconProfile" />
                    <h4>{displayName? displayName : currentUser.email}</h4>
                    <Button onClick={()=>signOut(auth)}>Logout</Button>
                  </div>
                </Row>
                <Row >
                 <Search/>
                </Row>
                <Row>
                  <Chats />
                  
                </Row>
              </Col>
              <Col className="m-0 p-0">
                <Chat />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
