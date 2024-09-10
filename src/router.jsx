import { Children } from "react";
// Dashboard Components
import Dashboard from "./Pages/Dashboard/Dashboard";
import Auth from "./Layout/Auth/Auth";
import Stock from "./Pages/Stock/Stock";
import NotFound from "./Pages/NotFound/NotFound";
// Auth Components
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// protected Components
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
let routes = [
  // dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Stock /> },
      { path: "*", element: <NotFound /> },
      { path: "stock", element: <Stock /> },
    ],
  },
  // Auth
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // { path: "*", element: <NotFound /> }
    ],
  },
  //   not found
  { path: "*", element: <NotFound /> },
];
export default routes;
