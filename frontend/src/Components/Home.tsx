import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  let { userInfo } = useSelector((state: RootState) => state.auth);

  function handleClick(): void {
    if (userInfo) {
      navigate("/booking");
    } else {
      toast.info("Please login", {
        position:"top-center",
      });
    }
  }

  return (
    <>
      <div
        className="bg-cover bg-center w-full h-[684px]"
        style={{ backgroundImage: "url('/public/logo/slide3-3.jpg')" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-48 left-40 w-[600px]  flex flex-col  gap-3">
            <h1 className="text-white text-6xl">Every Pet Deserves</h1>
            <h1 className="text-white text-6xl  font-bold">Celebrity Care</h1>
            <h1 className="text-white text-lg">
              We provide personal ininterrupted attention for you and your pet
              in a quite and stress free enviornment.
            </h1>
            <button
              onClick={handleClick}
              className="bg-[#192955] hover:bg-blue-900 text-white font-medium py-4 w-48 mt-3 rounded-full"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
      <div className="h-96 bg-white flex ">
        <div className="flex justify-center items-center w-[50%]">
          <img className="h-[250px]" src="/public/logo/file.png" alt="" />
        </div>
        <div className="w-[50%]">
          <div className="mt-16 ml-5 w-[500px] flex flex-col gap-3 text-[#344A5F]">
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl font-bold">Our Mission</h1>
              <span>DELIVERING THE BEST PET CARE</span>
            </div>
            <p className="text-black">
              Flying Fur Mobile pet grooming offers the utmost comfort for your
              pet and convenience for you. Here are just some of the benefits
              that a mobile grooming salon offers
            </p>
            <button className="bg-customColor4 hover:bg-orange-400 text-black font-medium py-3 w-44 mt-3 rounded-full">
              <NavLink to="/services">SERVICES</NavLink>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] flex items-center justify-center ">
        <div className="bg-[#BEE4B1] w-[90%] h-[90%] rounded-lg"></div>
      </div>
    </>
  );
}

export default Home;
