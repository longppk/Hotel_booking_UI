import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LuLogOut } from "react-icons/lu";


const AuthPopup = ({ className, data }) => {
  const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/authenticate');
        localStorage.removeItem('token');
        localStorage.removeItem('selectedItems');
        localStorage.removeItem('checkIn');
        localStorage.removeItem('checkOut');
        localStorage.removeItem('role');
    };
  return (
    <div className={`${className} bg-white w-1/3 p-5` }>
      {data ? (
        <div className="flex flex-col">
          <li className="item">
            <NavLink to="/profile" className="item-name">My account</NavLink>
          </li>
          <li className="item">
            <button onClick={handleLogout} className="item-btn">
              <LuLogOut />
              <span>LogOut</span>
            </button>
          </li>
        </div>
      ) : (
        <div className="flex flex-col">
          <li className="py-2">
            <NavLink className="item-name" to="/authenticate">SignIn</NavLink>
          </li>
          <li className="py-2">
            <NavLink className="item-name" to="/authenticate">SignUp</NavLink>
          </li>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
