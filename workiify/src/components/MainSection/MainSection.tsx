import React from 'react'
import './mainsection.scss';
import { useSelector } from 'react-redux';

function MainSection() {
  const mainRender = useSelector((state: any) => state.mainRender);
  console.log('state--->', mainRender);
  return (
    <div className='container-main-section'>
      {mainRender.byToday ? (<div>Main Section By Today</div>) : (<div>Main Section By Week</div>)}
    </div>
  )
}

export default MainSection