import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
const CartStyles = styled.div`
  margin-left: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  color: #333;
  .info-booking {
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    .info-date {
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      margin: 20px 0 10px 0;
      .date {
        color: #7f3f30;
      }
    }
  }
  .info-select {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .title-room {
      padding: 0 20px 0 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .info-price {
    display: flex;
    justify-content: space-between;
    padding: 10px 0 20px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  .button {
    .button-booking {
      padding: 10px 120px;
      background-color: #7f3f30;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
const Cart = ({ selectedItem, onItemClick }) => {
  const navigate = useNavigate()
  const { checkIn, checkOut } = useSelector((state) => state.search.valuesData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // +1 vì tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatcheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);
  }, [selectedItem]);
  console.log(selectedItems);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);
    let total = 0;
    storedItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total * numberOfNights);
  }, [selectedItem, numberOfNights]);

  const handleRemoveItem = (itemId) => {
    const updatedItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updatedItems);
    onItemClick(itemId);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  };
  
  console.log(selectedItems.length)
  const handleBooking = () => {
    if(selectedItems.length > 0){
      navigate("/checkOut")
    }
    else{
      return;
    }
  }
  useEffect(() => {
    // Lưu ngày checkIn và checkOut vào localStorage
    localStorage.setItem("checkIn", JSON.stringify(checkIn));
    localStorage.setItem("checkOut", JSON.stringify(checkOut));
  }, [checkIn, checkOut]);
  return (
    <CartStyles>
      <div>
        <div className="info-booking">
          <h3>{`VND ${totalPrice.toLocaleString("vi-VN")} TOTAL`}</h3>
          <p className="info-date">
            from <span className="date">{formatcheckIn}</span> to{" "}
            <span className="date">{formattedCheckOut}</span>
          </p>
          <span>{numberOfNights} night</span>
        </div>
        {selectedItems?.map((item) => (
          <div key={item.id}>
            <div className="info-select">
              <span className="title-room">{item.name}</span>
              <button onClick={() => handleRemoveItem(item.id)}>
                <IoTrashOutline />
              </button>
            </div>
            <div className="info-price">
              <span>
                {item.bed}({item.capacity} guest)
              </span>
            </div>
            <div className="info-price">
              <span className="info">Price</span>
              <span>{item.price.toLocaleString("vi-VN")}</span>
            </div>
          </div>
        ))}
        <div className="info-select">
          <span className="info">Total Price</span>
          <span>{totalPrice.toLocaleString("vi-VN")} VND </span>
        </div>
        <div className="button">
          <button onClick={handleBooking} className="button-booking">
            Book
          </button>
        </div>
      </div>
    </CartStyles>
  );
};

export default Cart;
