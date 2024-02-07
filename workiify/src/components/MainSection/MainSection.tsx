import React from 'react'
import './mainsection.scss';
import { useSelector } from 'react-redux';
import { Empty } from 'antd';
import TodoList from './TodoList';

function MainSection() {
  const mainRender = useSelector((state: any) => state.mainRender);
  const mainViewBy = useSelector((state: any) => state.mainView);
  const todoList = useSelector((state: any) => state.todoList.formData);

  return (
    <div className='container-main-section'>
      {mainViewBy.byHome ? (mainRender.byToday ?
        todoList.length ?
          <TodoList data={todoList} />
          :
          <Empty description='No Data Found' />
        :
        todoList.length ?
          <TodoList data={todoList} />
          :
          <Empty description='No Data Found' />) : (null)}

      {mainViewBy.byProject ? (<div>Project Section View</div>) : (null)}

      {mainViewBy.byNote ? (<div>Note Section View</div>) : (null)}
    </div>
  )
}

export default MainSection