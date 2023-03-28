import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChatDots } from "react-icons/bs";
import styles from "./Home.module.scss";
import { AiOutlineHome, AiOutlineWechat } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Chats from "../../components/Chats/Chats";
import Chat from "../../components/Chat/Chat";
const Home = () => {
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
                <BsChatDots className={styles.menuIcon} />
              </Row>
              <Row>
                <FiSettings className={styles.menuIcon} />
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
                    <img src="/image/maxresdefault.jpeg" alt="iconProfile" />
                    <h4>Artem Bychkov</h4>
                    <Button>Logout</Button>
                  </div>
                </Row>
                <Row>
                  <input
                    className={styles.searchInput}
                    placeholder="Search"
                    type="text"
                  />
                </Row>
                <Row>
                  <Chats />
                  <Chats />
                  <Chats />
                  <Chats />
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
