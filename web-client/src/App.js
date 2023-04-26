import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BuyerDashboard from "./pages/BuyerDashboard";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/buyer"> Buyer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <div> Foooter </div>
    </Router>
  );
}

export default App;