import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import Loader from "./Loader";

const Edit = () => {
  const token = localStorage.getItem("auth");
  const history = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState(null); // Set initial state as null
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the backend
        const response = await axios.post("https://news-boy-backend.vercel.app/api/userDet", { token });
        setData(response.data);
        setLoading(false); // Stop loading when data is fetched
  
        // Check if profileUrl exists and fetch the profile image if it does
        if (response.data?.details?.profileUrl) {
          await fetchProfileImage(response.data.details.profileUrl);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false); // Stop loading in case of error
      }
    };
  
    const fetchProfileImage = async (imageId) => {
      try {
        const response = await axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${imageId}`);
        const imageUrl = `data:${response.data.contentType};base64,${response.data.imageBase64}`;
        setImagePreview(imageUrl); // Set the fetched profile image URL
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [token]);
  

  const update = async (e) => {
    e.preventDefault();

    if (userName.length > 20) {
      alert("User name must be less than 20 characters.");
    } else if (pass.length > 30) {
      alert("Password must be less than 30 characters.");
    } else {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("pass", pass);
      formData.append("id", data.details._id);
      if (image) {
        formData.append("image", image);
      }

      await axios
        .post("https://news-boy-backend.vercel.app/api/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          history("/profile");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data.msg);
          } else {
            console.log(err.message);
          }
        });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  const styles = {
    main: {
      marginTop: "75px",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "'Poppins', sans-serif",
      background: "rgba(255, 255, 255, 0.45)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(19px)",
      webkitBackdropFilter: "blur(19px)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    container: {
      width: "400px",
      padding: "40px",
      backgroundColor: "#fff",
      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
    },
    h1: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "2rem",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      height: "45px",
      padding: "0 15px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "#f0f0f0",
      transition: "background-color 0.3s ease",
    },
    btn: {
      height: "50px",
      backgroundColor: "#1abc9c",
      border: "none",
      color: "white",
      borderRadius: "25px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    imageWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    image: {
      borderRadius: "50%",
      width: "100px",
      height: "100px",
      objectFit: "cover",
    },
    uploadIcon: {
      fontSize: "1.5rem",
      marginLeft: "10px",
      cursor: "pointer",
      color: "#666",
    },
    fileInput: {
      display: "none",
    },
  };

  // Show the loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <form onSubmit={update} style={styles.form}>
          <h1 style={styles.h1}>Edit Profile</h1>

          {/* Profile Image Upload Section */}
          <div style={styles.imageWrapper}>
            <img src={imagePreview || "https://cdn.vectorstock.com/i/500p/37/34/user-profile-icon-social-media-vector-51113734.jpg"} alt="Profile" style={styles.image} />
            <FaUpload
              style={styles.uploadIcon}
              onClick={() => document.getElementById("file-input").click()}
            />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={handleImageUpload}
            />
          </div>

          <input
            type="text"
            placeholder={data ? data.details.userName : "Enter new user name"}
            onChange={(e) => setUserName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={data ? data.details.email : ""}
            readOnly
          />
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPass(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" className="btn" style={styles.btn}>
            Change
          </button>
          <p style={styles.p}>
            Don't want to edit?{" "}
            <Link to="/profile" style={styles.a}>
              Profile
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Edit;
