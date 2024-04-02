import { useQuery } from "react-query";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  console.log(user.email);

  const { data: paymentsCount = [] } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  console.log(paymentsCount.length);
  return (
    <div className="md:w-full">
      <Helmet>
        <title>Your Chef | Payment History</title>
      </Helmet>
      <SectionHeader
        subheading={"At A Glance"}
        heading={"Payment History"}
      ></SectionHeader>
      <div className="m-5">
        <h3 className="font-bold text-2xl text-center my-10">
          Total Payments: {paymentsCount.length}
        </h3>
      </div>
      <div>
        <div className="overflow-x-auto mx-auto m-5">
          <table className="table-sm md:table-xl table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <td>Email</td>
                <td>Transaction ID</td>
                <td className="flex justify-end mr-12">Total Paid</td>
                <td>Date</td>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {paymentsCount.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>{payment.transactionId}</td>
                  <td className="flex justify-end mr-12">${payment.price}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
