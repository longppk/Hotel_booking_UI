import React, { useState } from "react";
import styled from "styled-components";
import useHandleChange from "../../../hooks/useHandleChange";
import { FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosStar } from "react-icons/io";
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
const SignIn = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useHandleChange({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (values.username === "") {
      errors.username = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
      errors.username = "Email is not valid";
    }

    if (values.password === "") {
      errors.password = "Password is required";
    } else {
      errors.username = "";
      errors.password = "";
    }
    setErrorMessage(errors);
    if (!Object.values(errors).some((error) => error !== "")) {
      try {
        const { username, password } = values;
        const dataSend = { username, password };
        const res = await axios.post(
          "http://localhost:8080/api/user/signin",
          dataSend
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        toast.success("Login success", {
          theme: "colored",
        });
        if (res.data.role === "USER") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            toast.error("Username or Password is incorrect", {
              theme: "colored",
            });
          } else if (status === 423) {
            toast.error("Account is locked, please contact with admin", {
              theme: "colored",
            });
          }
        }
      }
    } else {
      return;
    }
  };
  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="max-md:w-1/2 md:w-[38%] lg:w-1/3 mx-auto"
        autoComplete="off"
      >
        <div className="">
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
            <label className="block " htmlFor="username">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border-solid border-[1px] border-[#ced4da]"
              placeholder="Please enter your email"
              type="email"
              id="username"
              name="username"
              onChange={handleChange}
            />
            <p className="text-sm text-[#C92127]">{errorMessage.username}</p>
          </div>
          <div className="py-2">
            <label className="block" htmlFor="password">
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
        </div>
        <div className="text-end ">
          <NavLink
            className="text-sm font-medium text-[#c92127]"
            to={"/forgotPass"}
          >
            Forgot your password ?
          </NavLink>
        </div>
        <div className="mt-7">
          <button type="submit" className="flex items-center justify-center w-4/5 mx-auto mb-3 p-2 bg-[#C92127] text-white rounded">
            Login
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-4/5 mx-auto mb-3 p-2 bg-blue-800 text-white rounded"
          >
            <FaFacebookF className="mr-2" />
            <span>Login With Facebook</span>
          </button>
        </div>
      </form>
    </section>
  );
};
export default SignIn;
