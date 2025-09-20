import React from 'react'
import './Catalogue.css'
import SwiperComponent from '../../components/SwiperComponent/SwiperComponent'

function Catalogue() {
  return (
    <>
      <section className='catalogueContainer'>
        <div className='swiper-section'> {/* <-- Usas la clase común */}
          <h2>Tendencia</h2>
          <SwiperComponent></SwiperComponent>
        </div>
        <div className='swiper-section'> {/* <-- Y la reutilizas */}
          <h2>Los mejores valorados</h2>
          <SwiperComponent></SwiperComponent>
        </div>
      </section>
    </>
  )
}

export default Catalogue