import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import img from "../../../assets/others/blank-profile-picture.png";
import "./UserHome.css";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const image_upload_key = import.meta.env.VITE_Img_Upload_Api;
const UserHome = () => {
  const { user, updateUserPhoto } = useContext(AuthContext);
  const [userPhotoURL, setUserPhotoURL] = useState(user?.photoURL || img);

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_upload_key}`;
  const [update, setUpdate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [axiosSecure] = useAxiosSecure();
  const { data: userStats = {} } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user?.email}`);
      return res.data;
    },
  });
  const handleUpdatePhoto = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          const imgUrl = response.data.display_url;
          updateUserPhoto(imgUrl).then(() => {
            setUserPhotoURL(imgUrl);
            setUpdate(false);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Updated",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
  };

  const handleFileInputChange = (e) => {
    const image = e.target.files[0];

    setSelectedFile(image);
    setUpdate(true);
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Your Chef | User Home</title>
      </Helmet>
      <div className="w-full grid grid-cols-1 md:flex gap-4 md:mx-5">
        <div className="w-full md:w-1/2 relative flex flex-col h-80 justify-center bg-yellow-300 rounded-box place-items-center place-items-center p-10">
          <div className="absolute right-4 top-3">
            {update ? (
              <button
                onClick={handleUpdatePhoto}
                className="btn btn-outline btn-sm"
              >
                Update
              </button>
            ) : (
              <div className="relative">
                {/* Hidden file input */}
                <input
                  type="file"
                  id="photoInput"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileInputChange}
                />
                {/* Update Photo button */}
                <label
                  htmlFor="photoInput"
                  className="relative block bg-blue-500 text-white rounded-lg py-2 px-4 cursor-pointer"
                >
                  Update Photo
                </label>
              </div>
            )}
          </div>
          <div>
            <div className="image-container">
              <img
                src={userPhotoURL}
                alt="Your Image"
                className="circular-image"
              />
            </div>
            <p className="text-center font-bold text-2xl uppercase">
              {user?.displayName || "Unknown"}
            </p>
          </div>
        </div>

        <div className=" divider divider-horizontal"></div>

        <div className="mb-5 w-full md:w-1/2 flex flex-col h-80 justify-center bg-yellow-300 rounded-box place-items-center place-items-center p-10">
          <h1 className="font-bold text-center text-3xl">Your Activity</h1>
          <p className="text-lime-600 font-bold text-xl">
            Cart: {userStats.cart}
          </p>
          <p className="text-red-600 font-bold text-xl">
            Reviews: {userStats.reviews}
          </p>
          <p className="text-violet-900 font-bold text-xl">
            Bookings: {userStats.bookings}
          </p>
          <p className="text-fuchsia-800 font-bold text-xl">
            Payment: {userStats.payments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
