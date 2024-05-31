import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import MyMap from "../../Components/common/mapBox";


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

const BookingService: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [typeOfService, setTypeOfService] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sizeChartModalIsOpen, setSizeChartModalIsOpen] =
    useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      name,
      phone,
      address,
      typeOfService,
      date,
      timeSlot,
    });
  };

  const handleAddress = async (address: AddressData) => {
    // Handle address selection
  };

  return (
    <div className="relative flex justify-start items-center min-h-screen ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/public/logo/pawBackground.jpg')",
          opacity: "0.4",
        }}
      ></div>
      <div className="relative flex flex-col md:flex-row  md:mb-14 container sm:mx-auto lg:px-32 px-4">
        <div className=" bg-[#9AD1AA] rounded-md shadow-lg p-6 md:p-8 md:mr-8 md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#3968B6]">
            Book a Service
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full p-2 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
                <div
        className="flex-shrink-0 w-28 h-24 bg-gray-200 border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer mt-6 flex justify-center items-center"
        onClick={() => setModalIsOpen(true)}
      >
        <img src="public/logo/Booking page/digital-hand-set-location-map-with-two-pins-ai-technology-gps_773922-34180.jpg" alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Select Service
                  </label>
                  <input
                    type="text"
                    value={typeOfService}
                    onChange={(e) => setTypeOfService(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative flex-grow mr-2">
                    <label className="block text-sm font-medium text-[#3968B6]">
                      Select Size of Pet
                    </label>
                    <input
                      type="text"
                      value={""}
                      onChange={(e) => ""}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B] pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-10 text-xs text-blue-400"
                      onClick={() => {
                        setSizeChartModalIsOpen(true)
                       
                      }}
                    >
                      Size-Chart
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Pick Date
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={(date: Date | null) => setDate(date)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3968B6]">
                    Available Time Slots
                  </label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48808B]"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#48808B] hover:bg-blue-900 text-white font-medium py-3 px-20 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 md:ml-8 mt-8">
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
                  src="/public/logo/Booking page/flying-fur-iconsArtboard-4.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#3968B6]">
                  Doorstep Service
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-125"
                  src="/public/logo/Booking page/flying-fur-iconsArtboard-2.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#2c5caa]">
                  AC Van
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-110"
                  src="/public/logo/Booking page/flying-fur-iconsArtboard-3.png"
                  alt=""
                />
                <h1 className="font-bold text-lg text-center text-[#3968B6]">
                  Trained Staff
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 mb-4 transition-transform transform hover:scale-110"
                  src="/public/logo/Booking page/flying-fur-iconsArtboard-1.png"
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
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1 focus:outline-none hover:bg-red-600"
          >
            Close
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Mark Location</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <MyMap onAddressSelect={handleAddress} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingService;
