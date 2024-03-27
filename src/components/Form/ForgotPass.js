import React, { useState } from "react";
import styled from "styled-components";
import useHandleChange from "../hooks/useHandleChange";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
const ForgotPassStyles = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  padding: 40px 0;
  height: 583px;
  .container-form {
    width: 400px;
    margin: auto;
    .container-field {
      margin-top: 15px;
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
        font-size: 18px;
        color: #555555;
        display: flex;
        justify-content: center;
        margin: 20px 0;
        font-weight: 600;
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
    .btn-submit {
      width: 100%;
      height: 40px;
      background-color: #c92127;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      margin-top: 30px;
    }
    .loading {
      border: 8px solid #f3f3f3;
      border-radius: 50%;
      border-top: 8px solid #c92127;
      border-bottom: 8px solid #f3f3f3;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: auto;
    }

    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
function ForgotPass() {
  const navigate = useNavigate();
  const { values, handleChange } = useHandleChange({
    username: "",
    validCode: "",
    password: "",
    confirmPass: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    validCode: "",
  });
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClickable, setIsClickable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res2 = await axios.get(
        `http://localhost:8080/mail/valid/${values.username}/${values.validCode}`
      );
      if (res2.data === 200) {
        toast.success("Enter code success",{
          theme: "colored"
        });
        setShow1(true);
      } else {
        toast.error("Valid code is incorrect",{
          theme: "colored"
        });
      }
    } catch (e) {}
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsClickable(false);
    setTimeout(() => {
      setIsClickable(true);
    }, 5000);
    try {
      const res = await axios.post(
        `http://localhost:8080/mail/send/${values.username}`
      );
      toast.success("Valid code has been sent to email", {
        theme: "colored"
      })
      setLoading(false);
      setShow(false);
    } catch (err) {}
  };

  const handleChangePass = async () => {
    const errors = {};
    if (values.password === "") {
      errors.password = "Password is required";
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values.password)
    ) {
      errors.password = "Password must contain at least one special character";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (values.confirmPass === "") {
      errors.confirmPass = "Confirm password is require";
    } else if (values.confirmPass !== values.password) {
      errors.confirmPass = "Password do not match";
    } else {
      errors.password = "";
      errors.confirmPass = "";
    }
    setErrorMessage(errors);
    if(errors.password === "" && errors.confirmPass === ""){
      try {
        const { username, password } = values;
        const dataSend = { username, password };
        console.log(dataSend);
        const res = await axios.post("http://localhost:8080/api/user/save", dataSend);
        if(res.data === 200){
          toast.success("Change password success",{
            theme: "colored"
          })
          navigate("/authenticate")
        }
      } catch (err) {}
    }
    else{
      return;
    }

  };

  return (
    <ForgotPassStyles>
      {!show1 && (
        <div className="container-form" autoComplete="off">
          {show ? (
            show && (
              <>
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
                  <label className="form-label" htmlFor="username">
                    Email
                  </label>
                  <input
                    className="form-input"
                    placeholder="Please enter your email"
                    type="email"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    autoComplete="off"
                  ></input>
                  <p className="form-message">{errorMessage.username}</p>
                </div>
                <button
                  onClick={handleSendMail}
                  className="btn-submit"
                  disabled={!isClickable}
                >
                  {!loading ? "Submit mail" : <div className="loading"></div>}
                </button>
              </>
            )
          ) : (
            <div>
              <form onSubmit={handleSubmit} className="container-field">
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
                <label className="form-label" htmlFor="validCode">
                  <h1>Please enter the code sent to gmail</h1>
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter your valid code"
                  type="text"
                  id="password"
                  name="validCode"
                  onChange={handleChange}
                  autoComplete="off"
                ></input>
                <p className="form-message">{errorMessage.password}</p>
                <button type="submit" className="btn-submit">
                  Submit Code
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      {show1 && (
        <div className="container-form" autoComplete="off">
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
              autoComplete="off"
            ></input>
            <p className="form-message">{errorMessage.password}</p>
          </div>
          <div className="container-field">
            <label className="form-label" htmlFor="confirmPass">
              Confirm password
            </label>
            <input
              className="form-input"
              placeholder="Please enter your confirm password"
              type="password"
              id="confirmPass"
              name="confirmPass"
              onChange={handleChange}
              autoComplete="off"
            ></input>
            <p className="form-message">{errorMessage.confirmPass}</p>
          </div>
          <button onClick={handleChangePass} className="btn-submit">
            Chang Password
          </button>
        </div>
      )}
    </ForgotPassStyles>
  );
}

export default ForgotPass;
