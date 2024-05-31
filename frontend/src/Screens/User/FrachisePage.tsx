import React from "react";
import { NavLink } from "react-router-dom";

function FranchisePage() {
  return (
    <>
<div className="relative flex justify-center min-h-screen bg-[#fffefe]">
  <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: "url('/public/logo/pawBackground.jpg')",
      opacity: 0.4,
    }}></div>
  <div className="w-[80%] h-[500px]  mt-20 rounded-xl flex relative z-10">
    <div className="flex items-center w-[50%] justify-center">
      <img
        className="h-[450px] rounded-sm"
        src="public/logo/FranchisePage/image-copyright-49.jpg"
        alt="Cute Yorkshire Terrier Dog"
      />
    </div>

    <div className="w-[50%]">
      <div className="flex flex-col gap-4 mt-16">
        <h1 className="mt-10 font-bold text-3xl text-[#3968B6]">
          Take Your First Step Towards Success
        </h1>
        <p>
          Start a Pet Spa in your city. For more details, please register
          by providing your contact information, and we will reach out to
          you via email.
        </p>
      </div>
      <button className="bg-[#192955] hover:bg-customColor3 text-black font-medium py-2 px-7 mt-3 rounded-3xl">
        <NavLink to="/franchise/register" className="text-white">Get started</NavLink>
      </button>
    </div>
  </div>
</div>



    </>
  );
}

export default FranchisePage;
