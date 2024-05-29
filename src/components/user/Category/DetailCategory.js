import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdResize } from "react-icons/io";
import { IoBed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { BsDashLg } from "react-icons/bs";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ListCategory = () => {
  const [data, setData] = useState();
  const [dataAll, setDataAll] = useState();
  const [amenity, setAmenity] = useState();
  const { id } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/category/${id}`
        );
        setData(response?.data);
        setAmenity(response?.data?.amenity);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/category`
        );
        setDataAll(response?.data);
      } catch (error) {}
    };
    fetchDataAll();
  }, []);
  console.log(data);
  console.log(amenity);
  const handleNavigation = (path) => {
    // Thực hiện navigation
    navigation(path);

    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };
  const handleBookNow = () => {
    navigation("/listRoom")
  }
  return (
    <div>
      {data && (
        <div className="my-20">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-2xl font-medium mb-5">{data.name}</h2>
            <p className="font-montserrat px-5">{data.description}</p>
          </div>
          <div className="sm:w-[90%] lg:w-[85%] mx-auto flex relative">
            <div className="w-1/2">
              <img className="w-full h-[500px]" src={data.image} alt="vela-hotel" />
            </div>
            {amenity?.map((item) => (
              <div key={item.id} className="w-[55%] pl-20 absolute right-0 top-[10%] rounded-xl border-solid border-[1px] border-[#C09B5A] p-6">
                <h4 className="text-center font-semibold gap-5">Information</h4>
                <p className="flex gap-3 items-center">
                  <IoMdResize className="information-icon" />
                  <span className="font-montserrat">{item.length * item.width} m2</span>
                </p>
                <p className="flex gap-3 items-center py-3">
                  <IoBed className="" />
                  <span className="font-montserrat">{item.bed}</span>
                </p>
                <p className="flex gap-3 items-center">
                  <FaUserFriends className="" />
                  <span className="font-montserrat">{item.capacity} guest</span>
                </p>
                <ul className="font-montserrat grid grid-cols-2 gap-2 mt-5 text-sm">
                  <li className="list-disc">{item.wifi}</li>
                  <li className="list-disc">{item.tivi}</li>
                  <li className="list-disc">{item.safety}</li>
                  <li className="list-disc">{item.housekeeping}</li>
                  <li className="list-disc">{item.view}</li>
                  <li className="list-disc">{item.bathRoom}</li>
                  <li className="list-disc">{item.food}</li>
                  <li className="list-disc">{item.laundry}</li>
                </ul>
                <div className="mt-10 text-center">
                  <button onClick={handleBookNow} className="px-4 py-1 text-white font-medium rounded-xl bg-[#C09B5A]">
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full">
        <h2 className="max-md:text-xl w-full mx-auto py-14 text-center font-playfair text-3xl font-semibold">EXPLORE THE PLEASURE OF LUXURY STAY</h2>
        <div className="w-full px-10 grid sm:grid-cols-2 md:grid-cols-3 gap-7">
          {dataAll?.map((item) => (
            <div key={item.id} className="border-solid border-[1px] border-[#C09B5A] p-7">
              <div>
                <img className="w-full sm:h-[100px] lg:h-[200px]" src={item.image} alt="vela-hotel" />
              </div>
              <div className="mt-6 h-[160px]">
                <h4 className="mb-3 font-montserrat font-semibold text-base sm:text-sm">{item.name}</h4>
                <p className="font-montserrat text-justify sm:text-sm">{item.description}</p>
              </div>
              <div className="mt-5 flex sm:flex-col sm:gap-4 lg:flex-row justify-between items-center">
                <button className="px-3 py-2 bg-[#C09B5A] text-white font-semibold sm:w-full lg:w-auto" onClick={handleBookNow}>Book now</button>
                <button
                  onClick={() => handleNavigation(`/detailCategory/${item.id}`)}
                  className="px-3 py-2 bg-[#7F3F30] text-white font-semibold sm:w-full lg:w-auto"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
