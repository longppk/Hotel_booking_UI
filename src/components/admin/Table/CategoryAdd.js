import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useHandleChange from "../../../hooks/useHandleChange";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setValuesData } from "../../redux/actionSearch";
import LayoutAdmin from "../../../layout/Admin/LayoutAdmin";
import Header from "../../../layout/Admin/Header";
import { Bars } from "react-loader-spinner";

const CategoryDetailStyles = styled.div`
  margin: 80px auto 0;
  padding: 80px 50px 0;
  display: flex;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .container-image-category {
    width: 300px;
    height: 250px;
    position: relative;
    .image {
      width: 300px;
      height: 250px;
      border: 1px solid #333;
      background-color: #ccc;
    }
    .label-image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
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
      margin-top: 30px;
      padding: 5px 10px;
      background-color: rgb(11, 116, 229);
      color: #fff;
      cursor: pointer;
    }
  }
`;

const CategoryAdd = () => {
  const [amenity, setAmenity] = useState("");
  const [textareaHeight, setTextareaHeight] = useState();
  const [loading, setLoading] = useState(false)
  const { values, handleChange, setValues } = useHandleChange({
    name: "",
    description: "",
    amenityId: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    description: "",
    amenityId: "",
    image: "",
  });
  const navigate = useNavigate()
  const textareaRef = useRef(100);

  useEffect(() => {
    const fetchDataAmenity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/amenities"
        );
        setAmenity(response?.data);
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
    } else if (values.amenityId === "") {
      errors.amenityId = "Please choose amenity";
      setValues({
        ...values,
        amenityId:amenity[0].id
    })
    } else if (values.image === "") {
      toast.error("Please upload image", {
        theme: "colored",
      });
      errors.image = "Please upload image";
    } else {
      errors.name = "";
      errors.description = "";
      errors.amenityId = "";
      errors.image = "";
    }
    setErrorMessage(errors);
    if (!Object.values(errors).some((error) => error !== "")) {
      try {
        setLoading(true)
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image);
        formData.append("amenityId", Number(values.amenityId));
        const response = await axios.post(
          "http://localhost:8080/api/user/category/add",
          formData
        );
        if (response.data === true) {
          toast.success("Addition Room category successfully", {
            theme: "colored",
          });
          setLoading(false)
          navigate("/admin")
        } else {
          return null;
        }
      } catch (error) {}
    } else {
      return;
    }
  };
  console.log(values);
  return (
    <CategoryDetailStyles>
      <Header/>
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
        <img
          className="image"
          src={
            values.avatarPreview ||
            "https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-gray-solid-color-background-image_557027.jpg"
          }
          alt="vela-hotel"
        />
        <label className="label-image" htmlFor="image"></label>
        <input
          id="image"
          name="image"
          className="input-image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <h3 className="title-image">Please Upload Image</h3>
      </div>
      <div className="container-field">
        <div className="field">
          <label htmlFor="username" className="field-title">
            Name:
          </label>
          <input
            id="username"
            name="name"
            className="input-field"
            type="text"
            onChange={handleChange}
          />
        </div>
        <p className="form-message">{errorMessage.name}</p>
        <div className="field">
          <label htmlFor="username" className="field-title">
            Description:
          </label>
          <textarea
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
        {amenity && (
          <div className="field">
            <label htmlFor="amenity">Please select amenity: </label>
            <select
              className="select-category"
              name="amenityId"
              id="amenity"
              onChange={handleChange}
            >
              {amenity?.map((item) => (
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
    </CategoryDetailStyles>
  );
};

export default CategoryAdd;
