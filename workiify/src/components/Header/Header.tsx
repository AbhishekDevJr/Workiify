import React from 'react'
import './header.scss';

function Header() {
  return (
    <header className = 'container-header'>
        <img src = {require('../../Assets/logo192.png')} alt = 'Logo' />
    </header>
  )
}

export default Header