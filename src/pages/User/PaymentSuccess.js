import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle, FaUserFriends } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoBed } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const PaymentSuccessStyles = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .img-success {
    width: 100px;
    height: 130px;
    color: #33cc00;
  }
  .payment-detail {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .item-detail {
        display: flex;
        gap: 15px;
        background-color: #fff;
        .container-img {
          width: 200px;
          height: 180px;
          .img-check {
            width: 200px;
            height: 180px;
          }
        }
        .item-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          .item-name {
            font-size: 20px;
          }
          .information-detail {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .info-area {
            display: flex;
            gap: 20px;
            margin-left: 15px;
            li {
              list-style-type: disc;
            }
          }
          .info-price {
            text-align: end;
            font-size: 16px;
            font-weight: bold;
            width: 400px;
          }
        }
      }
  }
  .back-home{
    margin-top: 20px;
    .btn-home{
    padding: 10px;
    background-color: #00CCFF;
    font-weight: bold;
  }
  }

`;
const PaymentSuccess = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [time, setTime] = useState({
    checkIn: "",
    checkOut: "",
    night: "",
  });
  const token = localStorage.getItem("token")
  const cardId = localStorage.getItem("cardId")
  const navigate = useNavigate();
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // +1 vì tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);
    let total = 0;
    storedItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total * time.night);
  }, [time.night]);
  useEffect(() => {
    if (selectedItems.length > 0) {
      const roomIds = selectedItems.map((item) => item.id); // Lấy ra mảng các roomId
      setRoomId(roomIds.join(',')); // Kết hợp các roomId lại với nhau thành một chuỗi
    }
  }, []);
  const CheckIn = JSON.parse(localStorage.getItem("checkIn"));
  const CheckOut = JSON.parse(localStorage.getItem("checkOut"));
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
  }, []);

  const handleBackHome = async () => {
    try{
      const res = await axios.get(
        `http://localhost:8080/api/user/checkAvailable?roomIds=${roomId}&checkIn=${CheckIn}&checkOut=${CheckOut}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      console.log(res.data)
      if(res.data === true){
        const bookingRequests = selectedItems.map(item => ({
          roomId: item.id,
          status: 'SUCCESS',
          checkIn: CheckIn,
          checkOut: CheckOut,
          price: item.price * time.night,
          cardId: cardId
        }));
        const res1 = await axios.post(
          `http://localhost:8080/api/booking/room`,bookingRequests,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem("checkIn")
        localStorage.removeItem("checkOut")
        localStorage.removeItem("selectedItems")
        localStorage.removeItem("cardId")
        navigate("/")
      }
      else{
        toast.error("Payment error! We will refund the money to your account", {
          theme: "colored",
        });
        navigate("/")
      }
    }catch(err){
      return false;
    }
    
  }

  return (
    <PaymentSuccessStyles>
      <div>
        <FaCheckCircle className="img-success" />
      </div>
      <h1>Payment Success</h1>
      {/* <div className="payment-detail">
        {selectedItems?.map((item) => (
          <div key={item.id} className="item-detail">
            <div className="item-info">
              <h1 className="item-name">{item.name}</h1>
              <p className="information-detail">
                <IoBed />
                {item.bed}
              </p>
              <p className="information-detail">
                <FaUserFriends />
                {item.capacity} guest
              </p>
              <div className="info-price">
                {(item.price * time.night).toLocaleString("vi-VN")} VND
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="back-home">
        <button onClick={handleBackHome} className="btn-home">Back home</button>
      </div>
    </PaymentSuccessStyles>
  );
};

export default PaymentSuccess;
