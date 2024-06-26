import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: (options as Options).currency,
        "client-id": "AQfGdzRqN2AI8KMjftw1H6GyxshTx0QxieZ3oELTUfN0qH-1F5zCofB6GHtu0G6rxhGT8Kgg6MYyF8IW",
      } as Options,
    });
  }, [total]);

  const onCreateOrder = (data: any, actions: any) => {
    console.log(data)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const onApproveOrder = (data: any, actions: any) => {
    console.log(data)
    return actions.order.capture().then((details: any) => {
      console.log(details)
      handleBooking();
    });
  };

  return (
    <div className="checkout flex flex-col items-center justify-center p-4 rounded-lg">
      {isPending ? (
        <p className="text-lg font-semibold">LOADING...</p>
      ) : (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
        />
      )}
    </div>
  );
};

export default Payment;
