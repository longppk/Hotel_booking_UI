import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
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
        font-family: 'Playfair Display';
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
        .search-icon{
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

const Search = (props) => {
  const [amount, setAmount] = useState(1);

  const handleMinus = () => {
    if (amount > 1) setAmount((pre) => pre - 1);
  };

  const handlePlus = () => {
    setAmount((pre) => pre + 1);
  };
  return (
    <SearchStyles className={props.className}>
      <div className="search-container ">
        <div className="search">
          <label className="search-label" htmlFor="checkIn">
            Check In
          </label>
          <input id="checkIn" className="search-input" type="date" />
        </div>
        <div className="search">
          <label className="search-label" htmlFor="checkOut">
            Check Out
          </label>
          <input id="checkOut" className="search-input" type="date" />
        </div>
        <div className="search">
          <label className="search-label" htmlFor="person">
            Person
          </label>
          <div id="person" className="search-amount">
            <FaMinus className="search-icon" onClick={handleMinus} />
            <span>{amount}</span>
            <FaPlus className="search-icon" onClick={handlePlus} />
          </div>
        </div>
        <div className="search-btn">
          <button>Check Availability</button>
        </div>
      </div>
    </SearchStyles>
  );
};

export default Search;
