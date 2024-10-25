import React, { useState } from 'react';
import axios from 'axios';
// import { getCookie } from './ProtectedRoute';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState();

  // const token = getCookie('Auth');
  const token = localStorage.getItem('auth');
  // console.log(localStorage.getItem('Auth'));

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 80 || title === "") {
      setError('Title must be less than 80 characters and is required.');
      return;
    }
    if (thoughts.length > 150 || thoughts === "") {
      setError('Thoughts must be less than 150 characters and are required.');
      return;
    }
  
    try {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('title', title); // Add title to form data
      formdata.append('description', thoughts); // Add description to form data

      console.log([...formdata.entries()]);
  
      await axios.post(
        "https://news-boy-backend.vercel.app/api/upload",
        formdata, // send formdata directly
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in Authorization header
            "Content-Type": "multipart/form-data", // Axios handles this automatically, but good to specify
          },
        }
      ).then(async (res) => {
        // Handle successful post creation
        alert(res.data.msg);
        setFile('');
        setTitle('');
        setThoughts('');
        setError('');
      });
    } catch (err) {
      // handling error
      if (err.response && err.response.status === 400) {
        alert(err.response.data.msg);
      } else {
        console.log(err.message);
      }
    }
  };
  

  return (
    <div className="post-create-container" style={{marginTop: "150px"}}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            onChange={(e)=>{ setFile(e.target.files[0]) }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="80"
            placeholder="Enter your title (max 80 characters)"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="thoughts">Thoughts:</label>
          <textarea
            id="thoughts"
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            maxLength="150"
            placeholder="Share your thoughts (max 150 characters)"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="post-button">Post</button>
      </form>

      <style jsx>{`
        .post-create-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
        }

        label{
        color: black;
        }

        h1 {
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        textarea {
          resize: vertical;
        }

        .error {
          color: red;
          font-size: 0.9em;
        }

        .post-button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .post-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default PostCreate;