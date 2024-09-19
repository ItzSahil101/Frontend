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

function App() {

  const token = getCookie('Auth');

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
            {/* Redirect to /home if logged in and accessing root, signup, or login */}
            <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/home" /> : <SignIn />}
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
