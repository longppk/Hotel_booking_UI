import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Cart = ({ selectedItem, onItemClick, className }) => {
  const navigate = useNavigate();
  const { checkIn, checkOut } = useSelector((state) => state.search.valuesData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);
  }, [selectedItem]);

  useEffect(() => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total * numberOfNights);
  }, [selectedItems, numberOfNights]);

  const handleRemoveItem = (itemId) => {
    const updatedItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(updatedItems);
    onItemClick(itemId);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  };

  const handleBooking = () => {
    if (selectedItems.length > 0) {
      navigate("/checkOut");
    }
  };

  useEffect(() => {
    localStorage.setItem("checkIn", JSON.stringify(checkIn));
    localStorage.setItem("checkOut", JSON.stringify(checkOut));
  }, [checkIn, checkOut]);

  return (
    <div className={className}>
      <div className="font-lato">
        <h3 className="font-semibold text-xl my-3">
          {`VND ${totalPrice.toLocaleString("vi-VN")} total`}
        </h3>
        <div className="flex justify-between">
          <p className="info-date">
            <span className="date">{formatCheckIn} - {formattedCheckOut}</span>
          </p>
          <span>{numberOfNights} night{numberOfNights > 1 ? 's' : ''}</span>
        </div>
      </div>
      {selectedItems.map((item) => (
        <div key={item.id} className="my-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{item.name}</span>
            <button onClick={() => handleRemoveItem(item.id)}>
              <IoTrashOutline />
            </button>
          </div>
          <span>
            {item.bed} ({item.capacity} guest{item.capacity > 1 ? 's' : ''})
          </span>
          <div className="flex justify-between items-center">
            <span className="info">Price</span>
            <span>{item.price.toLocaleString("vi-VN")}</span>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center font-semibold italic text-lg">
        <span className="info">Total Price</span>
        <span>{totalPrice.toLocaleString("vi-VN")} VND</span>
      </div>
      <div className="text-center w-full font-semibold">
        <button onClick={handleBooking} className="bg-[#C09B5A] w-full py-1">
          Book
        </button>
      </div>
    </div>
  );
};

export default Cart;
