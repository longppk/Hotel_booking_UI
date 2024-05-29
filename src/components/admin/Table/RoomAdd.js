import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../../layout/Admin/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useHandleChange from "../../../hooks/useHandleChange";
import { Tooltip } from "react-tooltip";
import { Bars } from "react-loader-spinner";
const RoomAddStyles = styled.div`
  #delete-image {
    background-color: rgba(0, 0, 0, 0.8); /* Màu nền */
    color: #fff; /* Màu văn bản */
    width: 165px;
    height: 200px;
    margin-left: -10px;
    font-size: 15px;
    padding: 80px 20px 80px 30px; /* Cỡ chữ */
  }
  margin: 80px auto 0;
  padding: 80px 50px 0;
  display: flex;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .container-image-category {
    margin-top: 50px;
    width: 500px;
    height: 400px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    .image {
      width: 200px;
      height: 200px;
      border: 1px solid #333;
      background-color: #ccc;
      cursor: pointer;
    }
    .label-image {
      position: absolute;
      top: -35px;
      width: 100%;
      height: 30px;
      background-color: rgb(10, 104, 255);
      text-align: center;
      color: #fff;
    }
    .input-image {
      display: none;
    }
    .title-image {
      font-size: 15px;
      text-align: center;
    }
  }
  .container-field {
    padding: 0 50px;
    width: 100%;
    .field {
      width: 100%;
      display: flex;
      gap: 10px;
      margin: 15px 0;
      .field-title {
        width: 200px;
      }
      .input-field {
        border: 1px solid #333;
        width: 100%;
        border-radius: 10px;
        padding: 5px 15px;
        resize: none;
        overflow: hidden;
      }
    }
    .form-message {
      color: #cf3c3f;
      font-size: 13px;
      margin-left: 170px;
    }
    .select-category {
      padding: 5px 20px;
      border: 1px solid #333;
    }
    .btn-save {
      padding: 5px 30px;
      background-color: rgb(11, 116, 229);
      color: #fff;
      cursor: pointer;
    }
  }
`;
const RoomAdd = () => {
  const [category, setCategory] = useState("");
  const [textareaHeight, setTextareaHeight] = useState();
  const { values, handleChange, setValues } = useHandleChange({
    name: "",
    description: "",
    price: "",
    capacity: 1,
    bed: "",
    length: 5,
    width: 5,
    categoryId: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    description: "",
    categoryId: "",
    files: "",
  });
  const [images, setImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(100);

  const handleChangeImage = (e) => {
    const listFiles = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const fileData = Array.from(e.target.files);
    setImagesData((pre) => [...pre, ...fileData]);
    setImages((pre) => [...pre, ...listFiles]);
    e.target.value = null;
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataAmenity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/category"
        );
        setCategory(response?.data);
      } catch (error) {}
    };
    fetchDataAmenity();
  }, []);
  useEffect(() => {
    setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
  }, [values.description]);

  const handleAdd = async () => {
    const errors = {};
    if (values.name === "") {
      errors.name = "Name room category is required";
    } else if (values.description === "") {
      errors.description = "Description is required";
    } else if (values.description.length > 255) {
      errors.description = "Description max 255 character";
    } else if (values.categoryId === "") {
      errors.categoryId = "Please choose amenity";
      setValues({
        ...values,
        categoryId: category[0].id,
      });
    } else if (imagesData?.length > 4) {
      errors.files = "Please upload max 4 image";
      toast.error(errors.files, {
        theme: "colored",
      });
    } else if (imagesData?.length === 0 || imagesData?.length < 4) {
      toast.error("Please upload enough 4 image", {
        theme: "colored",
      });
      errors.files = "Please upload limit 4 image";
    } else {
      errors.name = "";
      errors.description = "";
      errors.categoryId = "";
      errors.files = "";
    }
    setErrorMessage(errors);
    if (!Object.values(errors).some((error) => error !== "")) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("capacity", values.capacity);
        formData.append("bed", values.bed);
        formData.append("length", values.length);
        formData.append("width", values.width);
        formData.append("categoryId", values.categoryId);
        if (imagesData?.length > 0) {
          imagesData.forEach((image) => {
            formData.append("files", image);
          });
        }
        const response = await axios.post(
          "http://localhost:8080/api/user/room/add",
          formData
        );
        if (response.data === true) {
          toast.success("Addition room successfully", {
            theme: "colored",
          });
          setValues({
            name: "",
            description: "",
            price: "",
            capacity: 1,
            bed: "",
            length: 5,
            width: 5,
            categoryId: "",
          });
          setImages([]);
          setImagesData([]);
          setErrorMessage({
            name: "",
            description: "",
            categoryId: "",
            files: "",
          });
          setLoading(false);
        } else {
          return null;
        }
      } catch (error) {}
    } else {
      return;
    }
  };
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesData((pre) => pre.filter((_, i) => i !== index));
  };
  console.log(imagesData);
  return (
    <RoomAddStyles>
      <Header />
      {loading && (
        <Bars
          height="80"
          width="80"
          color="#ccc"
          ariaLabel="bars-loading"
          wrapperStyle={{
            background: "rgba(255,255,255,0.8)",
            width: "100%",
            position: "absolute",
            height: "100%",
            zIndex: "10",
            left: "0",
            top: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass=""
          visible={true}
        />
      )}
      <div className="container-image-category">
        {images?.map((item, index) => (
          <img
            className="image"
            key={index + 1}
            src={item}
            alt=""
            data-tooltip-id="delete-image"
            data-tooltip-place="center"
            data-tooltip-content="Click to delete "
            onClick={() => handleRemoveImage(index)}
          />
        ))}
        <input
          id="files"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          multiple
          name="files"
          className="input-image"
        />
        <label htmlFor="files" className="label-image">
          Upload Image
        </label>
      </div>
      <div className="container-field">
        <div className="field">
          <label htmlFor="name" className="field-title">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="input-field"
            type="text"
            onChange={handleChange}
          />
        </div>
        <p className="form-message">{errorMessage.name}</p>
        <div className="field">
          <label htmlFor="description" className="field-title">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="input-field"
            type="text"
            ref={textareaRef}
            onChange={handleChange}
            style={{
              height: textareaHeight,
              minHeight: 50,
            }}
          />
        </div>
        <p className="form-message">{errorMessage.description}</p>
        <div className="field">
          <label htmlFor="price" className="field-title">
            Price:
          </label>
          <input
            id="price"
            name="price"
            className="input-field"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="capacity" className="field-title">
            Capacity:
          </label>
          <input
            id="capacity"
            name="capacity"
            className="input-field"
            type="number"
            min={"1"}
            onChange={handleChange}
            step={1}
          />
        </div>
        <div className="field">
          <label htmlFor="bed" className="field-title">
            Bed:
          </label>
          <input
            id="bed"
            name="bed"
            className="input-field"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="length" className="field-title">
            Length:
          </label>
          <input
            id="length"
            name="length"
            className="input-field"
            type="number"
            min={5}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="width" className="field-title">
            Width:
          </label>
          <input
            id="width"
            name="length"
            min={5}
            className="input-field"
            type="number"
            onChange={handleChange}
          />
        </div>
        {category && (
          <div className="field">
            <label htmlFor="category">Please select room category: </label>
            <select
              className="select-category"
              name="categoryId"
              id="category"
              onChange={handleChange}
            >
              {category?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="form-message">{errorMessage.amenityId}</p>
        <div>
          <button onClick={handleAdd} className="btn-save">
            Add
          </button>
        </div>
      </div>
      {images && <Tooltip id="delete-image" />}
    </RoomAddStyles>
  );
};

export default RoomAdd;
