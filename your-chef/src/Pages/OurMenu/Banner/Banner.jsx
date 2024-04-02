import "./Banner.css";
const Banner = () => {
  return (
    <div>
      <div className="bg-img-menu p-20 mb-16">
        <div className="bg-black bg-opacity-40 h-60 w-9/12 mx-auto flex flex-col justify-center  items-center">
          <h3 className="text-white text-4xl font-bold">Our Menu</h3>
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

export default Banner;
