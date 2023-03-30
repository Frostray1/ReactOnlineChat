import React, { useState, useEffect, useContext } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
// import { useAuth } from "hooks/use-auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import styles from "./Setting.module.scss";
import { AuthContext } from "../../context/AuthContext";


  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  



  
  const UploadAvatar = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const { currentUser } = useContext(AuthContext);
    // const [image, setSetImage] = useState(null);
    // const { email } = useAuth();

    const handleUpload = (image) => {
      
        const storage = getStorage();
        const uploadTask = ref(storage, `images/${currentUser.email}-${image.file.name}`);
        uploadBytes(uploadTask, image.file).then((snapshot) => {
          getBase64 (image.file, (url)=>{
            setLoading(false);
            setImageUrl(url);
            getUrlImage(uploadTask);
          })
          
          return 
        });
      };
      const getUrlImage = (uploadTask) => {
        // console.log("Получение ЮРЛ");
        getDownloadURL(uploadTask)
          .then((url) => {
            // console.log(url);
            writeUserDataImage(url)
            return(url)
            // Or inserted into an <img> element
            // const img = document.getElementById("myimg");
            // img.setAttribute("src", url);
          })
          .catch((error) => {
            // Handle any errors
          });
      };
    
      const writeUserDataImage = (url) => {
     
        const firestore = getFirestore();
        const db = doc(firestore, 'users/'+ currentUser.uid)
        const usersData = {
          photoURL: url,
        }
        // console.log("-----",usersData)
        setDoc(db, usersData, { merge: true });
      
      }

      

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      // setSetImage(info.file.originFileObj)

    };
    const uploadButton = (
      <div className={styles.uploadButton}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
       <div></div>
          Upload
    
      </div>
    );
    return (
      <Upload
        
        name="photoURL"
        listType="picture-card"
        className={styles.avatarUploader}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleUpload}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
              height: '100%',
              
            }}
          />
        ) : (
          uploadButton
        )}
       
      </Upload>
    );
  };


  export default UploadAvatar;