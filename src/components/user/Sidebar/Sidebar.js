import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import useHandleChange from "../../../hooks/useHandleChange";
import ReactPaginate from 'react-paginate';

const SidebarStyles = styled.section`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  width: 200px;
  height: 220px;
  margin: 0 10px 0 0;
  .btn {
    border-bottom: 1px solid #ccc;
    .btn-category {
      padding: 10px 20px;
      background-color: #fff;
      font-family: "Montserrat", sans-serif;
      font-weight: 600;
      user-select: none;
      cursor: pointer;
      width: 100%;
      transition: all.5s;
      &:hover,
      &.active-btn-search {
        color: #7f3f30;
      }
    }
  }
`;


const Sidebar = ({ onItemClick, className }) => {
  const [sideBar, setSideBar] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  
  const handleClick = (option) => {
    setSelectedOption(option);
  };
  const changeBackground = () => {
    if (window.scrollY > 10) {
      setSideBar(true);
    } else {
      setSideBar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/category/name"
        );
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // const handleButtonClick = (buttonName, itemId) => {
  //   setActiveButton(buttonName);
    
  // };
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  useEffect(() => {
    // Call onItemClick with the updated selectedIds
    onItemClick(selectedIds);
  }, [selectedIds, onItemClick]);
  console.log(selectedIds);
  return (
    <div className={`${className} bg-white p-5`}>
      <h1 className="text-center font-semibold">Filter to</h1>
      <h2 className="text-sm">Type room:</h2>
      <ul className="btn">
        {data?.map((item) => (
          <li
            key={item.id}
            className="relative flex items-center justify-center gap-2.5 bg-white px-3 py-2 hover:border-gray-400"
          >
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              name="id"
              value={item.id}
              checked={selectedIds.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
              className="peer cursor-pointer relative h-4 w-4 shrink-0 appearance-none rounded-sm after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 focus:outline-none border-2 border-solid border-gray-700"
            />
            <label
              htmlFor={`checkbox-${item.id}`}
              className="w-full cursor-pointer font-medium text-sm"
            >
              {item.name}
            </label>
          </li>
        ))}
      </ul>
      <h2>Price:</h2>
      <ul className="flex gap-5 text-gray-600">
      <li
        className={`select-none relative flex items-center gap-3 w-1/2 p-2 rounded-xl border-gray-300 border-[1px] cursor-pointer bg-gray-200 ${selectedOption === 'lowToHigh' ? ' border-[#d70018] text-[#d70018] after:content-["✓"] after:absolute after:top-0 after:right-0 after:w-5 after:h-3 after:rounded-tr-xl after:rounded-bl-xl after:bg-[#d70018] after:text-white after:flex after:items-center after:justify-center after:text-[7px] bg-[#FEF2F2]' : ''}`}
        onClick={() => handleClick('lowToHigh')}
      >
        <ImSortAmountAsc /> <span className="text-xs ">Price low - high</span>
      </li>
      <li
        className={`select-none relative flex items-center gap-3 w-1/2 p-2 rounded-xl border-gray-300 border-transparent border-[1px] cursor-pointer bg-gray-200 ${selectedOption === 'highToLow' ? ' border-[#d70018] text-[#d70018] after:content-["✓"] after:absolute after:top-0 after:right-0 after:w-5 after:h-3 after:rounded-tr-xl after:rounded-bl-xl after:bg-[#d70018] after:text-white after:flex after:items-center after:justify-center after:text-[7px] bg-[#FEF2F2]' : ''}`}
        onClick={() => handleClick('highToLow')}
      >
        <ImSortAmountDesc /> <span className="text-xs">Price high - low</span>
      </li>
    </ul>
    </div>
  );
};

export default Sidebar;
