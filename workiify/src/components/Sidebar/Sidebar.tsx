import React, { useState } from 'react'
import './sidebar.scss';
import { today, week } from '../../Features/mainRenderSlice';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';

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

                <Modal title="Basic Modal" open={isModalOpen} onCancel={handleModalClose}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </div>
    )
}

export default Sidebar