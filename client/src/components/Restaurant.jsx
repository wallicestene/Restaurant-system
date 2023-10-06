import React from 'react'

function Restaurant() {
  return (
    <div className='h-fit'>
        <div className='h-fit w-full border font-Montserrat rounded-xl overflow-hidden bg-white shadow-md'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Rosins_Restaurant_M%C3%A4rz_2014.JPG" className=' h-32 w-full object-cover' alt="" />
        <div className=' p-2'>
        <h1 className=" font-bold ">Restaurante</h1>
        <div className='flex flex-col gap-5 text-sm text-gray-500'>
        <p>San Francisco</p>
        <p>Starts from: <span className=' font-bold text-black'>$2450</span></p>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Restaurant