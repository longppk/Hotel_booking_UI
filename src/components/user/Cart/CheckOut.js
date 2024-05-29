import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHandleChange from "../../../hooks/useHandleChange";
import { setValuesData } from "../../redux/actionSearch";
const CheckOutStyles = styled.div`
  padding: 50px 0 0 120px;
  color: #333;
  width: 100%;
  margin: auto;
  .container-check-out {
    display: flex;
    .content-check {
      width: 650px;
      .item-check {
        display: flex;
        gap: 15px;
        background-color: #fff;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 8px;
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
            font-weight: bold;
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
      .detail-user {
        display: flex;
        flex-direction: column;
        border: 1px solid #000;
        padding: 15px;
        margin-top: 10px;
        background-color: #fff;
        .detail-title {
          display: flex;
          gap: 10px;
          align-items: center;
          font-weight: bold;
          font-size: 18px;
          margin: 10px 0;
          .steep {
            background-color: #caaf7c33;
            padding: 5px 13px;
            border-radius: 50%;
            border: 1px solid hsla(38, 44%, 33.3%, 1);
            font-weight: bold;
            color: #7a5f30;
          }
        }
        .container-field {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          .field {
            display: flex;
            flex-direction: column;

            .form-label {
              font-size: 16px;
              color: #555555;
              font-weight: bold;
              padding: 0 5px;
            }
            .form-input {
              width: 100%;
              border: 1px solid #ced4da;
              padding: 8px 10px;
              border-radius: 8px;
            }
            .form-message {
              color: #cf3c3f;
              font-size: 13px;
            }
          }
        }
        .complete-booking {
          .check-term {
            display: flex;
            gap: 10px;
            align-items: center;
            margin: 5px 0;
            .check {
              width: 20px;
              height: 20px;
            }
          }
          .btn-booking {
            background-color: #7a5f30;
            padding: 5px 280px;
            color: #fff;
            font-weight: bold;
          }
        }
      }
    }
    .container-total {
      padding: 20px;
      background-color: #fff;
      margin-left: 10px;
      width: 350px;
      height: 150px;
      border: 1px solid #ced4da;
      border-radius: 8px;
      position: fixed;
      right: 140px;
      .total-price {
        font-size: 20px;
        margin: 10px 0;
      }
      .total-time {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        font-style: italic;
      }
      .total-person {
        font-style: italic;
      }
    }
  }
`;

