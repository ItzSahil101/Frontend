import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <App />
<<<<<<< HEAD
      <Analytics/>
      <SpeedInsights/>
=======
   <Analytics />
     <SpeedInsights />
>>>>>>> 7e3e047eba55ae13ebf1f9b26a795a6bf269ff47
   
  </React.StrictMode>
);
  
