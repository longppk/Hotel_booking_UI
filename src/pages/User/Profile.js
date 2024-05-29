import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCamera } from "react-icons/fa";
import Layout from "../../layout/User/Layout";
import useHandleChange from "../../hooks/useHandleChange";
const ProfileStyles = styled.div`
  display: flex;
  padding: 80px 0 20px;
  margin: auto;
  gap: 15px;
  width: 1200px;
  .profile-sidebar {
    width: 250px;
    .profile-avatar {
      width: 100%;
      text-align: center;
      position: relative;
      .image-avatar {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin: auto;
        border: 10px solid #fff;
      }
      .label-avatar {
        position: absolute;
        width: 145px;
        height: 140px;
        top: 0;
        left: 33px;
        cursor: pointer;
        display: flex;
        justify-content: end;
        align-items: end;
        .icon-camera {
          background-color: #e4e6eb;
          padding: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .title {
        font-weight: 600;
      }
      .input-field {
        display: none;
      }
    }
    .profile-navigate {
      margin-top: 20px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .link-navigate {
        font-size: 13px;
        color: #646464;
        border-bottom: 1px solid #f2f2f2;
        padding: 10px 20px;
      }
    }
  }
  .profile-content {
    padding: 20px 30px;
    background-color: #fff;
    width: 100%;
    .profile-info {
      margin-top: 30px;
      display: flex;
      gap: 20px;
      align-items: center;
      flex-direction: column;
      width: 720px;
      .profile-field {
        display: flex;
        gap: 10px;
        align-items: center;
        .field-title {
          font-size: 14px;
          color: #646464;
          width: 150px;
          cursor: pointer;
        }
        .input-field {
          border: 1px solid #ced4da;
          border-radius: 8px;
          width: 550px;
          padding: 3px 10px;
          cursor: pointer;
        }
      }
      .button-box {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 20px;
        .button-edit {
          background-color: #c92127;
          color: #fff;
          padding: 10px;
          font-weight: 600;
        }
        .button-save {
          background-color: #007aff;
          color: #fff;
          padding: 10px;
          font-weight: 600;
        }
      }
    }
  }
`;

const Profile = () => {
  const [readOnly, setReadOnly] = useState("readOnly");
  const [data, setData] = useState();
  const token = localStorage.getItem("token");

  const { values, handleChange } = useHandleChange({
    username: "",
    fullname: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleEdit = () => {
    setReadOnly("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/profile",
          config
        );
        setData(response.data);
        values.username = response.data.username || values.username;
        values.fullname = response.data.fullName || values.fullname;
        values.phone = response.data.phone || values.phone;
        values.address = response.data.address || values.address;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        return;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const { username, fullname, phone, address, avatar } = values;
      const formData = new FormData();
      formData.append("avatar", avatar);
      const res = await axios.post(
        `http://localhost:8080/api/user/profile/save?username=${username}&fullname=${fullname}&phone=${phone}&address=${address}`,
        formData,
        config
      );
      if (res.data === true) {
        toast.success("Update profile successfully", {
          theme: "colored",
        });
      } else {
        return null;
      }
    } catch (err) {}
  };
  return (
    <Layout>
      {data ? (
        <ProfileStyles>
          <div className="profile-sidebar">
            {data && (
              <div className="profile-avatar">
                <img
                  className="image-avatar"
                  src={values.avatarPreview || data.avatar}
                  alt=""
                />
                <label htmlFor="avatar" className="label-avatar"><FaCamera className="icon-camera"/></label>
                <input
                  id="avatar"
                  name="avatar"
                  className="input-field"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                <h3 className="title">{data.username}</h3>
              </div>
            )}

            <div className="profile-navigate">
              <NavLink className="link-navigate" to={"/profile"}>
                Thông tin tài khoản
              </NavLink>
              <NavLink className="link-navigate" to={"/changePass"}>
                Đổi mật khẩu
              </NavLink>
              <NavLink className="link-navigate" to={"/profile"}>
                Voucher
              </NavLink>
              <NavLink className="link-navigate" to={"/profile"}>
                Thông báo
              </NavLink>
            </div>
          </div>
          <div className="profile-content">
            <h2>Thông tin tài khoản</h2>
            <form onSubmit={handleSaveProfile} className="profile-info">
              <div className="profile-field">
                <label htmlFor="username" className="field-title">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="input-field"
                  defaultValue={data.username}
                  readOnly={readOnly}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label htmlFor="email" className="field-title">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="input-field"
                  defaultValue={data.email}
                  readOnly={true}
                  type="text"
                />
              </div>
              <div className="profile-field">
                <label htmlFor="phone" className="field-title">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="input-field"
                  defaultValue={data.phone}
                  readOnly={readOnly}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="profile-field">
                <label htmlFor="address" className="field-title">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  className="input-field"
                  defaultValue={data.address}
                  readOnly={readOnly}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="button-box">
                <button type="submit" className="button-save">
                  Lưu thay đổi
                </button>
                <button
                  onClick={handleEdit}
                  type="button"
                  className="button-edit"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </form>
          </div>
        </ProfileStyles>
      ) : (
        <SkeletonTheme baseColor="#fff" highlightColor="#f5f5f5">
          <div className="flex w-[1200px] m-auto pt-20 pb-5">
            <div className="w-[250px] text-center mr-5 flex flex-col gap-5">
              <Skeleton
                className="mx-auto"
                count={1}
                width={150}
                height={150}
                borderRadius={"50%"}
              />
              <Skeleton count={1} width={250} height={200} />
            </div>
            <div className="w-[930px] flex flex-col gap-2">
              <Skeleton count={1} width={930} height={40} />
              <Skeleton count={1} width={930} height={40} />
              <Skeleton count={1} width={930} height={40} />
              <Skeleton count={1} width={930} height={40} />
              <Skeleton count={1} width={930} height={40} />
              <Skeleton count={1} width={930} height={40} />
              <div className="flex gap-5">
                <Skeleton count={1} width={100} height={50} />
                <Skeleton count={1} width={100} height={50} />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )}
    </Layout>
  );
};

export default Profile;
