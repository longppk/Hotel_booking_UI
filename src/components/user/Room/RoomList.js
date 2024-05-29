import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import { IoBed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
const RoomListStyles = styled.section`
  padding-top: 80px;
  width: 1240px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .search-room {
    position: static;
    width: 100%;
    .search-container {
      width: 100%;
      background: #c09b5a;
    }
  }
  .container-list-room {
    margin: 20px 0;
    display: flex;
    max-width: 1240px;
    .activeSidebar {
      background-color: #c09b5a;
      position: sticky;
      top: 90px;
    }
    .room-list {
      display: flex;
      flex-direction: column;
      width: 700px;
      border-radius: 20px;
      .room-item {
        display: flex;
        border: 1px solid #c09b5a;
        background: #fff;
        border-radius: 20px;
        margin-bottom: 10px;
        padding: 10px;
        font-family: "Montserrat", sans-serif;
        .room-image {
          width: 300px;
          height: auto;
          .image-main {
            display: block;
            width: 100%;
            height: 180px;
          }
          .list-image {
            margin-top: 10px;
            display: flex;
            gap: 5px;
            .image-sub {
              width: calc(215px / 3);
              height: 50px;
            }
          }
        }
        .room-information {
          width: 700px;
          padding: 0 20px;
          h2 {
            font-weight: bold;
          }
          .information-content {
            position: relative;
            margin-top: 20px;
            .information-detail {
              display: flex;
              align-items: center;
              gap: 7px;
              padding: 5px 0;
            }
            .btn {
              bottom: 15px;
              right: 0;
              position: absolute;
              .btn-booking {
                padding: 5px 10px;
                background-color: #c09b5a;
                color: #fff;
                cursor: pointer;
                font-weight: 600;
                text-transform: capitalize;
                border: 2px solid #c09b5a;
                transition: 0.3s;
                &:hover {
                  color: #c09b5a;
                  background-color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const RoomList = () => {
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataCart, setDataCart] = useState(null);
  const [item, setItem] = useState();
  const [itemRemove, setItemRemove] = useState();
  const searchData = useSelector((state) => state.search.searchData);

  const handleItemClick = (itemId) => {
    setItem(itemId);
  };
  console.log(item);
  const handleImageClick = (imageId, roomId) => {
    setSelectedImage(imageId);
    setSelectedRoomId(roomId);
  };
  console.log(searchData);
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItem(storedItems);
  }, [itemRemove]);

  const handleRoomItemClick = (itemIdRoom) => {
    setSelectedItem(itemIdRoom);
    const selectedItemData = searchData.find((item) => item.id === itemIdRoom);
    let storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    storedItems.push(selectedItemData);
    localStorage.setItem("selectedItems", JSON.stringify(storedItems));
  };
  const isItemSelected = (itemId) => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    console.log(storedItems.some((item) => item.id === itemId));
    return storedItems.some((item) => item.id === itemId);
  };
  const handleItemRemove = async (itemId) => {
    setItemRemove(itemId);
  };
  return (
    <div>
      <Search className=" px-32 pt-20 pb-5" item={item} />
      <div className="w-full px-3 flex">
        <Sidebar className="w-[30%]" onItemClick={handleItemClick} />
        <div className="w-[70%] pl-10 flex flex-col gap-4">
          {searchData
            ?.filter((item) => item !== null)
            .map((item) => (
              <div key={item.id} className="w-full flex gap-3 bg-white p-5">
                <div className="w-1/2 flex flex-col gap-2">
                  {item?.images?.length > 0 && (
                    <>
                      <img
                        className="w-full"
                        src={
                          selectedRoomId === item.id && selectedImage
                            ? item.images.find(
                                (image) => image.id === selectedImage
                              )?.imageUrl
                            : item.images[0]?.imageUrl
                        }
                        alt="hotel"
                      />
                      <div className="flex gap-2 w-full">
                        {item.images.slice(0, 4).map((image) => (
                          <button
                            className="w-1/4 "
                            key={image.id}
                            onClick={() => handleImageClick(image.id, item.id)}
                          >
                            <img
                              className="w-full"
                              src={image.imageUrl}
                              alt="hotel"
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="font-montserrat">
                  <h2 className="text-base font-medium">{item.name}</h2>
                  <div className="text-sm">
                    <p>{item.description}</p>
                    <p className="flex gap-3 items-center">
                      {" "}
                      <IoBed />
                      {item.bed}
                    </p>
                    <p className="flex gap-3 items-center">
                      <FaUserFriends />
                      {item.capacity} guest
                    </p>
                    <p className="flex gap-3 items-center">
                      <IoMdResize />
                      {item.length * item.width} m2
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="italic font-semibold">
                        Price: {item.price.toLocaleString("vi-VN")}
                      </p>
                      <button
                        disabled={isItemSelected(item.id)}
                        onClick={() => handleRoomItemClick(item.id)}
                        className="bg-[#C09B5A] p-2 font-medium text-white"
                      >
                        {" "}
                        {isItemSelected(item.id) ? "selected" : "booking now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* <Cart selectedItem={selectedItem} onItemClick={handleItemRemove}/> */}
      </div>
    </div>
  );
};

export default RoomList;
