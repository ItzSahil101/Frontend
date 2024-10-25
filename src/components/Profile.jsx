import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from "./Loader";

const Profile = () => {
  const history = useNavigate();
  const token = localStorage.getItem('auth');
  const [data, setData] = useState(null);  // Initialize with null
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Store fetched profile image URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://news-boy-backend.vercel.app/api/userDet', { token });
        setData(response.data);
        
        // Fetch profile image by ID if it exists
        if (response.data?.details?.profileUrl) {
          await fetchProfileImage(response.data.details.profileUrl);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProfileImage = async (imageId) => {
      try {
        const response = await axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${imageId}`);
        const imageUrl = `data:${response.data.contentType};base64,${response.data.imageBase64}`;
        setProfileImageUrl(imageUrl); // Set the fetched profile image URL
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const logout = () => {
    document.cookie = "Auth=";
    localStorage.removeItem('auth');
    history('/');
    alert("Wait a few seconds & Refresh the page. Please!");
  };

  const sendreport = async (e) => {
    e.preventDefault();

    if (!report.trim()) {
      alert("Please enter a valid report/suggestion.");
      return;
    }

    try {
      const response = await axios.post('https://news-boy-backend.vercel.app/api/report', {
        data: report,
        from: data?.details?.userName || "Anonymous"
      });
      alert(response.data.msg);
      setReport("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error);
      } else {
        console.error(err.message);
      }
    }
  };

  const deleteAcc = async (e) => {
    e.preventDefault();

    const userId = data.details._id;
    try {
      await axios.delete(`https://news-boy-backend.vercel.app/api/del/user/${userId}`);
      document.cookie = "Auth=";
      localStorage.removeItem('auth');
      history('/');
      alert("Wait few seconds and refresh the page.");
    } catch (err) {
      console.error(err);
      alert('Failed to delete user. Please try again.');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <style>
        {`

          .card {
            margin-top: 110px;
            width: 500px;
            background-color: #efefef;
            border: none;
            cursor: pointer;
            transition: all 0.5s;
          }

          .image img {
            transition: all 0.5s;
          }

          // .card:hover .image img {
          //   transform: scale(1.5);
          // }

          .btn {
            height: 140px;
            width: 140px;
            border-radius: 50%;
          }

          .name {
            font-size: 22px;
            font-weight: bold;
          }

          .idd {
            font-size: 14px;
            font-weight: 600;
          }

          .idd1 {
            font-size: 12px;
          }

          .number {
            font-size: 22px;
            font-weight: bold;
          }

          .follow {
            font-size: 12px;
            font-weight: 500;
            color: #444444;
          }

          .btn1 {
            height: 40px;
            width: 150px;
            border: none;
            background-color: #0393aa;
            color: white;
            font-size: 15px;
            border-radius: 4px;
          }

          .log{
            height: 40px;
            width: 150px;
            border: none;
            background-color: #ba5151;
            color: white;
            font-size: 15px;
            border-radius: 4px;
          }

          .btnss {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .text span {
            font-size: 13px;
            color: #545454;
            font-weight: 500;
          }

          hr .new1 {
            border: 1px solid;
          }

          .join {
            font-size: 14px;
            color: #a0a0a0;
            font-weight: bold;
          }

          .date {
            background-color: #ccc;
          }

          .pro{
          border-radius: 50%;
           object-fit: cover; 
            width: 100%;  
            height: 100%;  
          }

          .report {
            margin-top: 30px; /* Adds space between Edit Profile button and Report box */
          }

          .delete:hover{
          background-color: black;
          color: white;
          }
        `}
      </style>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img
                className='pro'
                src={profileImageUrl || "https://cdn.vectorstock.com/i/500p/37/34/user-profile-icon-social-media-vector-51113734.jpg"}
                height="100"
                width="100"
                alt="Profile"
              />
            </button>
            <span className="name mt-3" style={{color: 'black'}}>{data.details.userName}</span>
            <span className="idd">{data.details.email}</span>
            <div className="d-flex mt-2 btnss">
              <button className="btn1 btn-dark"><Link style={{color: "white"}} to="/edit">Edit Profile</Link></button>
              <button className="log btn-dark" onClick={logout}>Logout</button>
            </div>
            <Link style={{marginTop: '15px', textDecoration: 'underline'}} to="/yourposts">Your Posts</Link>

            <div className="report">
              <h2>Feedback <code>Box</code></h2>
              <input
                style={{ height: "50px", width: "97%", padding: "2px", border: "0.5px solid grey", borderRadius: "5px" }}
                type="text"
                value={report}
                placeholder="Write your Feedback"
                onChange={(e) => setReport(e.target.value)}
              />
              <button style={{ marginTop: "15px" }} className="btn1 btn-dark" onClick={sendreport}>Submit</button>
              <p style={{color: "black", marginTop: '5px', fontWeight: '600'}}>Deactivate Account?
                <button 
                  className='delete'
                  onDoubleClick={deleteAcc}
                  style={{border: '1px solid black', borderRadius: '5px', cursor: 'pointer', padding: '1.2px', width: '100px', height: '35px'}}
                >
                  Deactivate
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
