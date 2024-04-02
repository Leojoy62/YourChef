import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyCart = () => {
  const [refetch, cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleDeleteOrder = (item) => {
    Swal.fire({
      title: `Are you sure to delete ${item.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://your-chef-server.vercel.app/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                `${item.name} has been deleted from your cart`,
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="w-full mx-auto">
      <Helmet>
        <title>Your Chef | My Cart</title>
      </Helmet>
      <div className="flex justify-between text-2xl font-bold m-5">
        <h1>Total Order: {cart.length}</h1>
        <h1>Total: {total}</h1>
        <Link to="/dashboard/payment">
          <button className="btn btn-sm bg-yellow-600">Pay</button>
        </Link>
      </div>
      <div className="overflow-x-auto mb-10">
        <table className="table-sm md:table-xl table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="font-bold">{item.name}</td>
                <td className="text-end">${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDeleteOrder(item)}
                    className="btn btn-ghost text-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
