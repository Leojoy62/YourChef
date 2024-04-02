import { FaCalendarCheck, FaCartPlus, FaComments } from "react-icons/fa6";

import { NavLink, Outlet } from "react-router-dom";
import { MdMenuBook, MdContactPage } from "react-icons/md";

import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBook,
  FaUsers,
} from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [, cart] = useCart();
  const [isAdmin] = useAdmin();

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false; // Uncheck the checkbox to close the drawer
    }
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button  lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2"></label>
        <ul className="menu p-4 w-80 min-h-full bg-yellow-600 ">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/additem">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageitems">
                  <FaWallet></FaWallet> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managebookings">
                  <FaBook></FaBook> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt></FaCalendarAlt> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymenthistory">
                  <FaWallet></FaWallet>
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart{" "}
                  <button className="btn btn-outline btn-sm border-0 text-white">
                    <FaCartPlus></FaCartPlus>
                    <div className="badge badge-secondary">
                      {cart?.length || 0}
                    </div>
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addreview">
                  <FaComments></FaComments> Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mybookings">
                  <FaCalendarCheck></FaCalendarCheck>My Booking
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ourmenu">
              <MdMenuBook></MdMenuBook> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/ourshop">
              <FaCartPlus></FaCartPlus>Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <MdContactPage></MdContactPage> Contact
            </NavLink>
          </li>
          <li className="block md:hidden lg:hidden mt-5">
            <button
              onClick={() => closeDrawer()}
              className="btn btn-sm btn-outline"
            >
              Close Drawer
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
