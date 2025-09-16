import React from 'react'
import './Home.css'

function Home() {
  return (
    <>
      <h1>La Esquina Literaria</h1>
      <br></br>
      <h2>¡Nos alegra tenerte de vuelta!</h2>
      <div className='authHomeButtons'>
        <button className='signHome'>
          Registrarse
        </button>
        <button className='loginHome'>
          Ingresar
        </button>
      </div>
      <section className='homeSection'>
        <div className='leftSection'>
          <h3>Lo más leído de la semana</h3>
        </div>
        <div className='rightSection'>
          <h3>Los más vendidos</h3>
        </div>
      </section>
    </>
  )
}

export default Home