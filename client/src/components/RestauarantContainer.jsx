import React from 'react'
import Restaurant from './Restaurant'

function RestauarantContainer() {
  return (
    <section className='lg:flex md:flex gap-5'>
        <div className=' lg:flex-7 md:flex-7 grid lg:grid-cols-3  md:grid-cols-2  grid-cols-2 lg:gap-x-5 gap-x-5 gap-y-10 bg-gray-100 p-5 rounded-md'>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
            <Restaurant/>
        </div>
        <div className=' hidden lg:flex-3 md:flex-3 lg:flex md:flex flex-col gap-5 items-center bg-gray-100 py-10 rounded-md'>
        <Restaurant/>
        <Restaurant/>

        </div>
    </section>
  )
}

export default RestauarantContainer