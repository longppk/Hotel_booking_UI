import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useHandleChange from "../../hooks/useHandleChange";
const SignInStyles = styled.div`
  margin: 20px auto;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
  .container-form {
    width: 400px;
    margin: auto;
    .container-field {
      margin-top: 15px;
      cursor: pointer;
      .logo {
        display: flex;
        align-items: center;
        font-weight: bold;
        gap: 10px;
        justify-content: center;
        .logo-name {
          font-size: 25px;
          color: rgb(49 46 203);
        }
      }
      .form-label {
        font-size: 14px;
        color: #555555;
      }
      .form-input {
        width: 100%;
        border: 1px solid #ced4da;
        padding: 8px 10px;
      }
      .form-message {
        color: #cf3c3f;
        font-size: 13px;
      }
    }
    .forgot-pass {
      font-size: 14px;
      color: #c92127;
      text-align: end;
      margin-top: 10px;
      cursor: pointer;
    }
    .form-box-btn {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .btn-submit {
        width: 100%;
        height: 40px;
        background-color: #c92127;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
      }
      .btn-facebook {
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: #2489f4;
        .icon-box {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 14px;
          .btn-icon {
            width: 20px;
            height: 20px;
            padding: 3px 3px;
            color: #2489f4;
            background-color: #fff;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;
const SignUp = () => {
  const { values, handleChange } = useHandleChange({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (values.username === "") {
      errors.username = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
      errors.username = "Email is not valid";
    } else if (values.password === "") {
      errors.password = "Password is required";
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.password)
    ) {
      errors.password = "Password must contain at least one special character";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (values.confirmPassword === "") {
      errors.confirmPassword = "Confirm password is require";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Password do not match";
    } else {
      errors.username = "";
      errors.password = "";
      errors.confirmPassword = "";
    }
    setErrorMessage(errors);
    try{
      const {username, password} = values;
      const dataSend = {username, password};
      console.log(dataSend)
      const res = await axios.post("http://localhost:8080/api/user/signup",
      dataSend
      );
      if(res.data === true){
        toast.success("Sign Up success")
      }
      else{
        toast.error("Email already exits")
      }
    }
    catch(err){
      
    }

  };
  return (
    <SignInStyles>
      <form
        onSubmit={handleSubmit}
        className="container-form"
        autoComplete="off"
      >
        <div className="container-field">
        <NavLink to={"/"} className="logo">
              <span>
                <svg
                  id="logo-35"
                  width="80"
                  height="80"
                  viewBox="0 0 50 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    className="ccompli1"
                    fill="#007AFF"
                  ></path>
                  <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    className="ccustom"
                    fill="#312ECB"
                  ></path>
                </svg>
              </span>
              <span className="logo-name">Book.com</span>
            </NavLink>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            placeholder="Please enter your email"
            type="email"
            id="email"
            name="username"
            onChange={handleChange}
          ></input>
          <p className="form-message">{errorMessage.username}</p>
        </div>
        <div className="container-field">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            placeholder="Please enter your password"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          ></input>
          <p className="form-message">{errorMessage.password}</p>
        </div>
        <div className="container-field">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-input"
            placeholder="Please enter your confirm password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          ></input>
          <p className="form-message">{errorMessage.confirmPassword}</p>
        </div>
        <div className="forgot-pass">
          <NavLink to={"/forgotPass"}>Forgot your password ?</NavLink>
        </div>
        <div className="form-box-btn">
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </div>
      </form>
    </SignInStyles>
  );
};

export default SignUp;
