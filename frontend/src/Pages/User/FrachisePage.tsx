import { NavLink } from "react-router-dom";

function FranchisePage() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-[#fffefe]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/public/logo/pawBackground.jpg')",
          opacity: 0.3,
        }}
      ></div>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              className="w-full max-w-md h-auto rounded-sm"
              src="public/logo/FranchisePage/home-1-shape-image-3.png"
              alt="Cute Yorkshire Terrier Dog"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl text-[#3968B6] text-center lg:text-left">
                Take Your First Step Towards Success
              </h1>
              <p className="text-center lg:text-left">
                Start a Pet Spa in your city. For more details, please register
                by providing your contact information, and we will reach out to
                you via email.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mt-6">
              <NavLink
                to="/franchise/register"
                className="bg-[#192955] hover:bg-blue-800 text-white font-medium py-2 px-7 rounded-3xl inline-block transition duration-300"
              >
                Get started
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchisePage;