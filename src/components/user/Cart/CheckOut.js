import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown, IoMdResize } from "react-icons/io";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHandleChange from "../../../hooks/useHandleChange";
import { setValuesData } from "../../redux/actionSearch";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const CheckOut = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [paymentRequest, setPaymentRequest] = useState({});
  const [time, setTime] = useState({
    checkIn: "",
    checkOut: "",
    night: 0,
  });
  const [paymentUrl, setPaymentUrl]= useState(true)
  const [checked, setChecked] = useState(true)
  const cardId = localStorage.getItem("cardId");
  const { values, handleChange } = useHandleChange({
    cardId: cardId || "",
  });
  const [errorMessage, setErrorMessage] = useState({
    cardId: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Function to format date
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // +1 because months are zero indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const CheckIn = JSON.parse(localStorage.getItem("checkIn"));
  const CheckOut = JSON.parse(localStorage.getItem("checkOut"));

  // useEffect to calculate check-in, check-out dates and number of nights
  useEffect(() => {
    const fmcheckIn = formatDate(CheckIn);
    const fmCheckOut = formatDate(CheckOut);
    const checkInDate = new Date(CheckIn);
    const checkOutDate = new Date(CheckOut);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setTime({
      checkIn: fmcheckIn,
      checkOut: fmCheckOut,
      night: numberOfNights,
    });
  }, [CheckIn, CheckOut]);

  // useEffect to update selected items and calculate total price based on nights
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);
    let total = 0;
    storedItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total * time.night);
  }, [time.night]);

  // useEffect to update room IDs and payment request

  // Function to handle checkout
  const handleCheckOut = async () => {
    const errors = {};
    if (values.cardId === "") {
      errors.cardId = "CardID is required";
    } else if (values.cardId.length < 12) {
      errors.cardId = "CardID is not in the correct format";
    } else {
      errors.cardId = "";
    }
    setErrorMessage(errors);

    if (!Object.values(errors).some((error) => error !== "")) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/checkAvailable?roomIds=${roomId}&checkIn=${CheckIn}&checkOut=${CheckOut}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data === true) {
          const res1 = await axios.post(
            `http://localhost:8080/api/booking/checkout/createUrl?totalPrice=${totalPrice}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.href = res1.data.data;
        } else {
          toast.error(
            "One of the rooms you selected is not available. Please select again.",
            {
              theme: "colored",
            }
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // useEffect to update cardId in localStorage
  useEffect(() => {
    localStorage.setItem("cardId", values.cardId);
  }, [values.cardId]);

  useEffect(() => {
    const getListBooking = () => {
      if (selectedItems.length > 0) {
        const roomIds = selectedItems.map((item) => item.id).join(",");
        setRoomId(roomIds);
        const bookingRequests = selectedItems.map((item) => ({
          roomId: item.id,
          status: "SUCCESS",
          checkIn: CheckIn,
          checkOut: CheckOut,
          price: item.price * time.night,
          cardId: cardId,
        }));
        setPaymentRequest((prevState) => ({
          ...prevState,
          bookingRequestList: bookingRequests,
        }));
        console.log("chay2")
        setChecked(false)
      }
    };
    getListBooking()
  },[paymentUrl])

  
  // Function to parse query string from URL
  useEffect(() => {
    const parseQueryString = (url) => {
      const queryString = url ? new URL(url).search : window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const result = {};
      const fields = [
        "vnp_Amount",
        "vnp_BankCode",
        "vnp_BankTranNo",
        "vnp_CardType",
        "vnp_OrderInfo",
        "vnp_PayDate",
        "vnp_ResponseCode",
        "vnp_TmnCode",
        "vnp_TransactionNo",
        "vnp_TransactionStatus",
        "vnp_TxnRef",
        "vnp_SecureHash",
      ];
    
      fields.forEach((field) => {
        const value = urlParams.get(field);
        if (value !== null) {
          result[field] = value;
        }
      });
      setPaymentRequest((prevState) => ({ ...prevState, ...result }));
      setPaymentUrl(false)
      console.log("chay1")
    };
    parseQueryString()
  },[])

  
  useEffect(() => {
    console.log(paymentRequest)
    console.log("chay3")
  }, [checked]);
  

  // useEffect to handle response code from query parameters
  useEffect(() => {
    const checkResponse = async () => {
      try {
        const res2 = await axios.post(
          "http://localhost:8080/api/booking/checkout/checkResponse",
          paymentRequest,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res2);
      } catch (err) {
        console.error(err);
      }
    };

    checkResponse();
  }, []);


  return (
    <div className="flex flex-row w-full pt-24 gap-2 justify-center">
      <div className="w-[50%]">
        {selectedItems?.map((item) => (
          <div key={item.id} className="w-full h-auto flex gap-3 bg-white p-5">
            <div className="w-1/3 flex flex-col gap-2">
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
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                {item?.images?.map((items, index) => (
                  <SwiperSlide key={index + 1}>
                    <img src={items.imageUrl} alt="flower" />
                  </SwiperSlide>
                ))}
                <div className="slider-controler">
                  <div className="swiper-button-prev slider-arrow">
                    <SlArrowLeft className="text-blue-700 !w-1/2" />
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <SlArrowRight className="text-blue-700 !w-1/2" />
                  </div>
                </div>
              </Swiper>
            </div>
            <div className="w-2/3 font-montserrat select-none">
              <h2 className="text-base font-medium pt-2">{item.name}</h2>
              <div className="text-sm h-[130px]">
                <p className="py-1">{item.description}</p>
                <div className="flex gap-3">
                  <p className="flex gap-3 items-center py-1">
                    <IoBed />
                    {item.bed}
                  </p>
                  <p className="flex gap-3 items-center py-1">
                    <FaUserFriends />
                    {item.capacity} guest
                  </p>
                  <p className="flex gap-3 items-center py-1">
                    <IoMdResize />
                    {item.length * item.width}m²
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="italic font-semibold">
                  Price: {item.price.toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white w-full mt-2 p-7">
          <div className="">
            <span className="bg-[#fce9e9] px-[12px] py-[7px] rounded-full border-solid border-[1px] border-[#C09B5A] text-[#C09B5A] font-semibold">
              1
            </span>
            <span className="ml-5 font-semibold text-xl">Your Information</span>
          </div>
          <div className="grid grid-cols-2 gap-x-14 my-8">
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="firstName">
                Firstname
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter your Firstname"
                type="text"
                id="firstName"
                name="firstName"
              ></input>
              <p className="form-message"></p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="lastName">
                Lastname
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter your Lastname"
                type="text"
                id="lastName"
                name="lastName"
              ></input>
              <p className="form-message"></p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter your Email"
                type="email"
                id="email"
                name="email"
              ></input>
              <p className="form-message"></p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="confirmEmail">
                Confirm e-mail
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter confirm e-mail"
                type="email"
                id="confirmEmail"
                name="confirmEmail"
              ></input>
              <p className="form-message"></p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter confirm e-mail"
                type="text"
                id="phone"
                name="phone"
              ></input>
              <p className="form-message"></p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label" htmlFor="identification">
                Identification number
              </label>
              <input
                className="border-solid border-[1px] border-[#ced4da] p-2"
                placeholder="Please enter Identification number"
                type="text"
                id="identification"
                name="cardId"
                onChange={handleChange}
              ></input>
              <p className="text-sm text-[#D33133]">{errorMessage.cardId}</p>
            </div>
          </div>
          <div className="detail-title">
            <span className="bg-[#fce9e9] px-[12px] py-[7px] rounded-full border-solid border-[1px] border-[#C09B5A] text-[#C09B5A] font-semibold">
              2
            </span>
            <span className="ml-5 font-semibold text-xl">Complete booking</span>
          </div>
          <div className="mt-8">
            <h3>Term and condition</h3>
            <div className="flex gap-3 items-center mb-5">
              <input className="check" type="checkbox" />
              <p>I have read and agree to the terms and condition</p>
            </div>
            <button
              onClick={handleCheckOut}
              className="w-full bg-[#C09B5A] py-1 font-lato font-semibold"
            >
              booking
            </button>
          </div>
        </div>
      </div>
      <div className="w-[30%] h-1/2 sticky top-24 bg-white font-lato p-5">
        <h1 className="font-semibold text-xl">
          {totalPrice.toLocaleString("vi-VN")} VND
        </h1>
        <div className="flex justify-between items-center mt-5">
          <span>
            {time.checkIn} - {time.checkOut}
          </span>
          <span>{time.night} night</span>
        </div>
        <p className="italic">2 room 4 guest</p>
      </div>
    </div>
  );
};

export default CheckOut;
