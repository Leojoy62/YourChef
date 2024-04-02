import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import DashBoard from "../Layouts/DashBoard";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/LogIn/Login";
import LogOut from "../Pages/LogOut/LogOut";
import OurMenu from "../Pages/OurMenu/OurMenu";
import OurShop from "../Pages/OurShop/OurShop";
import ContactUs from "../Pages/ContactUs/ContactUs";
import MyCart from "../Pages/DashBoard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";

import AllUsers from "../Pages/DashBoard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItem from "../Pages/DashBoard/Admin/AddItem";
import ManageItems from "../Pages/DashBoard/Admin/ManageItems";
import Payment from "../Pages/DashBoard/Payment/Payment";
import AdminHome from "../Pages/DashBoard/Admin/AdminHome";
import UserHome from "../Pages/DashBoard/UserHome/UserHome";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import AddReview from "../Pages/DashBoard/AddReview/AddReview";
import Reservation from "../Pages/DashBoard/Reservation/Reservation";
import MyBookings from "../Pages/DashBoard/MyBookings/MyBookings";
import ManageBooking from "../Pages/DashBoard/Admin/ManageBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "logout",
        element: <LogOut></LogOut>,
      },
      {
        path: "ourmenu",
        element: <OurMenu></OurMenu>,
      },
      {
        path: "ourshop",
        element: <OurShop></OurShop>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      //User Routes
      {
        path: "userhome",
        element: <UserHome></UserHome>,
      },
      {
        path: "mycart",
        element: <MyCart></MyCart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "addreview",
        element: <AddReview></AddReview>,
      },
      {
        path: "reservation",
        element: <Reservation></Reservation>,
      },
      {
        path: "mybookings",
        element: <MyBookings></MyBookings>,
      },
      //AdminRoutes
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "additem",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "manageitems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "managebookings",
        element: (
          <AdminRoute>
            <ManageBooking></ManageBooking>
          </AdminRoute>
        ),
      },
    ],
  },
]);
