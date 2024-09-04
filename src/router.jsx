import { Children } from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Auth from "./Layout/Auth/Auth";
import Stock from "./Pages/Stock/Stock";
import NotFound from "./Pages/NotFound/NotFound";
let routes = [
  // dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {path : "/" , element : <Stock/>},
      { path: "*", element: <NotFound /> },
      {path : "stock" , element : <Stock/>},
    ],
  },
  // Auth
  {
    path: "/",
    element: <Auth />,
    children: [
      // {path : "login" , element : <Login/>},
      // {path : "register" , element : <Register/>},
      // { path: "*", element: <NotFound /> }
    ],
  },
  //   not found
  { path: "*", element: <NotFound /> },
];
export default routes;
