import SectionHeader from "../../../components/SectionHeader/SectionHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Rating from "react-rating";
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://your-chef-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div className="py-10">
      <div className="pb-8">
        <SectionHeader
          subheading={"What our Clients Say"}
          heading={"Testimonials"}
        ></SectionHeader>
      </div>

      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="text-center flex flex-col gap-3 p-10">
              <Rating
                initialRating={review.rating}
                emptySymbol={<span className="text-4xl text-gray-300">☆</span>}
                fullSymbol={<span className="text-4xl text-yellow-500">★</span>}
              />
              <FaQuoteLeft className="text-5xl self-center"></FaQuoteLeft>
              <p className="text-black px-28">{review.details}</p>
              <h2 className="text-3xl text-yellow-600 uppercase">
                {review.name || "Anonymous"}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
