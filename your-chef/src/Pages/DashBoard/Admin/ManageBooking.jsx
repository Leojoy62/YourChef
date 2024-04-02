import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const ManageBooking = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleDeleteBooking = (booking) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/managebookings/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  const handleBookingConfirm = (booking) => {
    axiosSecure
      .patch(`/managebooking/${booking._id}`, { status: "confirmed" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };
  return (
    <div className="w-full my-5">
      <Helmet>
        <title>Your Chef | Manage Booking</title>
      </Helmet>
      <h1 className="font-bold text-center my-10 text-2xl">
        Total Bookings: {bookings.length}
      </h1>
      <div className="overflow-x-auto md:mx-5">
        <table className="table-sm md:table-xl table">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guest</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guest}</td>
                <td>
                  {booking.status === "confirmed" ? (
                    <span className="text-green-600 font-bold">Confirmed</span>
                  ) : (
                    <button
                      onClick={() => handleBookingConfirm(booking)}
                      className="btn btn-ghost btn-xs text-orange-600"
                    >
                      Pending
                    </button>
                  )}
                </td>
                <td className="text-red-600">
                  <button
                    onClick={() => handleDeleteBooking(booking)}
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

export default ManageBooking;
