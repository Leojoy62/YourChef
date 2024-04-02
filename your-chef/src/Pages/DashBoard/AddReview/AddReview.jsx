import Rating from "react-rating";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosSecure.post("/reviews", data).then((res) => {
      reset();
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your feedback has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    console.log(data);
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Your Chef | Add Review</title>
      </Helmet>
      <SectionHeader
        subheading={"Your Feedback Matters"}
        heading={"Give A review"}
      ></SectionHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center mx-10 my-5">
          <Controller
            name="rating"
            control={control}
            defaultValue={0} // Initial rating value
            render={({ field }) => (
              <Rating
                className="text-center"
                {...field}
                initialRating={field.value}
                emptySymbol={<span className="text-4xl text-gray-300">☆</span>}
                fullSymbol={<span className="text-4xl text-yellow-500">★</span>}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              defaultValue={user.displayName}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              readOnly
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email")}
              defaultValue={user.email}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              readOnly
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Suggestion?</span>
            </label>
            <input
              {...register("suggestion", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            {errors.suggestion && (
              <p className="text-red-600">This field is required</p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Your Feedback</span>
            </label>

            <textarea
              {...register("details", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
            {errors.details && (
              <p className="text-red-600">This field is required</p>
            )}
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

export default AddReview;
