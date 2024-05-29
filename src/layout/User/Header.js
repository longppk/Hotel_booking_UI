import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";
import { MdMenu } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import useClickOutSide from "../../hooks/useClickOutSide";
const Header = () => {
  const [data, setData] = useState("");
  const token = localStorage.getItem("token");
  const { showDropdown, setShowDropdown, dropdownRef } = useClickOutSide();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/getUsername",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {}
    };
    fetchUsername();
  }, []);
  return (
    <div className="bg-zinc-900 fixed z-50 overflow-hidden flex justify-between items-center sm:px-7 sm:py-3 sm:w-full sm:items-end md:w-full md:px-3 md:py-2 lg:w-full lg:px-10 lg:py-3">
      <div className="text-white sm:text-3xl h-full md:hidden">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          ref={dropdownRef}
        >
          <MdMenu />
        </button>
      </div>
      <div className="header-logo">
        <NavLink to={"/"} className="logo items-center flex gap-3">
          <svg
            id="logo"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:h-6 md:w-6 lg:h-10 lg:w-10"
          >
            {" "}
            <path
              d="M18.9523 11.0726C18.5586 7.69873 18.1429 4.13644 18.1429 0H21.8571C21.8571 4.08998 21.4434 7.64774 21.0502 11.0254C20.7299 13.778 20.4235 16.411 20.3666 19.115C22.2316 17.1697 23.863 15.107 25.572 12.9463C27.6791 10.2823 29.9043 7.46945 32.829 4.54464L35.4554 7.17104C32.5633 10.0631 29.7547 12.2861 27.0884 14.3966L27.0859 14.3985C24.9141 16.1178 22.8365 17.7624 20.885 19.6334C23.579 19.5765 26.1911 19.2717 28.9272 18.9524C32.3011 18.5586 35.8636 18.1429 40 18.1429V21.8571C35.9102 21.8571 32.3524 21.4432 28.9749 21.0502L28.9724 21.05C26.2204 20.7298 23.5882 20.4236 20.885 20.3666C22.829 22.2302 24.8906 23.8609 27.0499 25.5687L27.0533 25.5716C29.7174 27.6789 32.5304 29.9039 35.4554 32.829L32.829 35.4554C29.9369 32.5634 27.714 29.755 25.6038 27.0889L25.5988 27.082L25.5946 27.0765C23.8775 24.9081 22.2349 22.8338 20.3666 20.885C20.4235 23.589 20.7299 26.222 21.0502 28.9746C21.4434 32.3523 21.8571 35.91 21.8571 40H18.1429C18.1429 35.8636 18.5586 32.3013 18.9523 28.9274L18.9531 28.9219C19.272 26.1877 19.5765 23.5772 19.6334 20.885C17.7651 22.8338 16.1225 24.9081 14.4054 27.0765L14.4012 27.082L14.3962 27.0889C12.286 29.755 10.0631 32.5634 7.17104 35.4554L4.54464 32.829C7.46959 29.9039 10.2826 27.6789 12.9467 25.5716L12.9501 25.5687C15.1094 23.8609 17.171 22.2302 19.115 20.3666C16.411 20.4237 13.7779 20.73 11.0251 21.0502C7.6476 21.4432 4.08984 21.8571 0 21.8571V18.1429C4.13644 18.1429 7.69894 18.5586 11.0728 18.9524C13.8089 19.2717 16.421 19.5765 19.115 19.6334C17.1627 17.7617 15.0843 16.1166 12.9116 14.3966C10.2453 12.2861 7.43666 10.0631 4.54464 7.17104L7.17104 4.54464C10.0957 7.46945 12.3209 10.2823 14.428 12.9463C16.137 15.1069 17.7684 17.1696 19.6334 19.1148C19.5765 16.4227 19.272 13.8123 18.9531 11.0781L18.9523 11.0726Z"
              className="ccustom"
              fill="#FFA589"
            ></path>{" "}
          </svg>
          <div className="md:flex md:flex-col lg:flex lg:flex-col">
            <span className="text-white md:text-xs lg:text-lg">Vela hotel</span>
            <span className="star-box flex">
              <img
                className="img-star sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-5 lg:w-5"
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                alt="hotel"
              />
              <img
                className="img-star sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-5 lg:w-5"
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                alt="hotel"
              />
              <img
                className="img-star sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-5 lg:w-5"
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                alt="hotel"
              />
              <img
                className="img-star sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-5 lg:w-5"
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                alt="hotel"
              />
              <img
                className="img-star sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-5 lg:w-5"
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-3d-golden-star-png-image_13370055.png"
                alt="hotel"
              />
            </span>
          </div>
        </NavLink>
      </div>
      <div className="header-menu sm:hidden md:w-auto md:h-auto md:p-0 md:static md:bg-transparent md:flex md:gap-4 lg:flex lg:gap-4">
        <NavLink className="header-link text-white lg:text-lg" to={"/about"}>
          <span>About</span>
        </NavLink>

        <NavLink className="header-link text-white lg:text-lg " to={"/service"}>
          <span>Service</span>
        </NavLink>

        <NavLink
          className="header-link text-white lg:text-lg "
          to={"/listCategory"}
        >
          <span>Room</span>
        </NavLink>
        <div className="header-account flex" to={"/profile"}>
          <span className="header-icon cursor-pointer flex px-5 text-white text-2xl border-l-2 border-solid border-white-600">
            <MdAccountCircle />
          </span>
          {data && <span className="text-white">{data}</span>}
        </div>
      </div>
      <div
        className={`duration-500 ${
          showDropdown ? "-left-[1px]" : "-left-[400px]"
        } fixed md:hidden bg-white top-0 w-1/2 h-screen py-10 px-3 flex flex-col gap-4`}
      >
        <div className="header-account flex gap-3">
          <i className="bx bx-x bx-md bx-tada absolute right-0 top-1"></i>
          <span className="header-icon w-[40px] cursor-pointer flex text-black text-2xl relative">
            <MdAccountCircle />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-black z-50"></span>
          </span>
          <span className="text-black">{data || "User"}</span>
        </div>
        <NavLink className="header-link text-black lg:text-lg px-3 border-b-2 " to={"/about"}>
          <span>About</span>
        </NavLink>

        <NavLink className="header-link text-black lg:text-lg px-3 border-b-2 " to={"/service"}>
          <span>Service</span>
        </NavLink>

        <NavLink
          className="header-link text-black lg:text-lg px-3 border-b-2 "
          to={"/listCategory"}
        >
          <span>Room</span>
        </NavLink>
        {data ? (
          <div>
            <button className="flex gap-4 items-center">
              <TbLogout2 className="text-black" />
              <span className="text-black">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col px-3 gap-3">
            <NavLink
              className="header-link text-black lg:text-lg border-b-2"
              to={"/authenticate"}
            >
              <span>Sign In</span>
            </NavLink>
            <NavLink
              className="header-link text-black lg:text-lg border-b-2"
              to={"/authenticate"}
            >
              <span>Sign Up</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
