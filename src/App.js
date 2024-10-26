import React from "react";
import "./App.css";
import "./output.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import Privacy from './components/Privacy';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {ProtectedRoute, getCookie} from "./components/ProtectedRoute";
// import UserDashboard from "./components/UserDashboard";
import Nepnews from "./components/Nepnews";
import Upload from "./components/Upload";
import Usernews from './components/Usernews';
import Profile from "./components/Profile";
import Edit from "./components/Edit";
import Yourpost from "./components/Yourpost";

function App() {

  const token = getCookie('Auth');
  const tokentwo = localStorage.getItem("auth");

  const isAuthenticated = token || tokentwo;

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
         <Analytics/>
         <SpeedInsights/>
        <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/" element={<AllNews />} />
        <Route path="/home" element={<AllNews />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines />} />
            {/* Redirect to /home if logged in and accessing root, signup, or login
            <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/home" />}
          /> */}
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <SignIn />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/profile/dashboard" element={<UserDashboard />} /> */}
            <Route path="/nepnews" element={<Nepnews />} />
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/usernews" element={<Usernews/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/edit" element={<Edit/>}/>
            <Route path="/yourposts" element={<Yourpost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
