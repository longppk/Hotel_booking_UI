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
    navigation(`detailCategory/${id}`)
  }

  return (
    <div className="mt-14 room-category">
      <div className="text-center">
        <h2 className="text-3xl font-montserrat font-medium">Explore Room</h2>
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
              <img src={item.image} alt="hotel" />
              <div className="container-content my-8">
                <h2 className="font-playfair font-semibold text-xl mb-3">{item.name}</h2>
                <p className="font-montserrat">{item.description}</p>
              </div>
              <div className="btn-box">
                <button onClick={() => detailPage(item.id)} className=" p-2 bg-[#C09B5A] font-montserrat rounded-lg text-white  border-[1px] duration-300 font-medium border-transparent border-solid hover:bg-white hover:text-[#C09B5A] hover:border-[#C09B5A] ">More Detail</button>
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
    </div>
  );
};

export default RoomCategory;
