import React, { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    // Dummy registration logic for testing (remove this in the final version)
    console.log("Dummy Registration Data:", { name, email, password });
    // Simulate successful registration
    navigate("/login");
  };

  return (
    <div className="RegisterPage">
      <Link to="/login" style={{ textDecoration: "none" }}>
        <div className="login__logo">
          <StoreIcon className="login__logoImage" fontSize="large" />
          <h2 className="login__logoTitle">Online-shopping</h2>
        </div>
      </Link>

      <div className="RegisterPage__container">
        <h1>Sign-Up</h1>

        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
