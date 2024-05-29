import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useHandleChange from "../../../hooks/useHandleChange";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../layout/Admin/Header";

const CategoryDetailStyles = styled.div`
   margin: 80px auto 50px;
  padding: 80px 50px 0;
  display: flex;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .container-image-category {
    .image {
      width: 300px;
      max-height: 300px;
    }
  }
  .container-field {
    padding: 0 10px;
    width: 700px;
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
    .select-category {
      padding: 5px 20px;
      border: 1px solid #333;
      margin-left: 100px;
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

const CategoryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [amenity, setAmenity] = useState();
  const [textareaHeight, setTextareaHeight] = useState();
  const { values, setValues, handleChange } = useHandleChange({
    categoryId: id,
    name: "",
    description: "",
    amenityId: "",
    image: null,
    select: "",
  });

  const textareaRef = useRef(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/category/${id}`
        );
        setData(response?.data);
        setValues({
          categoryId: id,
          name: response?.data.name || "",
          image: response?.data.image,
          description: response?.data.description || "",
          select: response?.data.amenity[0]?.name || "",
          amenityId: response?.data.amenity[0]?.id || "",
        });
      } catch (error) {}
    };
    const fetchDataAmenity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/amenities"
        );
        setAmenity(response?.data);
      } catch (error) {}
    };

    const fetchDataAndSetState = async () => {
      await fetchDataAmenity();
      await fetchData();
    };
    fetchDataAndSetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValues]);

  useEffect(() => {
    setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
  }, [values.description]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = amenity?.find((item) => item.name === selectedValue);
    setValues({
      ...values,
      select: selectedValue,
      amenityId: selectedOption?.id, // Set idSelect based on selected option
    });
  };
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", Number(values.categoryId));
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("amenityId", Number(values.amenityId));
      const response = await axios.post(
        "http://localhost:8080/api/user/category/save",
        formData
      );
      if (response.data === true) {
        toast.success("Update Room Category successfully", {
          theme: "colored",
        });
      } else {
        return null;
      }
    } catch (error) {}
  };
  console.log(values)
  return (
    <>
      <Header/>
      {data && (
        <CategoryDetailStyles>
          <div className="container-image-category">
            <img
              className="image"
              src={values.avatarPreview || data.image}
              alt="vela-hotel"
            />
            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                name="image"
                className="input-field"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
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
                defaultValue={data.name}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="username" className="field-title">
                Description:
              </label>
              <textarea
                name="description"
                defaultValue={data.description}
                className="input-field"
                type="text"
                ref={textareaRef}
                onChange={handleChange}
                style={{
                  height: textareaHeight,
                  minHeight: 100,
                }}
              />
            </div>
            <div>
              <label htmlFor="amenity">Amenity: </label>
              <select
                className="select-category"
                value={values.select }
                id="amenity"
                onChange={handleSelectChange}
              >
                {amenity?.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={handleSave} className="btn-save">
                Save
              </button>
            </div>
          </div>
        </CategoryDetailStyles>
      )}
    </>
  );
};

export default CategoryDetail;
