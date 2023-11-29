import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
const CheckOutForm = ({ property }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const offered_price = property?.offered_price;
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .post("/api/v1/create-payment-intent", {
        price: offered_price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    // eslint-disable-next-line
  }, [offered_price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirm_error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user.email,
          },
        },
      });

    if (confirm_error) {
      console.log("card confirm error", confirm_error);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <div className="mt-20  text-center">
          <button
            className="btn btn-neutral  px-12 rounded-full"
            disabled={!stripe || !clientSecret}
            type="submit"
          >
            Pay ${offered_price}k
          </button>
          <p className="text-red-500 font-semibold mt-6"> {error && error} </p>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;

CheckOutForm.propTypes = {
  property: PropTypes.object,
};
