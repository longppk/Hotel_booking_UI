import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LuLogOut } from "react-icons/lu";
const AuthPopupStyles = styled.ul`
  width: 160px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Libre Baskerville", serif;
  padding: 10px;
  color: #000;
  .item {
    .item-name{
      display: block;
      padding: 5px 10px;
    }
    &:hover {
      background-color: #e5e5e5;
    }
    .item-btn {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      width: 100%;
      gap: 5px;
    }
  }
`;
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
    <AuthPopupStyles className={className}>
      {data ? (
        <div>
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
        <div>
          <li className="item">
            <NavLink className="item-name" to="/authenticate">SignIn</NavLink>
          </li>
          <li className="item">
            <NavLink className="item-name" to="/authenticate">SignUp</NavLink>
          </li>
        </div>
      )}
    </AuthPopupStyles>
  );
};

export default AuthPopup;
