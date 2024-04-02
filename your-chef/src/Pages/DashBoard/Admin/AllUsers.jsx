import { FaTrash, FaUsers } from "react-icons/fa6";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Do you want to make ${user.name} an admin?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://your-chef-server.vercel.app/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then(() => {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is admin now`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`https://your-chef-server.vercel.app/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("User has benn Deleted!", "success");
            }
          });
      }
    });
  };
  return (
    <div className="w-full mb-5">
      <Helmet>
        <title>Your Chef | All Users</title>
      </Helmet>
      <h1 className="font-bold text-2xl my-10 text-center">
        Total users: {users.length}
      </h1>
      <div className="overflow-x-auto md:mx-5">
        <table className="table-sm md:table-xl table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  {user.role === "admin" ? (
                    <span className="font-bold text-green-600">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn-ghost text-lg p-2 rounded-xl"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn-ghost text-lg p-2 rounded-xl text-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
