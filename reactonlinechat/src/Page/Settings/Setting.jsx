import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import styles from "./Setting.module.scss";
import { Button, Form, Input, message, Upload } from "antd";
import UploadAvatar from "./UploadAvatar";
import { AuthContext } from "../../context/AuthContext";
import readDocument from "../../hooks/read-data-user";
import writeUserData from "../../hooks/WriteUserData";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};



const Setting = () => {
  
  const { currentUser } = useContext(AuthContext);

 
  const [form] = Form.useForm();

  useEffect(() => {
    readDocument(currentUser.uid, form)
      .then((result) => {
        if (result) {
          // console.log(result);
          const { displayName} = result;
          form.setFieldsValue({ displayName});
        }
      })
      .catch((err) => {
        console.warn("Something went wrong!", err);
      });
  }, [currentUser.uid, form]);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
  };

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
                <Link to="/">
                  <BsChatDots className={styles.menuIcon} />
                </Link>
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
            <Row className="m-0 p-0">
              <Form
                className={styles.profileSetting}
                {...formItemLayout}
                form={form}
                name="setting"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item label={<label style={{ color: "white" }}>Аватар</label>}valuePropName="fileList" >
                  <UploadAvatar />
                </Form.Item>

                <Form.Item
                
                  name="displayName"
                  label={<label style={{ color: "white" }}>Ник</label>}
                  tooltip="Как другие будут видеть тебя?"
                >
                  <Input />
                </Form.Item>

                {/* <Form.Item name="aboutUser" label="О себе">
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item> */}

                <Form.Item {...tailFormItemLayout}>
                  <Button
                      onClick={() => writeUserData(currentUser.uid, form.getFieldsValue())}
                    type="primary"
                    htmlType="submit"
                  >
                    Сохранить
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Setting;
