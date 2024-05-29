import React, { useState } from "react";
import styled from "styled-components";
import { IoBarChartSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { SidebarAdminItem } from "../../../SidebarAdmin";
import CategoryList from "../../admin/Table/CategoryList";
import RoomList from "../../admin/Table/RoomList";
import UserList from "../../admin/Table/UserList";
import Authenticate from "../../../pages/User/Authenticate";
import DashBoard from "../../admin/Table/DashBoard";
const SidebarAdminStyles = styled.div`
  margin-top: 65px;
  width: 100%;
  height: 500px;
  padding: 20px 10px;
  color: #000;
  display: flex;
  .menu {
    display: flex;
    flex-direction: column;
    padding: 20px;
    transition: 0.5s;
    width: 250px;
    position: fixed;
    top: 85px;
    background-color: #fff;
    .menu-item {
      &:hover {
        background-color: #f5f5f5;
      }
      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 10px;
        width: 100%;
      }
      .item-drop {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 10px;
        width: 100%;
        background: transparent;
      }
      .menu-dropdown {
        display: none; // Initially don't display the submenu
        flex-direction: column;
        background: #fff; // Background same as the sidebar for consistency
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
        .item-show {
          padding: 10px 10px 10px 50px;
          color: #000;
          cursor: pointer;
          user-select: none;
          &:hover {
            background-color: #e6e6e6; // Light hover effect
          }
        }
      }
      .show {
        display: flex;
      }
    }
  }
`;
const SidebarAdmin = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubItem, setActiveSubItem] = useState('2-1');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id); // Toggle submenu visibility
  };

  const handleItemClick = (itemId) => {
    if (itemId === 4) {
      handleLogOut();
    } 
    setActiveItem(itemId);
    setActiveSubItem(null); // Reset sub item on main item click
  };

  const handleSubItemClick = (itemId, subItemId) => {
    setActiveItem(itemId);
    setActiveSubItem(subItemId);
  };

  const handleLogOut = () => {
        navigate('/authenticate');
        localStorage.removeItem('token');
        localStorage.removeItem('selectedItems');
        localStorage.removeItem('checkIn');
        localStorage.removeItem('checkOut');
        localStorage.removeItem('role');
  }

  const getMenuComponent = (itemId, subItemId) => {
    if (activeSubItem) {
      switch (activeSubItem) {
        case "2-1":
          return <RoomList />;
        case "2-2":
          return <CategoryList />;
        default:
          return null;
      }
    }else {
      switch (itemId) {
          case 3:
              return <UserList />;
          case 1:
              return <DashBoard/>
          default:
              return null;
      }
  }
  };
  return (
    <SidebarAdminStyles>
      <ul className="menu">
        {SidebarAdminItem.map((item) => (
          <li key={item.id} className="menu-item">
            <div
              onClick={() => {
                handleItemClick(item.id);
                item.submenu && toggleSubmenu(item.id);
              }}
              className="item"
            >
              <span>
                <item.icon />
              </span>
              <span>{item.title}</span>
            </div>
            {item.submenu && item.id === activeSubmenu && (
              <ul className="menu-dropdown show">
                {item.submenu.map((subItem) => (
                  <li key={subItem.id} onClick={() => handleSubItemClick(item.id, subItem.id)} className="item-show">
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <>{getMenuComponent(activeItem, activeSubItem)}</>
    </SidebarAdminStyles>
  );
};

export default SidebarAdmin;
