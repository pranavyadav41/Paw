import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <div
        className="bg-cover bg-center bg-[#F2F2F2] w-full min-h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/public/logo/404.png')" }}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-9xl font-bold text-[#8FC42A]">404</p>
          <p className="text-4xl font-semibold">Oops! Page not found</p>
          <button className="bg-[#E34F61] hover:bg-pink-600 text-white font-medium py-3 px-7 mt-5 rounded-full">
            <NavLink to="/">Go to homepage</NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default Error404;
