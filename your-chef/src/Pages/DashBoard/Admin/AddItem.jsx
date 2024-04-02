import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ImgUploadApi = import.meta.env.VITE_Img_Upload_Api;
const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${ImgUploadApi}`;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imgUploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgUrl = imgRes.data.display_url;
          const { name, recipe, category, price } = data;
          const newItem = {
            name,
            recipe,
            image: imgUrl,
            category,
            price: parseFloat(price),
          };
          axiosSecure.post("/menu", newItem).then((data) => {
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item Added",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            reset();
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Your Chef | AddItem</title>
      </Helmet>
      <div className="w-full px-10 mb-5">
        <SectionHeader
          subheading="What's New?"
          heading="Add an item"
        ></SectionHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-4 my-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                defaultValue={"Pick One"}
                className="select select-bordered"
              >
                <option>Salad</option>
                <option>Pizza</option>
                <option>Drinks</option>
                <option>Dessert</option>
                <option>Others</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe"
            ></textarea>
          </div>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full max-w-xs my-4"
          />{" "}
          <br />
          <button type="submit" className="btn btn-sm">
            Add Item
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItem;
