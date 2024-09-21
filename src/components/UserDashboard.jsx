import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../profile.module.css';
import { getCookie } from './ProtectedRoute';
import Loader from "./Loader";

const UserDashboard = () => {
  const history = useNavigate();
  const token = getCookie('Auth') || localStorage.getItem('auth');
  const [data, setData] = useState(null);  // Initialize with null
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");

  useEffect(() => {
    axios
      .post('https://news-boy-backend.vercel.app/api/userDet', { token })  // Sending token to backend
      .then((response) => {
        // Backend response
        setData(response.data);  // Save the response data
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [token]);  // Ensure the effect runs only once and uses the token

  const logout = () => {
    document.cookie = "Auth=";
    localStorage.removeItem('auth');  // Remove token from localStorage
    history('/');
    alert("Refresh the page. Please!")
  };

  const sendreport = (e) => {
    e.preventDefault();

    try {
      axios
        .post('https://news-boy-backend.vercel.app/api/report', { data: report, from: data.details.userName })
        .then((response) => {
          alert(response.data.msg);  // Access the correct field from the response
          setReport("");
        });
    } catch (err) {
      // Handling error
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error);  // Show the error message from backend
      } else {
        console.log(err.message);
      }
    }
  };

  // Render nothing if data is not yet available
  if (!data || !data.details) {
    return <Loader />;  // Show loading state or a skeleton screen
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          style={{ borderRadius: '50%' }}
          src="https://cdn.vectorstock.com/i/500p/37/34/user-profile-icon-social-media-vector-51113734.jpg"
          alt="user"
          width="100"
        />
        <h4>{data.details.userName}</h4>
        <Link to="/privacy">Privacy</Link>
        <p>User</p>
        <div className={styles.btns}>
          <span style={{
            color: "red", fontWeight: "600", border: "0.3px solid grey", borderRadius: "10px",
            cursor: "pointer", padding: "3px"
          }} onClick={logout}>Logout?</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>UserName</h4>
              <p>{data.details.userName}</p>
            </div>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{data.details.email}</p>
            </div>
          </div>
        </div>

        <div className='report'>
          <h2>Report/Suggestion <code>Box</code></h2>
          <input style={{height: "50px", width: "97%", padding: "2px", border: "0.5px solid grey",
            borderRadius: "5px"
          }}
            type='text'
            value={report}
            placeholder='Write your suggestion/issue here'
            onChange={(e) => { setReport(e.target.value); }}
          />
          <button style={{marginTop: "9px"}} type="button" className="btn btn-info" onClick={sendreport}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
