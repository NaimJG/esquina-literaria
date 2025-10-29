// import React from 'react'
import './Home.css'
import SwiperComponent from '../../components/SwiperComponent/SwiperComponent'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'

function Home() {
  const location = useLocation()
  const navState = (location.state as { showLogin?: boolean; showRegister?: boolean } | null) ?? null
  const showLogin = !!navState?.showLogin
  const showRegister = !!navState?.showRegister
  console.log({ showLogin, showRegister })

  return (
    <>
      <div className='homeContainer'>
        <div className='homeContent'>
          <div className='homeSectionTop'>
            <section className='homeSectionTopLeft'>
              <img className='homeImg' alt='homeImg' src='/img/ilustracion-chica-leyendo.jpg'></img>
            </section>
            <section className="homeSectionTopRight">
              {showLogin ? (
                <Login />
              ) : showRegister ? (
                <SignUp />
              ) : (
              <> 
              <div className='authHomeContainer'>
                <h1>Bienvenido a la Esquina Literaria, el lugar donde converge la literatura.</h1>
                <br></br>
                <div className='authHomeContent'>
                  <div className='authHomeText'>
                    <h2>Comparte tus reseñas con el mundo y debate sobre tus libros favoritos</h2>
                  </div>
                  <div className='buttonsContainer'>
                    <Link to="/home" className='loginGuestButton'>
                      Ingresar como invitado
                    </Link>
                  </div>
                </div>
              </div>
              <div className='topSwiper'>
                <h3>Lo más leído de la semana</h3>
                <SwiperComponent></SwiperComponent>
              </div>
              </>)}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home