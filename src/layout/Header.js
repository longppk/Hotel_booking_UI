import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";

const HeaderStyles = styled.header`
  padding: 5px 50px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  opacity: 85%;
  display: flex;
  justify-content: space-between;
  background-color: #c09b5a;
  .header-logo {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-menu {
    display: flex;
    .header-link {
      color: #fff;
      text-decoration: none;
      padding: 0 10px;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      user-select: none;
    }
    .header-account {
      margin: 10px 0;
      padding: 0 10px;
      border-left: 2px solid #fff;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      color: #fff;
      cursor: pointer;
      user-select: none;
      .header-icon {
        font-size: 30px;
      }
    }
  }
  img {
    width: 40px;
    height: 40px;
    transform: scale(100px);
  }
`;
const Header = () => {

  return (
    <HeaderStyles>
      <div className="header-logo">
        <img src="https://t4.ftcdn.net/jpg/04/45/63/69/360_F_445636937_VnBUZ8NVUYD6kzZ3MxweB3e9R3Og95je.jpg" alt="logo"/>
      </div>

      <div className="header-menu">
        <NavLink className="header-link" to={"/about"}>
          <span>About</span>
        </NavLink>

        <NavLink className="header-link" to={"/service"}>
          <span>Service</span>
        </NavLink>

        <NavLink className="header-link" to={"/listRoom"}>
          <span>Room</span>
        </NavLink>
        <div className="header-account" to={"/profile"}>
          <span className="header-icon">
            <MdAccountCircle />
          </span>
          <span>Long123</span>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
