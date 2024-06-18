import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();

  let { userInfo } = useSelector((state: RootState) => state.auth);

  function handleClick(): void {
    if (userInfo) {
      navigate("/booking");
    } else {
      toast.info("Please login", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <div>
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
        <div
          className="h-[800px] bg-white flex items-start"
          style={{
            backgroundImage: "url('/public/logo/Homepage/Untitled design.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-center items-center w-[50%]">
            <img
              className="h-[450px] mt-16"
              src="/public/logo/Homepage/2photo-pots-207533-unsplash-scaled-scaled-600x600.jpg"
              alt=""
            />
          </div>
          <div className="w-[50%]">
            <div className="mt-16 ml-5 w-[500px] flex flex-col gap-3 text-[#344A5F]">
              <div className="flex items-center">
                <img
                  className="opacity-60"
                  src="/public/logo/Homepage/WFF.png"
                  alt=""
                />
                <h1 className="text-4xl font-bold text-[#3968B6]">Why Paw</h1>
              </div>
              <p className="text-black">
                Flying Fur Mobile pet grooming offers the utmost comfort for
                your pet and convenience for you. Here are just some of the
                benefits that a mobile grooming salon offers
              </p>
              <div className="grid grid-cols-2 gap-6 mt-3">
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
                  <h1 className="font-bold text-lg text-center text-[#3968B6]">
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
        <div
          className="h-screen w-full "
          style={{
            backgroundImage:
              "url('/public/logo/Homepage/Untitled design (1).png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full flex h-[600px]">
            <div className="w-[50%] flex justify-center">
              <div className="mt-16  w-[500px] flex flex-col gap-3 text-[#344A5F]">
                <div className="flex items-center">
                  <img
                    className="opacity-60"
                    src="/public/logo/Homepage/WFF.png"
                    alt=""
                  />
                  <h1 className="text-4xl font-bold text-[#3968B6]">
                    Services
                  </h1>
                </div>
                <p className="text-[black]" style={{ lineHeight: "1.8" }}>
                  Our Salon is equipped with hot & cold running water for a
                  comfortable bathing experience, it is also fully
                  air-conditioned keeping your pet’s comfort in mind, full sized
                  tub and a state of the art grooming table. We provide personal
                  uninterrupted attention for you and your pet in a quite and
                  stress free environment.
                </p>

                <button className="bg-[#192955] text-white w-32 h-10 rounded-full">
                  Services
                </button>
              </div>
            </div>

            <div className="w-[50%] h-screen flex justify-start">
              <img
                className="h-[450px]"
                src="/public/logo/Homepage/services.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center md:mt-20">
          <img
            src="/public/logo/FranchisePage/footer-bottom-image-removebg.png"
            alt="Footer Image"
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
