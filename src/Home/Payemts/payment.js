import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./payment.css";
import { PaymentUrl, UserUrl } from "../../UPI";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(PaymentUrl);

export default function Payment({ id, amount, selectedPlan }) {
  const [clientSecret, setClientSecret] = useState("");
  // console.log(id, amount);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (amount) {
      fetch(`${UserUrl}create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              id: id ? `${id}xl-tshirt` : "",
              amount: amount ? `${+amount}00` : 10000,
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          // console.log(data.clientSecret);
        });
    }
  }, [amount, id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="debitCard-Container">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm selectedPlan={selectedPlan} />
        </Elements>
      )}
    </div>
  );
}
