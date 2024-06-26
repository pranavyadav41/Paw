import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaTicketAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaSpinner,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  getService,
  getCoupons,
  applyCoupon,
  confirmBooking,
  getWallet,
} from "../../api/user";
import Payment from "../../Components/common/payPal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./checkOut.css"

Modal.setAppElement("#root");

const Checkout = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [service, setService] = useState<any>({});
  const [coupons, setCoupons] = useState<any>([]);
  const [wallet, setWallet] = useState<any>({});
  const [total, setTotal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const bookingData = location.state;

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getWallet(userInfo._id).then((response) => {
      console.log(response, "wallet");
      setWallet(response?.data);
    });
  }, [userInfo._id]);

  useEffect(() => {
    if (bookingData) {
      getService(bookingData.typeOfService).then((response) => {
        setService(response?.data);
      });
      getCoupons().then((response) => setCoupons(response?.data));
    }
  }, [bookingData]);

  useEffect(() => {
    if (service && bookingData) {
      const price = service.price?.[bookingData.size];
      setTotal(price);
    }
  }, [service, bookingData]);

  let navigate = useNavigate();

  const handleCouponChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = async () => {
    setIsLoading(true);
    const response = await applyCoupon(total, couponCode);
    setTotal(response?.data.total);
    setAppliedCoupon(response?.data.coupon);
    setCouponCode("");
    setIsLoading(false);
  };

  const handleRemoveCoupon = () => {
    setTotal(service.price?.[bookingData.size]);
    setAppliedCoupon(null);
  };

  const handleBooking = async () => {
    setIsLoading(true);
    const response = await confirmBooking(
      bookingData.franchise,
      bookingData.date,
      bookingData.startTime,
      bookingData.endTime,
      bookingData.userId,
      bookingData.address,
      bookingData.typeOfService,
      bookingData.name,
      bookingData.phone,
      bookingData.size,
      total,
      false
    );

    if (response) {
      navigate("/success", { state: response.data });
    }
    setIsLoading(false);
  };

  const handleWalletPayment = async () => {
    setIsLoading(true);
    const response = await confirmBooking(
      bookingData.franchise,
      bookingData.date,
      bookingData.startTime,
      bookingData.endTime,
      bookingData.userId,
      bookingData.address,
      bookingData.typeOfService,
      bookingData.name,
      bookingData.phone,
      bookingData.size,
      total,
      true 
    );

    if (response) {
      navigate("/success", { state: response.data });
    }
    setIsLoading(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleString(undefined, options);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast("Coupon code copied to clipboard!", {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 parallax"
        style={{ backgroundImage: "url('/logo/pawBackground.jpg')" }}
      ></div>
      <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full mx-4 md:mx-0 md:mt-5 p-8 mb-20 z-10">
        <h2 className="text-3xl font-bold mb-6 text-[#3968B6]">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-100 p-6 rounded-lg mb-4 hover-card">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaTicketAlt className="mr-2 text-[#9AD1AA]" /> Service Details
              </h3>
              <p className="text-gray-600">
                <span className="text-black font-medium">Category: </span>
                {service.category}
              </p>
              <p className="text-gray-600">
                <span className="text-black font-medium">Services: </span>
                {service.services?.join(", ")}
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg mb-4 hover-card">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-[#9AD1AA]" /> Booked Slot
              </h3>
              <p className="text-gray-700">
                <span className="text-black font-medium">Date:</span>{" "}
                {formatDate(bookingData.date)}
              </p>
              <p className="text-gray-700">
                <span className="text-black font-medium">Time:</span>{" "}
                {formatTime(bookingData.startTime)} -{" "}
                {formatTime(bookingData.endTime)}
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg mb-4 hover-card">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#9AD1AA]" /> Address
              </h3>
              <p className="text-gray-600">
                {bookingData.name}, {bookingData.phone}
              </p>
              <p className="text-gray-600">
                {bookingData.address.houseName}, {bookingData.address.area}
              </p>
              <p className="text-gray-600">
                {bookingData.address.city}, {bookingData.address.state},{" "}
                {bookingData.address.pincode}
              </p>
            </div>
          </div>
          <div>
            <div
              className="h-14 bg-gray-200 relative flex justify-center items-center hover:cursor-pointer pulse"
              onClick={openModal}
            >
              <p>View available coupons</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-md mb-4 relative hover-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaRupeeSign className="mr-2 text-[#9AD1AA]" /> Billing
              </h3>

              <div className="mb-4">
                <label
                  htmlFor="couponCode"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Apply Coupon
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={handleCouponChange}
                    className="border border-gray-300 rounded-l px-3 py-2 w-full focus:outline-none focus:ring focus:ring-indigo-200"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#9AD1AA] text-white px-4 py-2 rounded-r hover:bg-green-500 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 flex items-center">
                    <span className="text-green-600 font-semibold mr-2">
                      Applied Coupon:
                    </span>
                    <span>{appliedCoupon.code}</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between font-semibold mb-4">
                <span>Total Amount</span>
                <span className="text-xl text-[#3968B6]">
                  ₹{total}
                </span>
              </div>
              {wallet.balance >= total && (
                <button
                  onClick={handleWalletPayment}
                  className="bg-[#3968b6] lg:ml-28 text-white px-4 py-2 rounded hover:bg-green-500 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200 mb-4 payment-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    `Pay with Wallet (Balance: ₹${wallet.balance})`
                  )}
                </button>
              )}
              {!isModalOpen && (
                <Payment total={total} handleBooking={handleBooking} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Available Coupons"
        className="bg-white rounded-lg shadow-lg max-w-lg md:w-[500px] mx-auto p-6 mt-20 slide-in"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{
          content: { zIndex: 1000 },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          },
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Available Coupons</h2>
        <ul>
          {coupons
            .filter((coupon: any) => {
              const currentDate = new Date();
              const validFromDate = new Date(coupon.validFrom);
              const validToDate = new Date(coupon.validTo);
              return currentDate >= validFromDate && currentDate <= validToDate;
            })
            .map((coupon: any) => (
              <li key={coupon._id} className="mb-2">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover-card">
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {coupon.code}
                    </p>
                    <p className="text-sm text-gray-600">
                      Discount:₹{coupon.discount}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105 w-full"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Checkout;