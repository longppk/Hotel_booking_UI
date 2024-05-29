import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSortAlphaDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import useHandleChange from "../../../hooks/useHandleChange";
const DashBoardStyles = styled.div`
  width: 1000px;
  padding: 0 10px;
  margin-left: 250px;
  .container-total {
    display: flex;
    gap: 20px;
    padding: 0 0 30px 0;
    background-color: #fff;
    padding: 15px;
    padding-bottom: 30px;
    .item-total {
      background-color: #32cd32;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      color: #fff;
      opacity: 0.8;
      &:nth-child(2) {
        background-color: #ef4444;
      }
      &:last-child {
        background-color: #a855f7;
      }
      .header-total {
        font-size: 18px;
      }
      .data-total {
        font-size: 28px;
      }
    }
  }
  .container-action {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0 15px 30px 15px;
    .btn-box {
      display: flex;
      justify-content: space-between;
      width: 500px;
      align-items: center;
      .btn-date-container {
        display: flex;
        gap: 10px;
      }
    }
  }
  .search {
    position: relative;
    .search-input {
      border: 1px solid #ccc;
      width: 385px;
      padding: 5px 35px 5px 20px;
    }
    .search-icon {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  th,
  td {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 12px;
    .btn-edit {
      padding: 5px 10px;
      background-color: #ef4444;
      color: #fff;
      cursor: pointer;
    }
  }
  th {
    background-color: #f5f5f5;
    text-transform: uppercase;
  }
  tr:hover {
    background-color: #f2f2f2;
  }
`;

const DashBoard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [cardId, setCardId] = useState("");
  const [clearedField, setClearedField] = useState("");
  const { values, handleChange } = useHandleChange({
    cardId: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/booking/all"
        );
        setData(response?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDateChange = (setter, date) => {
    if (date != null) {
      setter(date.format("YYYY-MM-DD"));
    } else {
      if (setter === setCheckIn) {
        setClearedField("checkIn"); // Xác định clearedField là 'checkIn' nếu checkIn được xóa
      }
      if (setter === setCheckOut) {
        setClearedField("checkOut"); // Xác định clearedField là 'checkOut' nếu checkOut được xóa
      }
    }
  };

  useEffect(() => {
    if (checkOut === null && values.cardId === "" && checkIn !== null) {
      const fetchData1 = async () => {
        try {
          const response1 = await axios.get(
            `http://localhost:8080/api/booking/all/checkIn?checkIn=${checkIn}`
          );
          setData(response1?.data);
        } catch (error) {}
      };
      fetchData1();
    } else if (checkIn === null && values.cardId === "" && checkOut !== null) {
      const fetchData2 = async () => {
        try {
          const response2 = await axios.get(
            `http://localhost:8080/api/booking/all/checkOut?checkOut=${checkOut}`
          );
          setData(response2?.data);
        } catch (error) {}
      };
      fetchData2();
    } else if (checkIn === null && checkOut !== null && values.cardId !== "") {
      const fetchData3 = async () => {
        try {
          const response3 = await axios.get(
            `http://localhost:8080/api/booking/all/checkOutAndCardId?checkOut=${checkOut}&cardId=${values.cardId}`
          );
          setData(response3?.data);
        } catch (error) {}
      };
      fetchData3();
    } else if (checkOut === null && checkIn !== null && values.cardId !== "") {
      const fetchData4 = async () => {
        try {
          const response4 = await axios.get(
            `http://localhost:8080/api/booking/all/checkInAndCardId?checkIn=${checkIn}&cardId=${values.cardId}`
          );
          setData(response4?.data);
        } catch (error) {}
      };
      fetchData4();
    } else if (checkIn === null && values.cardId === "" && checkOut === null) {
      const fetchData5 = async () => {
        try {
          const response5 = await axios.get(
            "http://localhost:8080/api/booking/all"
          );
          setData(response5?.data);
        } catch (error) {}
      };
      fetchData5();
    }
  }, [checkIn, checkOut, values.cardId]);

  console.log(checkIn);
  console.log(checkOut);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  useEffect(() => {
    if (cleared && clearedField === "checkIn") {
      setCheckIn(null); // Đặt checkIn thành null nếu cleared và clearedField là 'checkIn'
    }
    if (cleared && clearedField === "checkOut") {
      setCheckOut(null); // Đặt checkOut thành null nếu cleared và clearedField là 'checkOut'
    }
  }, [cleared, clearedField]);

  console.log(values.cardId);
  return (
    <DashBoardStyles>
      <div className="container-total">
        <div className="item-total">
          <h2 className="header-total">Total Room</h2>
          <span className="data-total">200</span>
        </div>
        <div className="item-total">
          <h2 className="header-total">Total Room Available</h2>
          <span className="data-total">120</span>
        </div>
        <div className="item-total">
          <h2 className="header-total">Total Room Unavailable</h2>
          <span className="data-total">80</span>
        </div>
      </div>
      <div className="container-action">
        <div className="btn-box">
          <div className="btn-date-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <DatePicker
                  sx={{ width: 260 }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                  label="Check In"
                  format="DD/MM/YYYY"
                  onChange={(date) => handleDateChange(setCheckIn, date)}
                />
              </Box>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <DatePicker
                  sx={{ width: 260 }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                  label="Check Out"
                  format="DD/MM/YYYY"
                  onChange={(date) => handleDateChange(setCheckOut, date)}
                />
              </Box>
            </LocalizationProvider>
          </div>
        </div>
        <div className="search">
          <input
            className="search-input"
            name="cardId"
            placeholder="Search for card ID"
            onChange={handleChange}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Price</th>
            <th>Card ID</th>
            <th>Room ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.checkIn}</td>
              <td>{item.checkOut}</td>
              <td>{item.price}</td>
              <td>{item.cardId}</td>
              <td>{item.room.id}</td>
              <td>
                <button
                  className="btn-edit"
                  //   onClick={() => detailPage(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashBoardStyles>
  );
};

export default DashBoard;
