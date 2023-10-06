import React from 'react'
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import RestauarantContainer from '../components/RestauarantContainer'

function HomePage() {
  return (
    <section>
        <div>
            <Navbar/>
            <Filter/>
            <RestauarantContainer/>
        </div>
    </section>
  )
}

export default HomePage