import React, { useState } from 'react'
import './sidebar.scss';
import { today, week } from '../../Features/mainRenderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { byTodo, byNote, byProject } from '../../Features/modalRenderSlice';

type dataDummy = {
    name: string,
    desc: string
};

const dummyProjects: dataDummy[] = [
    {
        name: 'Project 1',
        desc: ''
    },
    {
        name: 'Project 2',
        desc: ''
    },
    {
        name: 'Project 3',
        desc: ''
    }
];

const dummyNotes: dataDummy[] = [
    {
        name: 'Note 1',
        desc: ''
    },
    {
        name: 'Note 2',
        desc: ''
    },
    {
        name: 'Note 3',
        desc: ''
    }
];

function Sidebar() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalState = useSelector((state) => (state));
    console.log('Modal State-->', modalState);

    const handleSidebarTop = (e: React.MouseEvent<HTMLLIElement>): void => {
        console.log(e.currentTarget.textContent);
        e.currentTarget.textContent === 'Today' ? (dispatch(today())) : (dispatch(week()));
    }

    const handleModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleModalAdd = (e: React.MouseEvent<HTMLLIElement>): void => {
        console.log('Modal------>', e.currentTarget.textContent);
        if (e.currentTarget.textContent === 'Add To Do') {
            dispatch(byTodo());
        }
        else if (e.currentTarget.textContent === 'Add Project') {
            dispatch(byProject());
        }
        else if (e.currentTarget.textContent === 'Add Note'){
            dispatch(byNote());
        }
    }

    return (
        <div className='container-sidebar'>
            <div className='top-sidebar'>
                <p>Home</p>
                <ul>
                    <li onClick={handleSidebarTop}>Today</li>
                    <li onClick={handleSidebarTop}>Week</li>
                </ul>
            </div>

            <div className='bottom-sidebar'>
                <p>Projects</p>
                <ul>
                    {dummyProjects.map((item) => <li>{item.name}</li>)}
                </ul>
            </div>

            <div className='bottom-notes-container'>
                <p>Notes</p>
                <ul>
                    {dummyNotes.map((item) => <li>{item.name}</li>)}
                </ul>
            </div>

            <div className='container-addBtn'>
                <Button type="primary" onClick={handleModal}>
                    +
                </Button>

                <Modal title="" open={isModalOpen} onCancel={handleModalClose}>
                    <div className='container-modal'>
                        <header className='modal-header'>
                            <h1>Create a new...</h1>
                        </header>
                        <div className='modal-main'>
                            <div className='modal-main-left'>
                                <ul>
                                    <li onClick={handleModalAdd}>Add To Do</li>
                                    <li onClick={handleModalAdd}>Add Project</li>
                                    <li onClick={handleModalAdd}>Add Note</li>
                                </ul>
                            </div>
                            <div className='modal-main-right'>

                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Sidebar