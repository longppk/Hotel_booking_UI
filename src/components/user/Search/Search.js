import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa";
import useHandleChange from "../../../hooks/useHandleChange";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchData } from "../../redux/actionSearch";
import { useSelector } from "react-redux";
import { setValuesData } from "../../redux/actionSearch";
const SearchStyles = styled.div`
  position: absolute;
  bottom: -30px;
  width: 100%;
  .search-container {
    width: 900px;
    margin: auto;
    background-color: #fff;
    padding: 15px 0px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .search {
      text-align: start;
      .search-label {
        color: #000;
        font-weight: 700;
        user-select: none;
        font-family: "Playfair Display";
      }
      .search-input {
        display: flex;
        flex-direction: column;
        padding: 5px 40px;
        background: #f5f5f5;
        cursor: pointer;
        user-select: none;
      }
      .search-amount {
        background-color: #f5f5f5;
        display: flex;
        gap: 25px;
        align-items: center;
        justify-content: center;
        color: #000;
        cursor: pointer;
        padding: 6px 20px;
        user-select: none;
        .search-icon {
          font-size: 20px;
        }
      }
    }
    .search-btn {
      margin-top: 25px;
      button {
        padding: 7px 20px;
        background-color: #7f3f30;
        color: #fff;
        cursor: pointer;
        user-select: none;
      }
    }
  }
`;

const Search = ({ className, item, itemsPerPage, pageCurrent, sort}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
  const { checkIn, checkOut, requireCapacity } = useSelector(state => state.search.valuesData);
  const [amount, setAmount] = useState(requireCapacity || 1);
  const { values, handleChange } = useHandleChange({
    checkIn:  checkIn || today,
    checkOut:  checkOut || tomorrowFormatted,
    requiredCapacity:  requireCapacity || 1 ,
  });
  console.log(requireCapacity)
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const minDateTime = year + "-" + month + "-" + day;

  const handleMinus = () => {
    if (amount > 1) setAmount((pre) => pre - 1);
  };

  const handlePlus = () => {
    setAmount((pre) => pre + 1);
  };
  console.log(item)
  const handleSearch = async () => {
    if (item) {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/available-rooms?checkIn=${values.checkIn}&checkOut=${values.checkOut}&requiredCapacity=${amount}&categoryId=${item}&pageCurrent=${pageCurrent}&pageSize=${itemsPerPage}&sort=${sort}`
        );
        if (res.data) {
          dispatch(setSearchData(res.data));
        } else {
          return null;
        }
      } catch (err) {}
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, values.checkIn, values.checkOut, amount, pageCurrent, sort]);

  // gán checkOut là ngày tiếp theo của checkIn nếu checkIn lớn hơn hoặc bằng ngày checkOut
  useEffect(() => {
    if (
      values.checkIn &&
      new Date(values.checkIn) >= new Date(values.checkOut)
    ) {
      const checkOut = new Date(values.checkIn);
      checkOut.setDate(checkOut.getDate() + 1);
      handleChange({
        target: {
          name: "checkOut",
          value: checkOut.toISOString().split("T")[0],
        },
      });
    }
  }, [values.checkIn]);

  const handleCheckAvailabilityClick = () => {
    handleSearch();
    if (window.location.pathname !== "/listRoom") {
      navigate("/listRoom");
    }
  };
  const minCheckOutDate = values.checkIn
    ? new Date(new Date(values.checkIn).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : today;

    useEffect(() => {
      dispatch(setValuesData({ ...values, requireCapacity: amount }));
    }, [amount, dispatch, values]);
  console.log(values);
  return (
    <div className={`${className}`}>
      <div className=" sm:flex-col md:flex-row sm:w-1/2 sm:gap-2 lg:w-full md:w-11/12 md:px-6 mx-auto py-4 px-12 justify-center flex bg-[#C09B5A] md:gap-8 items-center">
        <div className="sm:w-full md:w-auto flex flex-col  cursor-pointer">
          <label className="font-playfair font-semibold italic" htmlFor="checkIn">
            Check In
          </label>
          <input
            id="checkIn"
            value={values.checkIn}
            min={minDateTime}
            className="bg-[#f5f5f5] px-3 py-2 cursor-pointer"
            type="date"
            name="checkIn"
            onChange={handleChange}
          />
        </div>
        <div className="sm:w-full md:w-auto flex flex-col cursor-pointer">
          <label className="font-playfair font-semibold italic" htmlFor="checkOut">
            Check Out
          </label>
          <input
            id="checkOut"
            value={values.checkOut}
            min={minCheckOutDate}
            className="bg-[#f5f5f5] px-3 py-2 cursor-pointer"
            type="date"
            name="checkOut"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:w-full md:w-auto cursor-pointer">
          <label className="font-playfair font-semibold italic" htmlFor="person">
            Person
          </label>
          <div id="person" className="select-none sm:items-center sm:justify-between sm:px-16 md:px-8 flex items-center gap-4 bg-[#f5f5f5] px-3 py-2">
            <FaMinus className="text-lg" onClick={handleMinus} />
            <span>{amount}</span>
            <FaPlus className="text-lg" onClick={handlePlus} />
          </div>
        </div>
        <div className="items-end pt-6 sm:w-full md:w-auto">
          <button className=" sm:w-full md:w-auto bg-[#7f3f30] px-3 py-2 font-playfair font-semibold italic text-white tracking-wide md:text-sm" onClick={handleCheckAvailabilityClick}>
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;