const CheckOut = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [roomId, setRoomId] = useState([])
  const [time, setTime] = useState({
    checkIn: '',
    checkOut: '',
    night: ''
  })
  const cardId = localStorage.getItem("cardId")
  const { values, handleChange } = useHandleChange({
    cardId:cardId || "" ,
  });
  const [errorMessage, setErrorMessage] = useState({
    cardId: "",
  });
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
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
      night: numberOfNights
    });
  }, []);
  useEffect(() => {
  if (selectedItems.length > 0) {
    const roomIds = selectedItems.map((item) => item.id); // Lấy ra mảng các roomId
    setRoomId(roomIds.join(',')); // Kết hợp các roomId lại với nhau thành một chuỗi
  }
}, [selectedItems]);

  const handleCheckOut = async () => {
    const errors = {};
    if (values.cardId === "") {
      errors.cardId = "CardID is required";
    }
    else if(values.cardId.length < 12){
      errors.cardId = "CardID is not in the correct format"
    }
     else {
      errors.cardId = "";
    }
    setErrorMessage(errors);
    if (!(Object.values(errors).some(error => error !== ''))) {
      try{
        const res = await axios.get(
          `http://localhost:8080/api/user/checkAvailable?roomIds=${roomId}&checkIn=${CheckIn}&checkOut=${CheckOut}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        if(res.data === true ){
          const res1 = await axios.post(
            `http://localhost:8080/api/booking/checkout/createUrl?totalPrice=${totalPrice}`,{},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
          });
          window.location.href = res1.data.data;
        }
        else{
          toast.error("One of room you selected is not available, Please select again",{
            theme: "colored"
          });
        }
      }
      catch(err){}
    }else{
      return;
    }
   
  }
  console.log(values.cardId)
  function parseQueryString(url) {
    // Nếu không có URL được cung cấp, sử dụng URL hiện tại của trình duyệt
    const queryString = url ? new URL(url).search : window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const result = {};

    // Danh sách các trường cần trích xuất từ query string
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

    // Lặp qua danh sách trường và thêm giá trị vào đối tượng kết quả
    fields.forEach((field) => {
      const value = urlParams.get(field);
      // Kiểm tra nếu giá trị không null và không rỗng
      if (value !== null && value !== undefined && value !== "") {
        result[field] = value;
      }
    });

    return result;
  }

  // Sử dụng hàm để lấy các giá trị từ query string và xử lý
  const queryParams = parseQueryString();
  console.log(queryParams);
  useEffect(() => {
    localStorage.setItem("cardId", values.cardId)
    
  },[values.cardId])

  const [checkPayment, setCheckPayment] = useState(false);
    useEffect(() => {
        const queryParams = parseQueryString();
        if (queryParams.vnp_ResponseCode === '00') {
          navigate("/payment/success");
        } else if(queryParams.vnp_ResponseCode === '24'){
            toast.error("Đã hủy thanh toán");
        }
    }, []);
  return (
    <CheckOutStyles>
      <div className="container-check-out">
        <div className="content-check">
          {selectedItems?.map((item) => (
            <div key={item.id} className="item-check">
              <div className="container-img">
                <img
                  className="img-check"
                  src={item.images[0]?.imageUrl}
                  alt="vela hotel"
                />
              </div>
              <div className="item-info">
                <h1 className="item-name">
                  {item.name}
                </h1>
                <p className="information-detail">
                  <IoBed />
                  {item.bed}
                </p>
                <p className="information-detail">
                  <FaUserFriends />{item.capacity} guest
                </p>
                <ul className="info-area">
                  <li>{item.length * item.width} m²</li>
                  <li>{}</li>
                </ul>
                <div className="info-price">{(item.price * time.night).toLocaleString("vi-VN")} VND</div>
              </div>
            </div>
          ))}
          <div className="detail-user">
            <div className="detail-title">
              <span className="steep">1</span>
              <span>Your Information</span>
            </div>
            <div className="container-field">
              <div className="field">
                <label className="form-label" htmlFor="firstName">
                  Firstname
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter your Firstname"
                  type="text"
                  id="firstName"
                  name="firstName"
                ></input>
                <p className="form-message"></p>
              </div>
              <div className="field">
                <label className="form-label" htmlFor="lastName">
                  Lastname
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter your Lastname"
                  type="text"
                  id="lastName"
                  name="lastName"
                ></input>
                <p className="form-message"></p>
              </div>
              <div className="field">
                <label className="form-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter your Email"
                  type="email"
                  id="email"
                  name="email"
                ></input>
                <p className="form-message"></p>
              </div>
              <div className="field">
                <label className="form-label" htmlFor="confirmEmail">
                  Confirm e-mail
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter confirm e-mail"
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                ></input>
                <p className="form-message"></p>
              </div>
              <div className="field">
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter confirm e-mail"
                  type="text"
                  id="phone"
                  name="phone"
                ></input>
                <p className="form-message"></p>
              </div>
              <div className="field">
                <label className="form-label" htmlFor="identification">
                  Identification number
                </label>
                <input
                  className="form-input"
                  placeholder="Please enter Identification number"
                  type="text"
                  id="identification"
                  name="cardId"
                  onChange={handleChange}
                ></input>
                <p className="form-message">{errorMessage.cardId}</p>
              </div>
            </div>
            <div className="detail-title">
              <span className="steep">2</span>
              <span>Complete booking</span>
            </div>
            <div className="complete-booking">
              <h3>Term and condition</h3>
              <div className="check-term">
                <input className="check" type="checkbox" />
                <p>I have read and agree to the terms and condition</p>
              </div>
              <button  onClick={handleCheckOut} className="btn-booking">booking</button>
            </div>
          </div>
        </div>
        <div className="container-total">
          <h1 className="total-price">
            {totalPrice.toLocaleString("vi-VN")} VND
          </h1>
          <div className="total-time">
            <span>
              FROM {time.checkIn} TO {time.checkOut}
            </span>
            <span>{time.night} night</span>
          </div>
          <p className="total-person">2 room 4 guest</p>
        </div>
      </div>
    </CheckOutStyles>
  );
};

export default CheckOut;
