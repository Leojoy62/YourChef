import featured from "../../../assets/home/featured.jpg";

import "./Featured.css";
const Featured = () => {
  return (
    <div className="bg-featured px-20 py-10">
      <div className="w-5/12 mx-auto text-center">
        <p className="text-orange-500">Check It Out</p>
        <h3 className="text-4xl text-white font-bold border-y-4 py-2 mb-4 uppercase">
          From our menu
        </h3>
      </div>
      <div className="flex gap-4">
        <div>
          <img src={featured} alt="" />
        </div>
        <div className="px-4 text-white flex flex-col justify-center">
          <h1 className="hidden md:inline-block font-bold text-xl">
            July 21, 2023
          </h1>
          <h1>WHERE CAN I GET SOME?</h1>
          <p className="hidden md:inline-block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
