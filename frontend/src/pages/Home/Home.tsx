// import React from 'react'
import './Home.css'
import SwiperComponent from '../../components/SwiperComponent/SwiperComponent'

function Home() {
  return (
    <>
      <div className='homeContainer'>
        <div className='homeSectionTop'>
          <section className='homeSectionTopLeft'>
            <img className='homeImg' alt='homeImg' src='/img/ilustracion-chica-leyendo.jpg'></img>
          </section>
          <section className="homeSectionTopRight">
            <h1>Bienvenido a la Esquina Literaria, el lugar donde converge la Literarura.</h1>
            <br></br>
            <div className='authHomeContainer'>
              <div className='authHomeText'>
                <h2>Comparte tus reseñas con el mundo y debate sobre tus libros favoritos</h2>
              </div>
              <div className='buttonsContainer'>
                <button className='loginGuestButton'>
                  Ingresar como invitado
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className='homeSectionBottom'>
          <div className='topSwiper'>
            <h3>Lo más leído de la semana</h3>
            <SwiperComponent></SwiperComponent>
          </div>
          <div className='bottomSwiper'>
            <h3>Los más vendidos</h3>
            <SwiperComponent></SwiperComponent>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home