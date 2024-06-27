import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import MyMap from "../../Components/common/mapBox";
import LocationSearch from "../../Components/common/geoCoder";
import { TbCurrentLocation } from "react-icons/tb";
import { getServices } from "../../api/admin";
import { bookService} from "../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

interface AddressData {
  fullAddress: string;
  area: string;
  city: string;
  state: string;
  district: string;
  postcode: string;
  longitude: number;
  latitude: number;
}
interface Suggestion {
  place_name: string;
  coordinates: [number, number];
  area: string;
  city: string;
  state: string;
  pincode: string;
}

const BookingService: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [houseName, setHouseName] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [size, setSize] = useState<string>("");
  const [typeOfService, setTypeOfService] = useState<string>("");
  const [services, setServices] = useState<any>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any>([]);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sizeChartModalIsOpen, setSizeChartModalIsOpen] =
    useState<boolean>(false);
  const [franchise, setFranchise] = useState("");
  const [errors, setErrors] = useState<any>({});

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate()

  const today = new Date();

  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 8
  );

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!houseName.trim()) newErrors.houseName = "House No. is required";
    if (!area.trim()) newErrors.area = "Area/Colony is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!size.trim()) newErrors.size = "Size is required";
    if (!typeOfService.trim()) newErrors.typeOfService = "Service is required";
    if (!date) newErrors.date = "Date is required";
    if (!timeSlot.trim()) newErrors.timeSlot = "Time slot is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const [startTime, endTime] = timeSlot.split(" - ");
    const address = {
      houseName: houseName,
      area: area,
      city: city,
      state: state,
      pincode: pincode,
      location: [longitude, latitude],
    };

    const bookingData = {
      franchise,
      date,
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      userId: userInfo._id,
      address,
      typeOfService,
      name,
      phone,
      size,
    };
    navigate('/checkout', { state: bookingData })
    // setShowCheckout(true);
    // const response = await confirmBooking(
    //   franchise,
    //   date,
    //   startTime.trim(),
    //   endTime.trim(),
    //   userInfo._id,
    //   address,
    //   typeOfService,
    //   name,
    //   phone
    // );
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeOfService(e.target.value);
  };

  useEffect(() => {
    if (
      area.trim() !== "" &&
      city.trim() !== "" &&
      pincode.trim() !== "" &&
      typeOfService.trim() !== "" &&
      size.trim() !== "" &&
      date !== null &&
      latitude !== null &&
      longitude !== null
    ) {
      bookService(latitude, longitude, typeOfService, date).then((response) => {
        setAvailableSlots(response?.data.slots);
        setFranchise(response?.data.franchise);
      });
    }
  }, [
    area,
    city,
    pincode,
    state,
    typeOfService,
    size,
    date,
    longitude,
    latitude,
  ]);

  useEffect(() => {
    getServices().then((response) => setServices(response?.data));
  }, []);

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setArea(suggestion.area);
    setCity(suggestion.city);
    setState(suggestion.state);
    setPincode(suggestion.pincode);
    setLatitude(suggestion.coordinates[1]);
    setLongitude(suggestion.coordinates[0]);
  };

  const handleAddress = async (address: AddressData) => {
    setModalIsOpen(false);

    setArea(address.area);
    setCity(address.city);
    setState(address.state);
    setPincode(address.postcode);
    setLatitude(address.latitude);
    setLongitude(address.longitude);
  };

  return (
    <div className="relative flex justify-start items-center min-h-screen ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/logo/pawBackground.jpg')",
          opacity: "0.4",
        }}
      ></div>
      <div className="relative flex flex-col md:flex-row md:mb-14 container sm:mx-auto lg:px-32 px-4">
        <div className="bg-[#9AD1AA] rounded-lg shadow-lg p-6 md:p-8 md:mr-8 md:w-1/2 md:mt-5">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Book a Service
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area/Colony
              </label>
              <LocationSearch
                defaultArea={area}
                onSelectSuggestion={handleSelectSuggestion}
              />
              {errors.area && (
                <span className="text-red-500 text-sm">{errors.area}</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={city}
                  readOnly
                />
                {errors.city && (
                  <span className="text-red-500 text-sm">{errors.city}</span>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setModalIsOpen(true)}
                  className="md:mt-5 flex gap-2 justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                  <TbCurrentLocation />
                  Use my location
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={pincode}
                  readOnly
                />
                {errors.pincode && (
                  <span className="text-red-500 text-sm">{errors.pincode}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={state}
                  readOnly
                />
                {errors.state && (
                  <span className="text-red-500 text-sm">{errors.state}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                House No.
              </label>
              <input
                value={houseName}
                onChange={(e) => setHouseName(e.target.value)}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.houseName && (
                <span className="text-red-500 text-sm">{errors.houseName}</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Select Service
                </label>
                <select
                  value={typeOfService}
                  onChange={handleServiceChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service: any, index: number) => (
                    <option key={index} value={service._id}>
                      {service.category}
                    </option>
                  ))}
                </select>
                {errors.typeOfService && (
                  <span className="text-red-500 text-sm">
                    {errors.typeOfService}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <div className="relative flex-grow mr-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Size of Pet
                    <button
                      type="button"
                      className="absolute right-0 top-2.5 transform -translate-y-1/2 text-xs text-indigo-600 hover:bg-gray-100"
                      onClick={() => setSizeChartModalIsOpen(true)}
                    >
                      Size-Chart
                    </button>
                  </label>
                  <select
                    value={size}
                    onChange={handleSizeChange}
                    className="block w-full px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                  >
                    <option value="" disabled>
                      Select a size
                    </option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                  {errors.size && (
                    <span className="text-red-500 text-sm">{errors.size}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pick Date
                </label>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  minDate={minDate}
                  maxDate={maxDate}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">{errors.date}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Time Slots
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="" disabled>
                    {availableSlots
                      ? "Select a time slot"
                      : "No available slots"}
                  </option>
                  {availableSlots &&
                    availableSlots.map((slot: any, index: any) => (
                      <option
                        key={index}
                        value={`${slot.startTime} - ${slot.endTime}`}
                      >
                        {`${convertTo12HourFormat(
                          slot.startTime
                        )} - ${convertTo12HourFormat(slot.endTime)}`}
                      </option>
                    ))}
                </select>
                {errors.timeSlot && (
                  <span className="text-red-500 text-sm">
                    {errors.timeSlot}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-900 hover:bg-indigo-800 text-white font-medium py-3 px-16 rounded-full  shadow-md transition duration-200 ease-in-out transform hover:scale-105"
              >
                Book now
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 md:ml-8 mt-5 md:mt-10">
          <div className="w-[500px]">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#3968B6]">
              Why Paw?
            </h3>
            <p className="text-gray-700 mb-6">
              Paw Mobile pet grooming offers the utmost comfort for your pet and
              convenience for you. Here are just some of the benefits that a
              mobile grooming salon offers.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-14">
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-110"
                  src="/logo/Booking page/flying-fur-iconsArtboard-4.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#3968B6]">
                  Doorstep Service
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-125"
                  src="/logo/Booking page/flying-fur-iconsArtboard-2.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#2c5caa]">
                  AC Van
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-110"
                  src="/logo/Booking page/flying-fur-iconsArtboard-3.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#3968B6]">
                  Trained Staff
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-110"
                  src="/logo/Booking page/flying-fur-iconsArtboard-1.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#3968B6]">
                  Hot & Cold Water
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Location"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        {/* Your address selection modal */}
      </Modal>

      {/* Size chart modal */}
      <Modal
        isOpen={sizeChartModalIsOpen}
        onRequestClose={() => setSizeChartModalIsOpen(false)}
        contentLabel="Size Chart"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <div className="relative bg-white rounded-sm shadow-lg w-full max-w-3xl p-6">
          <button
            onClick={() => setSizeChartModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-sm px-3 py-1 focus:outline-none hover:bg-red-600"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Size Chart</h2>
          <table className="w-full border-collapse border bg-yellow-50 border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">Size</th>
                <th className="border border-gray-200 p-2">Pet Weight</th>
                <th className="border border-gray-200 p-2">Example Breed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">S</td>
                <td className="border border-gray-200 p-2">Up to 15-20 lbs</td>
                <td className="border border-gray-200 p-2">
                  Cat, Yorkie, Shih Tzu, Maltese, Chihuahua, Cavalier King
                  Charles Spaniel
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">M</td>
                <td className="border border-gray-200 p-2">Up to 30-40 lbs</td>
                <td className="border border-gray-200 p-2">
                  Dachshund, Corgi, Beagle, Cocker Spaniel, Shiba Inu, French
                  Bulldog
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">L</td>
                <td className="border border-gray-200 p-2">Up to 50-60 lbs</td>
                <td className="border border-gray-200 p-2">
                  English Bulldog, Pit Bull, Border Collie, Australian Shepherd,
                  small Labradors
                </td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">XL</td>
                <td className="border border-gray-200 p-2">Up to 70-80 lbs</td>
                <td className="border border-gray-200 p-2">
                  Golden Retriever, Standard Poodle, Boxer, German Shepherd,
                  Dalmatian
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Location"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-4 py-1 focus:outline-none hover:bg-red-600"
          >
            Close
          </button>
          <h2 className="text-lg font-semibold mb-4 text-center">Mark Location</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <MyMap onAddressSelect={handleAddress} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingService;
