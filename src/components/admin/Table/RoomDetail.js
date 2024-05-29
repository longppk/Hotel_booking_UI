import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../../layout/Admin/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useHandleChange from "../../../hooks/useHandleChange";
import { Tooltip } from "react-tooltip";
import { Bars } from "react-loader-spinner";
const RoomDetailStyles = styled.div`
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
      .btn-edit{
        padding: 0 20px;
        background-color: red;
        cursor: pointer;
        color: #fff;
      }
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
      margin-left: 40px;
    }
    .btn-save {
      padding: 5px 30px;
      background-color: rgb(11, 116, 229);
      color: #fff;
      cursor: pointer;
    }
  }
`;
const RoomDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [textareaHeight, setTextareaHeight] = useState();
  const { values, handleChange, setValues } = useHandleChange({
    name: "",
    description: "",
    price: "",
    capacity: 1,
    bed: "",
    length: 10,
    width: 10,
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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const textareaRef = useRef(100);

  const handleChangeImage = (e) => {
    const listFiles = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const fileData = Array.from(e.target.files);
    setImagesData((pre) => [...fileData]);
    setImages((pre) => [...listFiles]);
    e.target.value = null;
    if(images?.length < 3){
      toast.error("Please upload 4 image", {
        theme: "colored",
      });
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/room/detail/${id}`
        );
        setData(response?.data);
        setValues({
          name: response?.data.name,
          description: response?.data.description,
          price: response?.data.price,
          capacity: response?.data.capacity,
          bed: response?.data.bed,
          length: response?.data.length,
          width: response?.data.width,
          categoryId: response?.data.roomCategory.id,
        });
        setImages(response?.data?.images);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/category`
        );
        setCategory(response?.data);
        
      } catch (error) {}
    };
    fetchDataCategory();
  }, []);
  useEffect(() => {
    setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
  }, [values.description]);

  const handleUpdate = async () => {
    const errors = {};
    if (values.name === "") {
      errors.name = "Name room category is required";
    } else if (values.description === "") {
      errors.description = "Description is required";
    } else if (imagesData?.length > 4) {
      errors.files = "Please upload max 4 image";
      toast.error(errors.files, {
        theme: "colored",
      });
    }
    else {
      errors.name = "";
      errors.description = "";
      errors.categoryId = "";
      errors.files = "";
    }
    setErrorMessage(errors);
    if (!Object.values(errors).some((error) => error !== "")) {
      try {
        setLoading(true)
        const formData = new FormData();
        formData.append("roomId", id);
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
          "http://localhost:8080/api/user/room/save",
          formData
        );
        if (response.data === true) {
          toast.success("Addition room successfully", {
            theme: "colored",
          });
          setLoading(false)
        } else {
          return null;
        }
      } catch (error) {}
    } else {
      return;
    }
  };

  const handleEditCategory = () => {
    setShowCategory(true);
  }

  return (
    <RoomDetailStyles>
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
      {data && (
        <>
          <div className="container-image-category">
            {images?.map((item, index) => (
              <img
                className="image"
                key={item.id || index}
                src={item.imageUrl || item}
                alt=""
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
              Upload New Image
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
                defaultValue={data.name}
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
                defaultValue={data.description}
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
                defaultValue={data.price}
              />
            </div>
            <p className="form-message">{errorMessage.description}</p>
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
                defaultValue={data.capacity}
              />
            </div>
            <p className="form-message">{errorMessage.description}</p>
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
                defaultValue={data.bed}
              />
            </div>
            <p className="form-message">{errorMessage.description}</p>
            <div className="field">
              <label htmlFor="length" className="field-title">
                Length:
              </label>
              <input
                id="length"
                name="length"
                className="input-field"
                type="number"
                min={10}
                onChange={handleChange}
                defaultValue={data.length}
              />
            </div>
            <p className="form-message">{errorMessage.description}</p>
            <div className="field">
              <label htmlFor="width" className="field-title">
                Width:
              </label>
              <input
                id="width"
                name="width"
                min={10}
                className="input-field"
                type="number"
                onChange={handleChange}
                defaultValue={data.width}
              />
            </div>
            <p className="form-message">{errorMessage.description}</p>
              <div className="field">
                <label htmlFor="category">Room category: </label>
                {!showCategory && <span className="select-category">{data.roomCategory.name}</span>}
                {category && showCategory && 
                  <select
                  className="select-category"
                  name="categoryId"
                  id="category"
                  onChange={handleChange}
                >
                  { category?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                }
                {!showCategory && <button className="btn-edit" onClick={handleEditCategory}>Change</button>}
              </div>
            <p className="form-message">{errorMessage.amenityId}</p>
            <div>
              <button onClick={handleUpdate} className="btn-save">
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </RoomDetailStyles>
  );
};

export default RoomDetail;
