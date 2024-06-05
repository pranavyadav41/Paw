import { NavLink } from "react-router-dom";

function FranchisePage() {
  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen bg-[#fffefe]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/public/logo/pawBackground.jpg')",
            opacity: 0.3,
          }}
        ></div>
        <div className="w-[80%] h-[500px] rounded-xl flex relative z-10 self-center">
          <div className="flex items-center w-[50%] justify-center">
            <img
              className="h-[550px] w-[640px] rounded-sm mr-16 mb-28"
              src="public/logo/FranchisePage/home-1-shape-image-3.png"
              alt="Cute Yorkshire Terrier Dog"
            />
          </div>

          <div className="w-[50%]">
            <div className="flex flex-col gap-4">
              <h1 className="mt-10 font-bold text-3xl text-[#3968B6]">
                Take Your First Step Towards Success
              </h1>
              <p>
                Start a Pet Spa in your city. For more details, please register
                by providing your contact information, and we will reach out to
                you via email.
              </p>
            </div>
            <button className="bg-[#192955] hover:bg-blue-800 text-black font-medium py-2 px-7 mt-3 rounded-3xl">
              <NavLink to="/franchise/register" className="text-white">
                Get started
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FranchisePage;
