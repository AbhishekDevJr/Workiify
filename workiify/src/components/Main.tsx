import React from 'react'
import Header from './Header/Header'
import './main.scss';
import Sidebar from './Sidebar/Sidebar';
import MainSection from './MainSection/MainSection';

function Main() {
  return (
    <div className='container-main-component'>
      <Header />
      <div className='container-section'>
        <Sidebar />
        <MainSection />
      </div>
    </div>
  )
}

export default Main