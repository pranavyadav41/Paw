import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <div className="w-full flex justify-center flex-col items-center">
        <div>
          <img
            className="h-96"
            src="public/logo/What is a 404 error_.jpeg"
            alt=""
          />
        </div>
        <p>Sorry, the page you're looking for isn't here.</p>
        <button className="mt-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#017dfe] hover:bg-blue-600">
          <NavLink to="/home">Go to homepage</NavLink>
        </button>
      </div>
    </>
  );
};

export default Error404;
