import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useHandleChange from "../../../hooks/useHandleChange";
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
        color: #fff;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        text-transform: uppercase;
        font-weight: bold;
        justify-content: center;
        .logo-name {
          font-size: 25px;
          color: rgb(49 46 203);
        }
        .star-box {
          display: flex;
          color: #ffff00;
          justify-content: center;
          .img-star {
            width: 20px;
            height: 20px;
          }
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
    try {
      const { username, password } = values;
      const dataSend = { username, password };
      console.log(dataSend);
      const res = await axios.post(
        "http://localhost:8080/api/user/signup",
        dataSend
      );
      if (res.data === true) {
        toast.success("Sign Up success");
      } else {
        toast.error("Email already exits");
      }
    } catch (err) {}
  };
  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="max-md:w-1/2 md:w-[38%] lg:w-1/3 mx-auto"
        autoComplete="off"
      >
        <div className="container-field">
          <NavLink to={"/"} className="">
            <div className="text-center mt-10">
              <span className="text-[#312ECB] text-2xl font-bold text-center uppercase">
                Vela hotel
              </span>
              <span className="flex justify-center">
                <img
                  className="w-[20px] h-[20px]"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                  alt="hotel"
                />
                <img
                  className="w-[20px] h-[20px]"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                  alt="hotel"
                />
                <img
                  className="w-[20px] h-[20px]"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                  alt="hotel"
                />
                <img
                  className="w-[20px] h-[20px]"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                  alt="hotel"
                />
                <img
                  className="w-[20px] h-[20px]"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                  alt="hotel"
                />
              </span>
            </div>
          </NavLink>
          <div className="py-2">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border-solid border-[1px] border-[#ced4da]"
              placeholder="Please enter your email"
              type="email"
              id="email"
              name="username"
              onChange={handleChange}
            />
            <p className="text-sm text-[#C92127]">{errorMessage.username}</p>
          </div>
        </div>
        <div className="py-2">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border-solid border-[1px] border-[#ced4da]"
            placeholder="Please enter your password"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          ></input>
          <p className="text-sm text-[#C92127]">{errorMessage.password}</p>
        </div>
        <div className="py-2">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 border-solid border-[1px] border-[#ced4da]"
            placeholder="Please enter your confirm password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
          ></input>
          <p className="text-sm text-[#C92127]">{errorMessage.confirmPassword}</p>
        </div>
        <div className="text-end">
          <NavLink className="text-sm font-medium text-[#c92127]" to={"/forgotPass"}>Forgot your password ?</NavLink>
        </div>
        <div className="mt-7">
          <button type="submit" className="flex items-center justify-center w-4/5 mx-auto mb-3 p-2 bg-[#C92127] text-white rounded">
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
