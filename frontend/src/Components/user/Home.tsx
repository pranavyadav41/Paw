import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import SocialMediaIcons from "./socialMediaIcons";
import { homePageData } from "../../api/user";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ResponsiveImage from "./ResponsiveImage";

function Home() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFranchises, setTotalFranchises] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [franchisesCount, setFranchisesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

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

  const handleService = ()=>{
    navigate("/services")
  }

  useEffect(() => {
    homePageData()
      .then((response: any) => {
        setTotalBooking(response?.data?.totalBookings);
        setTotalFranchises(response?.data?.totalFranchises);
        setTotalUsers(response?.data?.totalUsers);
      })
      .catch((error) => {
        console.error("Error fetching home page data:", error);
      });
  }, []);

  useEffect(() => {
    if (inView) {
      if (totalUsers > 0) animateCount(totalUsers, setUsersCount);
      if (totalFranchises > 0)
        animateCount(totalFranchises, setFranchisesCount);
      if (totalBooking > 0) animateCount(totalBooking, setBookingsCount);
    }
  }, [inView, totalUsers, totalFranchises, totalBooking]);

  const animateCount = (
    end: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  const iconAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 260, damping: 20 },
  };

  return (
    <div className="flex flex-col w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-cover bg-center w-full min-h-[50vh] md:min-h-[684px] relative"
        style={{ backgroundImage: "url('/logo/slide3-3.jpg')" }}
      >
        <SocialMediaIcons />
        <motion.div
          {...fadeInUp}
          className="absolute top-1/4 left-5 md:left-10 lg:left-40 w-full md:w-[600px] flex flex-col gap-3 p-4"
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl">
            Every Pet Deserves
          </h1>
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold">
            Celebrity Care
          </h1>
          <h1 className="text-white text-sm sm:text-base md:text-lg">
            We provide personal uninterrupted attention for you and your pet in
            a quiet and stress-free environment.
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="bg-[#192955] hover:bg-blue-900 text-white font-medium py-2 sm:py-3 md:py-4 w-32 sm:w-36 md:w-48 mt-3 rounded-full text-xs sm:text-sm md:text-base"
          >
            BOOK NOW
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-[600px] md:min-h-[800px] bg-white flex flex-col md:flex-row items-center"
        style={{
          backgroundImage: "url('/logo/Homepage/Untitled design.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          {...fadeInUp}
          className="flex justify-center items-center w-full md:w-1/2 md:mb-40"
        >
          <img
            src="/logo/Homepage/2photo-pots-207533-unsplash-scaled-scaled-600x600.jpg"
            alt="Pet grooming"
            className="md:max-h-[500px] mt-8 hidden lg:block"
          />
        </motion.div>
        <div className="w-full md:w-1/2 md:mb-48">
          <motion.div
            {...fadeInUp}
            className="mt-8 md:mt-16 w-full max-w-[500px] mx-auto flex flex-col gap-3 text-[#344A5F] px-4 md:px-0"
          >
            <div className="flex items-center">
              <img
                className="opacity-60 w-8 sm:w-12 h-auto"
                src="/logo/Homepage/WFF.png"
                alt=""
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3968B6] ml-2">
                Why Paw
              </h1>
            </div>
            <p className="text-black text-xs sm:text-sm md:text-base">
              Flying Fur Mobile pet grooming offers the utmost comfort for your
              pet and convenience for you. Here are just some of the benefits
              that a mobile grooming salon offers
            </p>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mt-3"
            >
              {[
                {
                  img: "logo/Booking page/flying-fur-iconsArtboard-4.png",
                  title: "Doorstep Service",
                },
                { img: "logo/Booking page/flying-fur-iconsArtboard-2.png", title: "AC Van" },
                {
                  img: "logo/Booking page/flying-fur-iconsArtboard-3.png",
                  title: "Trained Staff",
                },
                {
                  img: "logo/Booking page/flying-fur-iconsArtboard-1.png",
                  title: "Hot & Cold Water",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={iconAnimation}
                  className="flex flex-col items-center"
                >
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 md:mb-4 transition-transform transform hover:scale-110"
                    src={`/logo/Booking page/${item.img}`}
                    alt=""
                  />
                  <h1 className="font-bold text-xs sm:text-sm md:text-lg text-center text-[#3968B6]">
                    {item.title}
                  </h1>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen w-full"
        style={{
          backgroundImage:
            "url('/logo/Homepage/Untitled design (1).png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-col md:flex-row min-h-[600px]">
          <motion.div
            {...fadeInUp}
            className="w-full md:w-1/2 flex justify-center p-4"
          >
            <div className="mt-8 md:mt-16 w-full max-w-[500px] flex flex-col gap-3 text-[#344A5F]">
              <div className="flex items-center">
                <img
                  className="opacity-60 w-8 sm:w-12 h-auto"
                  src="/logo/Homepage/WFF.png"
                  alt=""
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3968B6] ml-2">
                  Services
                </h1>
              </div>
              <p
                className="text-black text-xs sm:text-sm md:text-base"
                style={{ lineHeight: "1.8" }}
              >
                Our Salon is equipped with hot & cold running water for a
                comfortable bathing experience, it is also fully air-conditioned
                keeping your pet's comfort in mind, full sized tub and a state
                of the art grooming table. We provide personal uninterrupted
                attention for you and your pet in a quiet and stress-free
                environment.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#192955] text-white w-28 sm:w-32 h-8 sm:h-10 rounded-full text-xs sm:text-sm md:text-base mt-4"
                onClick={handleService}
                
              >
                Services
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            {...fadeInUp}
            className="w-full md:w-1/2 flex justify-center md:justify-start p-4"
          >
            <ResponsiveImage
              src="/logo/Homepage/services.png"
              alt="Our services"
              className="max-h-[300px] md:max-h-[450px]"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-[300px] md:min-h-[384px] w-full flex flex-wrap justify-center items-center gap-4 md:gap-8 p-4"
      >
        {[
          { count: usersCount, label: "HAPPY CLIENTS" },
          { count: franchisesCount, label: "TOTAL FRANCHISES" },
          { count: bookingsCount, label: "PETS GROOMED" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-yellow-400 p-4 sm:p-6 md:p-10 rounded-lg shadow-md flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl sm:text-4xl md:text-7xl font-semibold mb-2">
              {item.count}
            </h2>
            <span className="text-sm sm:text-xl md:text-3xl font-semibold text-center">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10 md:mt-20"
      >
        <ResponsiveImage
          src="/logo/FranchisePage/footer-bottom-image-removebg.png"
          alt="Footer Image"
          className="w-full"
        />
      </motion.div>
    </div>
  );
}

export default Home;
