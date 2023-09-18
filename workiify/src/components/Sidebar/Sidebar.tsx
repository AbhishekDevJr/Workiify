import React, { ReactEventHandler } from 'react'
import './sidebar.scss';

function Sidebar() {

    const handleSidebarTop = (e :React.MouseEvent<HTMLLIElement>) : void => {
        console.log((e.target as HTMLInputElement).textContent);
    }

    return (
        <div className='container-sidebar'>
            <div className='top-sidebar'>
                <strong>
                    <p>Home</p>
                </strong>
                <ul>
                    <li onClick = {handleSidebarTop}>Today</li>
                    <li onClick = {handleSidebarTop}>Week</li>
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