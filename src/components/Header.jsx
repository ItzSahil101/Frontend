import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import downArrow from './../assets/downarrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Header(isLoggedIn) {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [profile, setProfile] = useState();

  let token = localStorage.getItem('auth');;

  const [theme, setTheme] = useState("light-theme");
  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology","politics"]

  useEffect(() => {
    document.body.className = theme;
  
    const fetchImg = async () => {
      try {
        const response = await axios.post('https://news-boy-backend.vercel.app/api/userDet', { token }); // Sending token to backend
        
        // Check if profileUrl exists and fetch the profile image if it does
        if (response.data?.details?.profileUrl) {
          await fetchProfileImage(response.data.details.profileUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const fetchProfileImage = async (imageId) => {
      try {
        const response = await axios.get(`https://news-boy-backend.vercel.app/api/serve/image/${imageId}`);
        const imageUrl = `data:${response.data.contentType};base64,${response.data.imageBase64}`;
        setProfile(imageUrl); // Set the fetched profile image URL
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
  
    fetchImg();
  }, [theme]);
  

  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme")
    }
    else {
      setTheme("light-theme")
    }
  }
  return (
    <header className="">
     <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
      
      <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">News_Boy</h3>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className={active ? "nav-ul flex gap-11 md:gap-15 xs:gap-9 lg:basis-3/6 md:basis-4/6 md:justify-end active" : " nav-ul flex gap-11 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li><Link className="no-underline font-semibold" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
          <li className="dropdown-li"><Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCategoryDropdown(!showCategoryDropdown) }}>

                    <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      {element}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
         
          <li><Link className="no-underline font-semibold" to="/nepnews">Nepal</Link></li>
          <li><Link className="no-underline font-semibold" to="/usernews">Posts</Link></li>
          <li><Link className="no-underline font-semibold" to="#" onClick={() => { toggleTheme() }}>
      
          <input type="checkbox" className="checkbox" id="checkbox"/>
             <label htmlFor="checkbox" className="checkbox-label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <span className="ball"></span>
          </label>
          

          </Link></li>
          <li>
          <Link to="/upload" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "50%"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/10495/10495769.png" 
            style={{borderRadius: "50%", width: "40px", height: "40px"}} alt="POST" />
            </Link>
          </li>
          <li>
          <Link to="/profile" style={{width: "40px", height: "40px", cursor: "pointer", borderRadius: "50%"}}>
            <img
           src={profile || "https://cdn.vectorstock.com/i/500p/37/34/user-profile-icon-social-media-vector-51113734.jpg"}
            style={{borderRadius: "50%", width: "40px", height: "40px"}} />
            </Link>
          </li>
        </ul>
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
