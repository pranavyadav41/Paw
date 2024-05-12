import React from 'react'
import { NavLink } from 'react-router-dom'

function FranchisePage() {

 
  return (
   <>

   <div className="flex justify-center min-h-screen bg-[#fffefe]">

    <div className='w-[80%] h-[500px] bg-[#bee4b1] mt-20 rounded-xl flex'>

      <div className='flex items-center w-[50%] justify-center'>
        <img className='h-96' src="public/logo/Premium_Vector___The_character_cute_yorkshire_terrier_dog_taking_a_bath_with_bathtub_for_healthcare-removebg-preview.png" alt="" />

      </div>

      <div className='w-[50%]'>
       <div className='flex flex-col gap-3 mt-16'>

       <h1 className='mt-10 font-bold text-2xl'>Take your first step towards success</h1>
        <p>Start a Pet Spa in your city. For more details, please register by providing your contact information, and we will reach out to you via email.</p>
        


       </div>
       <button className="bg-customColor4 hover:bg-customColor3 text-black font-medium py-2 px-7 mt-3 rounded-full">
            <NavLink to="/franchise/register">Get started</NavLink>
          </button>
      </div>

    </div>


    
   



   </div>
   
   
   
   </>
  )
}

export default FranchisePage
