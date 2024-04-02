import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Category.css";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";

const Category = () => {
  return (
    <div>
      <SectionHeader
        subheading="From 11:00am to 10:00pm"
        heading="Order Online"
      ></SectionHeader>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
          <img src={slide1} alt="" />
          <h3 className="uppercase text-white text-xl md:text-2xl text-center -mt-20 font-semibold">
            Salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" />
          <h3 className="uppercase text-white text-xl md:text-2xl text-center -mt-20 font-semibold">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="" />
          <h3 className="uppercase text-white text-xl md:text-2xl text-center -mt-20 font-semibold">
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" />
          <h3 className="uppercase text-white text-xl md:text-2xl text-center -mt-20 font-semibold">
            Desserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" />
          <h3 className="uppercase text-white text-xl md:text-2xl text-center -mt-20 font-semibold">
            Salads
          </h3>
        </SwiperSlide>
      </Swiper>
      <div className="bg-img p-20 mb-16">
        <div className="bg-black bg-opacity-40 h-60 w-9/12 mx-auto flex flex-col justify-center  items-center">
          <h3 className="text-white text-4xl font-bold">Your Chef</h3>
          <p className="hidden md:inline-block text-white px-5 mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
            voluptatum placeat consectetur expedita at eligendi illo, voluptas
            totam aperiam? Perspiciatis molestiae quidem reiciendis laudantium
            dignissimos nemo optio fugit soluta doloremque. Id cumque reiciendis
          </p>
        </div>
      </div>
    </div>
  );
};

export default Category;
