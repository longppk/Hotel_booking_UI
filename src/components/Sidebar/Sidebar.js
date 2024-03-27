import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
      &:hover, &.active-btn-search {
        color:#7f3f30;
      }
    }
  }
`;

const Sidebar = ({onItemClick}) => {
    const [sideBar, setSideBar] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [data, setData] = useState(null);

    const changeBackground = () => {
      if(window.scrollY > 10){
        setSideBar(true);
      }
      else{
        setSideBar(false);
      }
    };
    window.addEventListener('scroll', changeBackground);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/user/category/name');
          setData(response?.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);



    const handleButtonClick = (buttonName, itemId) => {
        setActiveButton(buttonName);
        onItemClick(itemId);
    };

  return (
    <SidebarStyles className={sideBar ? 'activeSidebar' : ''}>
      {data?.map((item) => (
        <div className="btn" key={item.id}>
          <button
            className={`btn-category ${activeButton === item.name ? 'active-btn-search' : ''}`}
            onClick={() => handleButtonClick(item.name, item.id)}
          >
            {item.name}
          </button>
        </div>
      ))}
    </SidebarStyles>
  );
};

export default Sidebar;
