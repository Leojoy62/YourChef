import { useForm } from "react-hook-form";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();

  const onSubmit = (data) => {
    axiosSecure.post("/reservation", data).then((res) => {
      reset();
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your booking has been confirmed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/dashboard/mybookings");
    });
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Your Chef | Reservation</title>
      </Helmet>
      <SectionHeader
        subheading={"Reservation"}
        heading={"Book A Table"}
      ></SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center mx-10 my-5">
          <div className="flex gap-4">
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Date*</span>
              </label>
              <input
                {...register("date")}
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Time*</span>
              </label>
              <input
                {...register("time")}
                type="time"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Guest</span>
              </label>
              <select
                {...register("guest", { required: true })}
                defaultValue={"Pick One"}
                className="select select-bordered"
              >
                <option>1 person</option>
                <option>2 persons</option>
                <option>3 persons</option>
                <option>4 persons</option>
                <option>5 persons</option>
              </select>

              {errors.suggestion && (
                <p className="text-red-600">This field is required</p>
              )}
            </div>
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name")}
                defaultValue={user.displayName}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                {...register("phone")}
                placeholder="e.g. +880123456789"
                className="input input-bordered w-full "
                type="text"
                name="phone"
                data-inputmask="'mask': '(999) 999-9999'"
              />
            </div>
            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                defaultValue={user.email}
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full "
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <button type="submit" className="btn btn-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
