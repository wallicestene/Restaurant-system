import React from 'react'
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'

function HomePage() {
  return (
    <section>
        <div>
            <Navbar/>
            <Filter/>
        </div>
    </section>
  )
}

export default HomePage