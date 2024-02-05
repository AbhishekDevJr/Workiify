import React from 'react'
import './mainsection.scss';
import { useSelector } from 'react-redux';

function MainSection() {
  const mainRender = useSelector((state: any) => state.mainRender);
  const mainViewBy = useSelector((state: any) => state.mainView);
  const todoList = useSelector((state: any) => state.todoList.formData);

  console.log('state--->', mainRender, mainViewBy, todoList);
  return (
    <div className='container-main-section'>
      {mainViewBy.byHome ? (mainRender.byToday ? <div>{todoList.map((item: any) => <><p>{item.title}</p></>)}</div> : <div>{todoList.map((item: any) => <><p>{item.title}</p></>)}</div>) : (null)}

      {mainViewBy.byProject ? (<div>Project Section View</div>) : (null)}

      {mainViewBy.byNote ? (<div>Note Section View</div>) : (null)}
    </div>
  )
}

export default MainSection