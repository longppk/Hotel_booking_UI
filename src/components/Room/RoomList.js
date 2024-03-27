import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
import { IoBed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import axios from "axios";
import { useParams } from "react-router-dom";
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
      width: 1040px;
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
            height: 230px;
          }
          .list-image {
            margin-top: 10px;
            display: flex;
            gap: 5px;
            .image-sub {
              width: calc(215px / 3);
              height: 60px;
            }
          }
        }
        .room-information {
          width: 700px;
          padding: 0 20px;
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
              bottom: 20px;
              right: 0;
              position: absolute;
              .btn-booking {
                padding: 10px;
                background-color: #c09b5a;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
`;

const RoomList = () => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [item, setItemId] = useState(id || 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/category/${item}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [item]);

  const handleItemClick = (itemId) => {
    setItemId(itemId);
  };
  console.log(data);
  const handleImageClick = (imageId, roomId) => {
    setSelectedImage(imageId);
    setSelectedRoomId(roomId);
  };
  return (
    <RoomListStyles>
      <Search className="search-room" />
      <div className="container-list-room">
        <Sidebar onItemClick={handleItemClick} />
        <div className="room-list">
          {data?.map((item) => (
            <div key={item.id} className="room-item">
              <div className="room-image">
                {item.images?.length > 0 ? (
                  <>
                    <img
                      className="image-main"
                      src={(selectedRoomId === item.id && selectedImage) ? 
                        item.images.find(image => image.id === selectedImage)?.imageUrl : 
                        item.images[0]?.imageUrl
                      }
                      alt="hotel"
                    />
                    <div className="list-image">
                      {item.images.slice(0, 4).map((image) => (
                        <button
                          key={image.id}
                        onClick={() => handleImageClick(image.id, item.id)}>
                        <img
                          className="image-sub"
                          src={image.imageUrl}
                          alt="hotel"
                        />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="no-image">No images available</div>
                )}
              </div>
              <div className="room-information">
                <h2>{item.name}</h2>
                <div className="information-content">
                  <p>{item.description}</p>
                  <p className="information-detail">
                    {" "}
                    <IoBed />1 double bed
                  </p>
                  <p className="information-detail">
                    <FaUserFriends />2 guest
                  </p>
                  <p className="information-detail">
                    <PiTelevisionSimpleLight />
                    Led TV
                  </p>
                  <p className="information-detail">Size: 30m2</p>
                  <p className="information-detail">Price: 1.800.000</p>
                  <div className="btn">
                    <button className="btn-booking">Booking now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoomListStyles>
  );
};

export default RoomList;
