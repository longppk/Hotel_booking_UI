import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSortAlphaDown, FaSearch } from "react-icons/fa";
import {toast} from 'react-toastify'
import { NavLink, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import useHandleChange from "../../../hooks/useHandleChange";
const CategoryListStyles = styled.div`
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
      .btn-sort {
        display: flex;
        gap: 10px;
        align-items: center;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;
      }
      .btn-size {
        select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          cursor: pointer;
        }
      }
      .btn-add {
        background-color: #a855f7;
        padding: 10px 15px;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
      }
      .btn-delete {
        background-color: #ef4444;
        padding: 10px;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .search {
    position: relative;
    .search-input {
      border: 1px solid #ccc;
      width: 400px;
      padding: 5px 35px 5px 20px;
    }
    .search-icon{
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
    .checkbox{
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
    .btn-edit{
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
const CategoryList = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(true)
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate()
  const {values, handleChange} = useHandleChange({
    name: ''
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user/category");
        setData(response?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const handleSort = async () => {
    if(sort){
      try {
        const response = await axios.get("http://localhost:8080/api/user/category/sort");
        setData(response?.data);
      } catch (error) {}
    }
    else{
      try {
        const response = await axios.get("http://localhost:8080/api/user/category");
        setData(response?.data);
      } catch (error) {}
    }
    setSort(!sort)
    setSelectAll(false)
  }

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedData = data.map((item) => {
      return { ...item, isChecked };
    });
    setData(updatedData);
  };


  const handleSingleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked };
      }
      return item;
    });
    setData(updatedData);
    setSelectAll(updatedData.every((item) => item.isChecked));
  };

  const getCheckedItemIds = () => {
    const checkedItemIds = data.filter(item => item.isChecked).map(item => item.id);
    return checkedItemIds;
  };

  const handlePrintCheckedItems = async () => {
    const checkedItemIds = getCheckedItemIds();
    if (!checkedItemIds || checkedItemIds.length === 0) {
        toast.error("Please select item delete")
        return;
    }
    try{
      const res = await axios.post("http://localhost:8080/api/user/category/delete",{
        ids: checkedItemIds
      });
      if(res.data === 200){
        toast.success("Delete room success")
        const response = await axios.get("http://localhost:8080/api/user/category");
        setData(response?.data);
      }
      else{
        toast.error("Email already exits")
      }
    }
    catch(err){
    }
  };

  const detailPage = (id) => {
    navigate(`/admin/category/${id}`)
  }
  
  useEffect(() => {
    const fetchDataSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/category/search?keyword=${values.name}`);
        setData(response?.data);
      } catch (error) {}
    };
    fetchDataSearch();
  },[values.name])
  console.log(values.name)
  return (
    <CategoryListStyles>
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
          <div className="btn-sort-container">
            <button onClick={handleSort} className="btn-sort">
              <span>Sort</span>
              <FaSortAlphaDown />
            </button>
          </div>
          <div className="btn-size">
            <select defaultValue="Size: 7">
              <option>Size</option>
              <option>Size: 7</option>
            </select>
          </div>
          <div>
            <NavLink to={"/admin/category/add"} className="btn-add"> + Add new category</NavLink>
          </div>
          <div>
            <button onClick={handlePrintCheckedItems} className="btn-delete">Delete category</button>
          </div>
        </div>
        <div className="search">
          <input className="search-input" name="name" onChange={handleChange} placeholder="Search for category" />
          <FaSearch className="search-icon"/>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input className="checkbox" type="checkbox"  onChange={handleSelectAll} checked={selectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>
                <input className="checkbox" type="checkbox" checked={item.isChecked || ''} onChange={(e) => handleSingleCheckboxChange(e, item.id)}/>
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td><button onClick={() => detailPage(item.id)} className="btn-edit">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </CategoryListStyles>
  );
};

export default CategoryList;
