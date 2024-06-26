import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaymentProps {
  total: string;
  handleBooking: () => void;
}

const Payment: React.FC<PaymentProps> = ({ total, handleBooking }) => {
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
    return actions.order.capture().then((details: any) => {
      console.log(data, details)
      handleBooking();
    });
  };

  return (
    <div className="checkout flex flex-col items-center justify-center p-4 rounded-lg">
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={onCreateOrder}
        onApprove={onApproveOrder}
      />
    </div>
  );
};

export default Payment;