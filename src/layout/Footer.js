import React from "react";
import styled from "styled-components";
import { IoMailOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BiSolidMap } from "react-icons/bi";
const FooterStyles = styled.section`
  margin: auto;
  .footer-info {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 25px 0;
    background-color: #7f3f30;
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    .footer-register {
      width: 400px;
      position: relative;
      .footer-email {
        color: #000;
        font-size: 14px;
        padding: 10px 100px 10px 20px;
        width: 100%;
      }
      .btn-register {
        background-color: #C09B5A;
        padding: 5px 10px;
        position: absolute;
        right: 2px;
        bottom: 3px;
        color: #fff;
      }
    }
  }
  .footer-static {
    padding: 40px 0;
    color: #fff;
    background-color: #000;
    .footer-content {
      width: 1100px;
      margin: auto;
      display: flex;
      .footer-address {
        width: 400px;
        font-size: 14px;
        border-right: 1px solid #646464;
        .logo {
          display: flex;
          gap: 20px;
          .header-logo {
            img {
              width: 60px;
              height: 60px;
            }
          }
          .logo-name {
            font-size: 40px;
            font-family: 'Playfair Display';
          }
        }
        .address-detail {
          margin: 10px 0;
        }
      }
      .footer-support {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        .list-support {
          padding: 20px;
          display: block;
          .title-support {
            line-height: 39px;
            font-weight: 700;
            text-transform: uppercase;
            font-family: "Playfair Display";
          }
          .partner {
            display: flex;
            .image-link {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .item-support {
            display: flex;
            flex-direction: column;
            .support-link {
              font-size: 13px;
              line-height: 1.8rem;
              text-decoration: none;
              display: block;
              width: 100%;
              color: #fff;
              font-family: "Montserrat Alternates", sans-serif;
            }
          }
        }
      }
    }
  }
`;
const Footer = () => {
  return (
    <FooterStyles className="container">
      <div className="footer-info">
        <IoMailOutline className="icon-email" />
        <h4>receive information when promotion</h4>
        <div className="footer-register">
          <input className="footer-email" placeholder="Enter your email" />
          <button className="btn-register">Đăng ký</button>
        </div>
      </div>
      <div className="footer-static">
        <div className="footer-content">
          <div className="footer-address">
            <div className="logo">
              <div className="header-logo">
                <svg
                  fill="#ada91f"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ada91f"
                  strokeWidth="0.00016"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M0 5.04V4l4-4h8l4 4v1.04L8 16 0 5.04zM2 5l6 8.5L4 5H2zm12 0h-2l-4 8.5L14 5zM6 5l2 6 2-6H6zM4 2L2 4h2l2-2H4zm8 0h-2l2 2h2l-2-2zM7 2L6 4h4L9 2H7z"
                      fillRule="evenodd"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="logo-name">Vela hotel</div>
            </div>
            <p className="address-detail">
              83 Hoa Binh, Ward An Lac, Dist Ninh Kieu, Can Tho City, Vietnam
            </p>
            <p className="address-detail">Tel: +84 (0) 794 458 600</p>
            <p>Email: hoanglong255l@gmail.com</p>
          </div>
          <div>
            <div className="footer-support">
              <div className="list-support">
                <h3 className="title-support">About</h3>
                <div className="item-support">
                  <NavLink className="support-link" to={"/"}>
                    Policy Booking
                  </NavLink>
                  <NavLink className="support-link" to={"/"}>
                    cooperate
                  </NavLink>
                </div>
              </div>
              <div className="list-support">
                <h3 className="title-support">Information</h3>
                <div className="item-support">
                  <NavLink className="support-link" to={"/"}>
                    Location & map
                  </NavLink>
                  <NavLink className="support-link" to={"/"}>
                    Event
                  </NavLink>
                  <NavLink className="support-link" to={"/"}>
                    News
                  </NavLink>
                </div>
              </div>
              <div className="list-support">
                <div className="item-support">
                  <h3 className="title-support">Follow us</h3>
                  <div className="partner">
                    <NavLink className="support-link" to={"/"}>
                      <img
                        className="image-link"
                        src="https://diamondseahotel.com/UploadFile/Article/Tripadvisor-diamond-sea-hotel-da-nang-2018.jpg"
                        alt="app"
                      />
                    </NavLink>
                    <NavLink className="support-link" to={"/"}>
                      <img
                        className="image-link"
                        src="https://kent.vn/wp-content/uploads/2018/08/AAEAAQAAAAAAAAOpAAAAJGE5YTVhNDM3LWNiM2ItNGUzZC1hZjViLTYxNzU5MTVkODRmMg.png"
                        alt="app"
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
