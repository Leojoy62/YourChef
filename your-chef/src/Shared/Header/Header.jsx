import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaCartPlus } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import { Link, NavLink } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Header = () => {
  const [isAdmin] = useAdmin();
  const [, cart] = useCart();
  const { user } = useContext(AuthContext);

  const NavItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/ourmenu">Our Menu</NavLink>
      </li>

      <li>
        <NavLink to="/ourshop">Our Shop</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {user && isAdmin ? (
        <li>
          <NavLink to="/dashboard/adminhome">Admin Dashboard</NavLink>
        </li>
      ) : (
        ""
      )}
      {user && !isAdmin ? (
        <li>
          <NavLink to="/dashboard/userhome">Dashboard</NavLink>
        </li>
      ) : (
        ""
      )}

      <li>
        <Link to="dashboard/mycart">
          <button className="btn btn-outline btn-sm border-0 text-white">
            <FaCartPlus></FaCartPlus>
            <div className="badge badge-secondary">{cart?.length || 0}</div>
          </button>
        </Link>
      </li>
      <li>
        {user ? (
          <>
            <NavLink to="/logout">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar max-w-screen-xl mx-auto fixed z-10 bg-opacity-25 bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white  mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
            >
              {NavItems}
            </ul>
          </div>
          <NavLink className="btn btn-ghost normal-case text-white text-xl">
            Your Chef
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white px-1 w-full">
            {NavItems}
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink
            to="/ourshop"
            className="btn btn-outline text-white border-2 border-green-600 hover:text-green-600"
          >
            Order Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
