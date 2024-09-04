import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import TopBar from "../../Components/TopBar/TopBar";
import "./Dashboard.css"
const MyContext = createContext();


export default function Dashboard() {
   const [isToggleSideBar, setIsToggleSideBar] = useState(false);
  const values = {
    isToggleSideBar,
    setIsToggleSideBar,
  };
  return (
    <>
    <MyContext.Provider value={values}>
      <TopBar />
      <div className="main d-flex">
        <div className={`sidebar-wrapper ${isToggleSideBar ? "toggle" : ""}`}>
          <SideBar />
        </div>
        <main className={`content ${isToggleSideBar ? "toggle" : ""}`}>{<Outlet/>}</main>
      </div>
    </MyContext.Provider>
  </>
  )
}

export { MyContext };
