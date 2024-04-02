import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "react-query";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { Helmet } from "react-helmet-async";

const MyBookings = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["mybookings", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mybookings?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteBooking = (booking) => {
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
        axiosSecure.delete(`/mybookings/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your booking has been deleted.", "success");
          }
        });
      }
    });
    console.log(booking._id);
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Your Chef | My Booking</title>
      </Helmet>
      <SectionHeader
        subheading={"Heavenly Taste"}
        heading={"My Bookings"}
      ></SectionHeader>
      <div className="overflow-x-auto w-full my-10">
        <table className="table-sm md:table-xl table">
          {/* head */}
          <thead>
            <tr>
              <th>SL.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>

                <td className="font-bold">{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <th>
                  <button
                    onClick={() => handleDeleteBooking(booking)}
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

export default MyBookings;
