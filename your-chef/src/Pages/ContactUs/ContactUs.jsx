import "./ContactUs.css";
import SectionHeader from "../../components/SectionHeader/SectionHeader.jsx";
import { FaTelegram } from "react-icons/fa6";
import { FaPhone, FaLocationDot, FaRegClock } from "react-icons/fa6";
import { useState } from "react";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
const ContactUs = () => {
  const [axiosSecure] = useAxiosSecure();
  const [formData, setFormData] = useState({
    from: "",
    to: "leojoy62@gmail.com", // Your email address
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axiosSecure.post("/send-email", formData);
      console.log("Email sent:", response.data);
      // Optionally, show a success message to the user
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle and display the error to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Your Chef | Contact Us</title>
      </Helmet>
      <div className="bg-img-shop p-20 mb-16">
        <div className="bg-black bg-opacity-40 h-60 w-9/12 mx-auto flex flex-col justify-center  items-center">
          <h3 className="text-white text-center text-4xl font-bold">
            Contact Us
          </h3>
          <p className="text-white px-5 mt-2">Would You Like to Try A Dish?</p>
        </div>
      </div>
      <div>
        <SectionHeader
          subheading={"Visit Us"}
          heading={"Our Location"}
        ></SectionHeader>
      </div>
      <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 px-20 my-5 gap-5">
        <div className="flex flex-col w-64 items-center bg-orange-700 bg-opacity-80 text-white p-10 rounded-lg">
          <FaPhone className="text-5xl text-white"></FaPhone>
          <h1 className="uppercase font-bold text-xl my-3">Phone</h1>
          <p>+880123456789</p>
        </div>
        <div className="flex flex-col w-64 items-center bg-orange-700 bg-opacity-80 text-white p-10 rounded-lg">
          <FaLocationDot className="text-5xl text-white"></FaLocationDot>
          <h1 className="uppercase font-bold text-xl my-3">Address</h1>
          <p>H-32, Banani</p>
          <p>Dhaka</p>
        </div>
        <div className="flex flex-col w-64 items-center bg-orange-700 bg-opacity-80 text-white p-10 rounded-lg">
          <FaRegClock className="text-5xl text-white"></FaRegClock>
          <h1 className="uppercase font-bold text-xl mt-3">Working</h1>
          <h1 className="uppercase font-bold text-xl mb-3">Hours</h1>
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
        </div>
      </div>
      <div>
        <SectionHeader
          subheading={"Send Us a Message"}
          heading={"Contact Form"}
        ></SectionHeader>
      </div>
      <div className="bg-img-contact p-10 my-10">
        <div className="items-center flex flex-col justify-center">
          <form
            className="flex flex-col justify-center w-1/2"
            onSubmit={handleSubmit}
          >
            <input
              className="p-4 rounded-input"
              placeholder="Your Email"
              type="email"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            />
            <br />
            <input
              className="p-4 rounded-input"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <br />
            <textarea
              className="h-52 rounded-input"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <br />
            <button className="btn text-white bg-black border-0 uppercase hover:bg-gray-700">
              Send Message{" "}
              <FaTelegram className="text-orange-700 text-2xl"></FaTelegram>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
