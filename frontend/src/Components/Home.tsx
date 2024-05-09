function Home() {
  return (
    <>
      <div className="h-80 bg-white flex justify-around">
        <div className="flex items-center ">
          <img className="h-[250px]"  src="/public/logo/file.png" alt="" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl text-customColor1 font-bold">
            PET GROOMING AT YOUR DOORSTEP
          </h1>
          <button className="bg-customColor4 hover:bg-customColor3 text-black font-bold py-2 px-7 rounded-full">
            BOOK NOW
          </button>
        </div>
      </div>
     
    </>
  );
}

export default Home;
