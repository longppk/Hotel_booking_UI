import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styled from "styled-components";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const RoomCategoryStyles = styled.section`
  padding: 80px 0 30px;
  .swiper-slide-prev {
    img {
      opacity: 0.4;
    }
    .container-content {
      visibility: hidden;
    }
    .btn-box{
      visibility: hidden;
    }
  }
  .swiper-slide-next {
    img {
      opacity: 0.4;
    }
    .container-content {
      visibility: hidden;
    }
    .btn-box{
      visibility: hidden;
    }
  }
  .title {
    display: flex;
    justify-content: center;
    .heading {
      letter-spacing: 2px;
      font-weight: 400;
    }
  }
  .container-content {
    margin-top: 20px;
    .title-category {
      font-family: "Didact Gothic", sans-serif;
      text-transform: uppercase;
      font-size: 18px;
    }
    .content-category {
      font-family: "Libre Baskerville", serif;
      line-height: 30px;
      font-style: italic;
      user-select: none;
    }
  }
  .btn-box {
    margin-top: 20px;
    .btn-detail {
      color: #000;
      padding: 5px 40px;
      font-family: "Libre Baskerville", serif;
      font-style: italic;
      border: 1px solid #7f3f30;
      transition: .4s all;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #7f3f30;
      }
    }
  }
  .room-icon {
    color: #000;
  }
`;
const RoomCategory = () => {
  const [data, setData] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/category');
        setData(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const detailPage = (id) => {
    navigation(`listRoom/${id}`)
  }

  return (
    <RoomCategoryStyles>
      <div className="title">
        <h1 className="heading">Explore Room</h1>
      </div>
      {data &&
        <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="flower" />
              <div className="container-content">
                <h2 className="title-category">{item.name}</h2>
                <p className="content-category">{item.description}</p>
              </div>
              <div className="btn-box">
                <button onClick={() => detailPage(item.id)} className="btn-detail">More Detail</button>
              </div>
            </SwiperSlide>
          ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <FaArrowLeft className="room-icon" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <FaArrowRight className="room-icon" />
          </div>
        </div>
      </Swiper>
      }
    </RoomCategoryStyles>
  );
};

export default RoomCategory;
