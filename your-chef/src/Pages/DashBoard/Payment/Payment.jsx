import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";
import SectionHeader from "../../../components/SectionHeader/SectionHeader.jsx";
import { Helmet } from "react-helmet-async";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  const [, cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  console.log(stripePromise);
  return (
    <div className="w-full">
      <Helmet>
        <title>Your Chef | Payment</title>
      </Helmet>
      <SectionHeader
        subheading={"Stripe Gateway"}
        heading={"Payment"}
      ></SectionHeader>
      <Elements stripe={stripePromise}>
        <CheckOutForm cart={cart} price={price}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
