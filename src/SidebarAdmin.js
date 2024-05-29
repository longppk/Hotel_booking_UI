import { IoBarChartSharp } from "react-icons/io5";
import { BsTable } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropright,IoIosLogOut  } from "react-icons/io";
export const SidebarAdminItem = [
  {
    id: 1,
    title: "Dashboard",
    state: "DASHBOARD",
    icon: IoBarChartSharp
  },
  {
    id: 2,
    title: "Table",
    state: "TABLE",
    icon: BsTable,
    submenu: [
      { id: "2-1", title: "Room" },
      { id: "2-2", title: "Room Category" },
    ],
  },
  {
    id: 3,
    title: "Account",
    state: "ACCOUNT",
    icon: FaUsers
  },
  {
    id: 4,
    title: "Logout",
    state: "LOGOUT",
    icon: IoIosLogOut
  },
];
