import React, { useRef, useState } from "react";
import { GrImage } from "react-icons/gr";
import { MdOutlineFeaturedVideo } from "react-icons/md";
import uuid from "react-uuid";
import RenderUserExperinces from "./RenderUserExperinces/RenderUserExperinces";
import "./SocialMedia.css";
import { useSelector } from "react-redux";
import { SocialUrl } from "../../UPI";
import { storage } from "../../Components/Storage/firebase";

const SocialMedia = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const User = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    image: "",
    text: "",
    title: "",
    video: "",
    uploadedImage: "",
    uploadedVideo: "",
  });
  const [userStatus, setUserStatus] = useState();
  const reader = new FileReader();
  const imgRef = useRef();
  const videoRef = useRef();

  // useEffect(() => {
  const getAllStatus = async () => {
    const response = await fetch(`${SocialUrl}getAllStatus`);
    const Data = await response.json();

    setUserStatus(Data);
  };

  getAllStatus();
  // }, []);

  const uploadStatus = async (e) => {
    e.preventDefault();

    console.log("Uploading D'not refresh");
    // Title,
    // text,
    // userId,
    // Email,
    // Name,
    if (userData.image) {
      await storage
        .ref(`images/${uuid()}`)
        .put(userData.image)
        .then((data) => {
          data.ref.getDownloadURL().then((data2) => {
            setUserData({ ...userData, uploadedImage: data2 });
          });
        });
    }

    if (userData.video) {
      await storage
        .ref(`video/${uuid()}`)
        .put(userData.video)
        .then((data) => {
          data.ref.getDownloadURL().then((data2) => {
            setUserData({ ...userData, uploadedVideo: data2 });
          });
        });
    }

    if (userData.uploadedImage || userData.uploadedVideo || userData.text) {
      await fetch(`${SocialUrl}shareStatus`, {
        method: "POST",
        body: JSON.stringify({
          image: userData.uploadedImage,
          text: userData.text,
          userId: User.Data ? User.Data.User._id : "",
          title: userData.title,
          video: userData.uploadedVideo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const Data = await response.json();
          if (Data) {
            console.log("Uploaded");
            window.location.reload();
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="social">
      <h1 style={{ color: "ActiveBorder" }}>SocialMedia</h1>

      <form className="social-form">
        {url.includes("image/jpeg", "image/jpg", "image/png") && (
          <img src={url} alt="" className="user-uploaded-img" />
        )}
        {url.includes("video/mp4", "video/webp", "video/ogg") && (
          <video controls className="user-uploaded-img">
            <source src={url} />
          </video>
        )}
        {!loading && <label>Title</label>}
        {!loading && (
          <input
            type="text"
            defaultValue={userData.title}
            onChange={(e) => {
              setUserData({ ...userData, title: e.target.value });
            }}
          />
        )}
        {!url && !loading && <label>Share your programming experience</label>}
        {loading && <p>Loading... ,please d'not refresh</p>}
        {!url && !loading && (
          <textarea
            maxLength={2000}
            minLength={20}
            defaultValue={userData.text}
            onChange={(e) => {
              setUserData({ ...userData, text: e.target.value });
            }}
          />
        )}
        {!url && userData.text.length === 0 && !loading && (
          <div className="social-form-icon">
            <GrImage
              size={25}
              color="lightblue"
              onClick={() => {
                imgRef.current.click();
              }}
            />
            <MdOutlineFeaturedVideo
              size={25}
              color="lightblue"
              onClick={() => {
                videoRef.current.click();
              }}
            />
          </div>
        )}
        <input
          style={{ display: "none" }}
          type="file"
          ref={imgRef}
          accept=".jpg,.jpge,.png"
          defaultValue={userData.image}
          onChange={(e) => {
            setLoading(true);
            reader.onload = () => {
              if (reader.readyState === 2) {
                setUrl(reader.result);
                setLoading(false);
                // console.log(reader.result);
              }
            };

            reader.readAsDataURL(e.target.files[0]);

            setUserData({ ...userData, image: e.target.files[0] });
          }}
        />
        <input
          style={{ display: "none" }}
          type="file"
          ref={videoRef}
          accept=".mp4,.webm,.ogg ,.mp3,.mkv"
          defaultValue={userData.image}
          onChange={(e) => {
            setLoading(true);
            reader.onload = () => {
              if (reader.readyState === 2) {
                setUrl(reader.result);
                setLoading(false);
                // console.log(reader.result);
              }
            };

            reader.readAsDataURL(e.target.files[0]);

            setUserData({ ...userData, video: e.target.files[0] });
          }}
        />

        <button onClick={uploadStatus} disabled={loading && userData.title}>
          POST
        </button>
      </form>
      {(userStatus ? userStatus.allStatus.reverse() : []).map((u) => (
        <RenderUserExperinces u={u} key={u._id} />
      ))}
    </div>
  );
};

export default SocialMedia;
