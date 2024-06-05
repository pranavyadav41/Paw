import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

interface Options extends ReactPayPalScriptOptions {
  currency: string;
}

interface PaymentProps {
  total: string;
  handleBooking: () => void;
}

const Payment: React.FC<PaymentProps> = ({ total, handleBooking }) => {
  
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState<string>((options as Options).currency);


  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
        "client-id": "Af7QRapmxxFahYN1msXn64YmqQzAv5ONt3qGnOCLqT9DGLL7U3b38yC2HqsjIxUpRbZEleL2I1D5sCeO",
      } as Options,
    });
  }, [total]);

  const onCreateOrder = (actions: any, value: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: value,
          },
        },
      ],
    });
  };

  const onApproveOrder = (actions: any) => {
    return actions.order.capture().then((details: any) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
      handleBooking();
    });
  };

  return (
    <div className="checkout flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
      {isPending ? (
        <p className="text-lg font-semibold">LOADING...</p>
      ) : (
        <>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data,actions) => onCreateOrder(actions, total)}
            onApprove={(data,actions) => onApproveOrder(actions)}
          />
        </>
      )}
    </div>
  );
};

export default Payment;