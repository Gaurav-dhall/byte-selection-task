
import React from 'react'
// import { Router, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_page from "./components/Home_page";
import Unauthorized_page from "./components/Unauthorized_page";
import Private_page from "./components/Private_page";
import './index.css';
// import gIcon from '../assets/g-icon.png';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/unauthorized" element={<Unauthorized_page />} />
        <Route path="/private" element={<Private_page />} />
      </Routes>
    </Router>
  );
}
export default App;