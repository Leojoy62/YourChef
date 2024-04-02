import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Dessets from "./Desserts/Dessets";
import Drinks from "./Drinks/Drinks";
import Pizza from "./Pizza/Pizza";
import Salads from "./Salads/Salads";
import Soups from "./Soups/Soups";
import TodaysOffer from "./TodaysOffer";

const OurMenu = () => {
  return (
    <div>
      <Helmet>
        <title>Your Chef | Menu</title>
      </Helmet>
      <Banner></Banner>
      <TodaysOffer></TodaysOffer>
      <Dessets></Dessets>
      <Pizza></Pizza>
      <Salads></Salads>
      <Soups></Soups>
      <Drinks></Drinks>
    </div>
  );
};

export default OurMenu;
