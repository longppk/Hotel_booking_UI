import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Authenticate from "./pages/Authenticate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Room from "./pages/Room";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/authenticate" element={<Authenticate></Authenticate>}></Route>
        <Route path="/listRoom/:id" element={<Room></Room>}></Route>
        <Route path="/listRoom" element={<Room></Room>}></Route>
      </Routes>
    </>
  );
}

export default App;
