import React, { useState , useContext } from "react";
import Button from "@mui/material/Button";
import { FaBoxesPacking } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { MyContext } from "../../Pages/Dashboard/Dashboard";

import "./SideBar.css";

export default function SideBar() {
const context = useContext(MyContext)
const [activeTab ,setActiveTab  ] = useState(0)
const [isToggleSubMenu ,setIsToggleSubMenu  ] = useState(false)
const isOpenSubmenu= (index)=>{
  setActiveTab(index)
  setIsToggleSubMenu(!isToggleSubMenu)
}
  return (
    <aside className="sidebar">
      <ul className="sidebar-list list-unstyled">
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 1  && isToggleSubMenu===true ? "active" : ""}`} onClick={()=>isOpenSubmenu(1)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <FaBoxesPacking></FaBoxesPacking>
            </span>
            انبار
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft></FaAngleLeft>
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 1 && isToggleSubMenu===true? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <Link to="">لیست انبار ها</Link>
              </li>
              <li className="sidebar-submenu__item">
                <Link to="">اضافه کردن انبار جدید</Link>
              </li>
              <li className="sidebar-submenu__item">
                <Link to="">ویراش انبار ها</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className="sidebar-list__btn w-100">
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <FaBoxesPacking></FaBoxesPacking>
            </span>
            انبار
          </Button>
        </li>
      </ul>
    <br />
    <div className="sidebar-logout-wrapper">
      <div className="sidebar-logout">
        <Button variant="contained">
          <IoMdLogOut></IoMdLogOut>
          خروج
          </Button>
      </div>
    </div>
    </aside>
  );
}
