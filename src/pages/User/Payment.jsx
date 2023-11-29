import SectionHeading from "../../components/Dashboard/SectionHeading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["accepted-offered-properties", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/v1/user/accepted-offered-properties/${id}`
      );

      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Echo Estates | Payment </title>
      </Helmet>
      <SectionHeading title={"Payment"}></SectionHeading>
      <div className="mt-10 text-center">
        <h3 className="capitalize font-semibold t">
          Pay the accepted amount for a Successfull Purchase
        </h3>
      </div>
      {isPending ? (
        <div></div>
      ) : (
        <div className="max-w-6xl mt-20 mx-auto">
          <Elements stripe={stripePromise}>
            <CheckOutForm property={data}></CheckOutForm>
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Payment;
