import React from "react";
import "./App.css";
import "./output.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import {ProtectedRoute, getCookie} from "./components/ProtectedRoute";
import UserDashboard from "./components/UserDashboard";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {

  const token = getCookie('Auth');
  const tokentwo = localStorage.getItem("auth");

  const isAuthenticated = token || tokentwo;

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
            {/* Redirect to /home if logged in and accessing root, signup, or login */}
            <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/signup" />}
          />
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
            <Route path="/home" element={<AllNews />} />
            <Route path="/top-headlines/:category" element={<TopHeadlines />} />
            <Route path="/country/:iso" element={<CountryNews />} />
            <Route path="/profile/dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
