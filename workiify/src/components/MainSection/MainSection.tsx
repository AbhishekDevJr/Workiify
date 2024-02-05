import React from 'react'
import './mainsection.scss';
import { useSelector } from 'react-redux';

function MainSection() {
  const mainRender = useSelector((state: any) => state.mainRender);
  const mainViewBy = useSelector((state: any) => state.mainView)

  console.log('state--->', mainRender, mainViewBy);
  return (
    <div className='container-main-section'>
      {mainViewBy.byHome ? (mainRender.byToday ? <div>Main Section By Today</div> : <div>Main Section By Week</div>) : (null)}

      {mainViewBy.byProject ? (<div>Project Section View</div>) : (null)}

      {mainViewBy.byNote ? (<div>Note Section View</div>) : (null)}
    </div>
  )
}

export default MainSection