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
import { MdFilterListAlt } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const itemsPerPage = 6;

const RoomList = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [selectedItem, setSelectedItem] = useState([]);
  const [itemRemove, setItemRemove] = useState();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [sort, setSort] = useState(null);
  const [item, setItem] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const searchData = useSelector((state) => state.search.searchData);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItem(storedItems);
  }, [itemRemove]);

  const handleItemClick = (itemId) => {
    setItem(itemId);
  };

  const handleImageClick = (imageId, roomId) => {
    setSelectedImage(imageId);
    setSelectedRoomId(roomId);
  };

  const handleRoomItemClick = (itemIdRoom) => {
    const selectedItemData = searchData.rooms.find(
      (item) => item.id === itemIdRoom
    );
    let storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    storedItems.push(selectedItemData);
    setSelectedItem(storedItems); // Update state immediately
    localStorage.setItem("selectedItems", JSON.stringify(storedItems));
  };

  const isItemSelected = (itemId) => {
    return selectedItem.some((item) => item.id === itemId);
  };

  const handleItemRemove = (itemId) => {
    const updatedItems = selectedItem.filter((item) => item.id !== itemId);
    setSelectedItem(updatedItems); // Update state immediately
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
    setItemRemove(itemId);
  };

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!searchData?.totalResult) return;
    setPageCount(Math.ceil(searchData.totalResult / itemsPerPage));
  }, [searchData, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchData.totalResult;
    setItemOffset(newOffset);
    setPageCurrent(event.selected + 1);
  };

  const handleSort = (option) => {
    setSort(option);
  };

  const handleShowFilter = () => {
    setShowFilter((pre) => !pre);
  };

  return (
    <div>
      <Search
        className="px-32 pt-20 pb-5 mx-3 max-lg:px-0 bg-white "
        item={item}
        itemsPerPage={itemsPerPage}
        pageCurrent={pageCurrent}
        sort={sort}
      />
      <div className=" bg-white mx-3 block px-5 pb-5">
        <button
          onClick={handleShowFilter}
          className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-xl"
        >
          <MdFilterListAlt className="text-xl" />
          <span>Filter</span>
        </button>
      </div>
      <Sidebar
        className={`transition-all duration-500 ease-in-out top-20 overflow-hidden static mx-3 ${
          showFilter ? "block h-[270px] mx-3 p-5" : "h-0 p-0"
        }`}
        onItemClick={handleItemClick}
        onSort={handleSort}
      />
      <div className="w-full px-3 mt-2 flex justify-between max-md:flex-col flex-row relative">
        <div className="room-list w-[70%] flex flex-col gap-4 max-md:w-full max-md:pl-0 max-md:mt-5">
          {searchData?.rooms && searchData.rooms.length > 0 ? (
            searchData.rooms
              .filter((item) => item !== null)
              .map((item) => (
                <div
                  key={item.id}
                  className="w-full h-auto flex gap-3 bg-white p-5"
                >
                  <div className="w-1/3 flex flex-col gap-2">
                    <Swiper
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      loop={true}
                      slidesPerView={"auto"}
                      coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                      }}
                      pagination={{ el: ".swiper-pagination", clickable: true }}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        clickable: true,
                      }}
                      modules={[EffectCoverflow, Pagination, Navigation]}
                      className="swiper_container"
                    >
                      {item?.images?.map((items, index) => (
                        <SwiperSlide key={index + 1}>
                          <img src={items.imageUrl} alt="flower" />
                        </SwiperSlide>
                      ))}
                      <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                          <SlArrowLeft className="text-blue-700 !w-1/2" />
                        </div>
                        <div className="swiper-button-next slider-arrow">
                          <SlArrowRight className="text-blue-700 !w-1/2" />
                        </div>
                      </div>
                    </Swiper>
                  </div>
                  <div className="w-2/3 font-montserrat select-none">
                    <h2 className="text-base font-medium pt-2">{item.name}</h2>
                    <div className="text-sm h-[130px]">
                      <p className="py-1">{item.description}</p>
                      <div className="flex gap-3">
                        <p className="flex gap-3 items-center py-1">
                          <IoBed />
                          {item.bed}
                        </p>
                        <p className="flex gap-3 items-center py-1">
                          <FaUserFriends />
                          {item.capacity} guest
                        </p>
                        <p className="flex gap-3 items-center py-1">
                          <IoMdResize />
                          {item.length * item.width}m²
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="italic font-semibold">
                        Price: {item.price.toLocaleString("vi-VN")}
                      </p>
                      <button
                        disabled={isItemSelected(item.id)}
                        onClick={() => handleRoomItemClick(item.id)}
                        className="bg-[#C09B5A] p-2 font-medium text-white"
                      >
                        {isItemSelected(item.id) ? "Selected" : "Booking Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>No data</p>
          )}
        </div>
        <Cart
          className="w-[30%] max-md:w-full p-3 h-1/2 bg-white ml-2 text-[#333333]"
          selectedItem={selectedItem}
          onItemClick={handleItemRemove}
        />
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination justify-center items-center flex gap-12 mt-8"
        pageLinkClassName="p-3 bg-white"
        previousLinkClassName="p-3 bg-white"
        nextLinkClassName="p-3 bg-white"
        breakLinkClassName="p-3 bg-white"
        containerClassName="flex"
        activeLinkClassName="text-red-500"
      />
    </div>
  );
};

export default RoomList;
