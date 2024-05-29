import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/User/HomePage";
import Authenticate from "./pages/User/Authenticate";
import Room from "./pages/User/Room";
import ForgotPass from "./components/user/Form/ForgotPass";
import ListCategoryPage from "./pages/User/ListCategoryPage";
import RoomListPage from "./pages/Admin/RoomListPage";
import CategoryPage from "./pages/Admin/CategoryPage";
import CategoryDetail from "./components/admin/Table/CategoryDetail";
import CategoryAdd from "./components/admin/Table/CategoryAdd";
import LayoutAdmin from "./layout/Admin/LayoutAdmin";
import RoomAdd from "./components/admin/Table/RoomAdd";
import RoomDetail from "./components/admin/Table/RoomDetail";
import CheckOut from "./components/user/Cart/CheckOut";
import CheckOutPage from "./pages/User/CheckOutPage";
import PaymentSuccess from "./pages/User/PaymentSuccess";
import Profile from "./pages/User/Profile";
import 'boxicons/css/boxicons.min.css';

import { Navigate } from "react-router-dom";
function App() {
  const ProtectedRoute = ({ children, role }) => {
    const userRole = localStorage.getItem("role"); // Hoặc cách bạn lưu role của người dùng

    return role === userRole ? children : <Navigate to="/authenticate" />;
  };

  return (
    <>
      <ToastContainer />
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/authenticate" element={<Authenticate></Authenticate>}></Route>
        <Route path="/listCategory" element={<ListCategoryPage></ListCategoryPage>}></Route>
        <Route path="/detailCategory/:id" element={<ListCategoryPage></ListCategoryPage>}></Route>
        <Route path="/listRoom" element={<Room></Room>}></Route>
        <Route path="/forgotPass" element={<ForgotPass></ForgotPass>}></Route>
        <Route path="/admin" element={<LayoutAdmin></LayoutAdmin>}></Route>
        <Route path="/admin/room" element={<RoomListPage></RoomListPage>}></Route>
        <Route path="/admin/category" element={<CategoryPage></CategoryPage>}></Route>
        <Route path="/admin/category/:id" element={<CategoryDetail></CategoryDetail>}></Route>
        <Route path="/admin/category/add" element={<CategoryAdd></CategoryAdd>}></Route>
        <Route path="/admin/room/add" element={<RoomAdd></RoomAdd>}></Route>
        <Route path="/admin/room/:id" element={<RoomDetail></RoomDetail>}></Route>
        <Route path="/checkOut" element={<CheckOutPage></CheckOutPage>}></Route>
        <Route path="/about" element={<AboutPage></AboutPage>}></Route>
        <Route path="/payment" element={<CheckOut></CheckOut>}></Route>
        <Route path="/payment/success" element={<PaymentSuccess></PaymentSuccess>}></Route>
        <Route path="/payment/error" element={<PaymentError></PaymentError>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/admin/user" element={<UserList></UserList>}></Route>
        <Route path="/popup" element={<AuthPopup></AuthPopup>}></Route>
      </Routes> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route
          path="/listCategory"
          element={<ListCategoryPage></ListCategoryPage>}
        ></Route>
        <Route
          path="/detailCategory/:id"
          element={<ListCategoryPage></ListCategoryPage>}
        ></Route>
        <Route path="/forgotPass" element={<ForgotPass></ForgotPass>}></Route>
        <Route path="/listRoom" element={<Room></Room>}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="USER">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkOut"
          element={
            <ProtectedRoute role="USER">
              <CheckOutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="USER">
              <CheckOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute role="USER">
              <PaymentSuccess />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <LayoutAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room"
          element={
            <ProtectedRoute role="ADMIN">
              <RoomListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute role="ADMIN">
              <CategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <CategoryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category/add"
          element={
            <ProtectedRoute role="ADMIN">
              <CategoryAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room/add"
          element={
            <ProtectedRoute role="ADMIN">
              <RoomAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <RoomDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
