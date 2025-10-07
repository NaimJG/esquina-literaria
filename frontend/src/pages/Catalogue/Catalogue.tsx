import React from 'react'
import './Catalogue.css'
import Rank from '../../components/Rank/Rank'

function Catalogue() {
  return (
    <>
      <section className='catalogueContainer'>
        <aside className='catalogueAside'></aside>
        <section className='catalogueMain'>
          <Rank />
        </section>
        <aside className='asideComments'></aside>
      </section>
    </>
  )
}

export default Catalogue