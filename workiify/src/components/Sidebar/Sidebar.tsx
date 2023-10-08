import React from 'react'
import './sidebar.scss';
import { today, week } from '../../Features/mainRenderSlice';
import { useDispatch } from 'react-redux';

function Sidebar() {
    const dispatch = useDispatch();

    const handleSidebarTop = (e: React.MouseEvent<HTMLLIElement>): void => {
        console.log(e.currentTarget.textContent);
        e.currentTarget.textContent === 'Today' ? (dispatch(today())) : (dispatch(week()));
    }

    return (
        <div className='container-sidebar'>
            <div className='top-sidebar'>
                <strong>
                    <p>Home</p>
                </strong>
                <ul>
                    <li onClick={handleSidebarTop}>Today</li>
                    <li onClick={handleSidebarTop}>Week</li>
                </ul>
            </div>

            <div className='bottom-sidebar'>
                <strong>
                    <p>Projects</p>
                </strong>
                <ul>
                    <li>Example Project</li>
                    <li>Example Project</li>
                    <li>Example Project</li>
                    <li>Example Project</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar