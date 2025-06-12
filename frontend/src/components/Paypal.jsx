import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const PayPalComponent = ({ total, onApprove, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AVWfc9_4U_NIBAWBa6nDkHyt2mzokJv4na1uXS4nLy_YN_gfLRJLS3ID3YFqKGdla2DpAMSUPGM9YH5u",
        currency: "USD",
      }}
    >
      <div className="border rounded p-3">
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            const amount = parseFloat(total);
            if (isNaN(amount)) {
              toast.error("Invalid total value");
              return;
            }
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) =>
            actions.order.capture().then((details) => {
              if (onApprove) onApprove(details);
            })
          }
          onError={(err) => {
            if (onError) onError(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalComponent;
