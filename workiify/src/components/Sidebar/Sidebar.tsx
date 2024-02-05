import React, { useState } from 'react'
import './sidebar.scss';
import { today, week } from '../../Features/mainRenderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { byTodo, byNote, byProject } from '../../Features/modalRenderSlice';
import { byHomeView, byNoteView, byProjectView } from '../../Features/projectRenderSlice';
import { Input, DatePicker, Radio } from 'antd';

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
    const modalState = useSelector((state: any) => (state));
    console.log('Modal State-->', modalState);
    const { TextArea } = Input;
    const [titleStatus, setTitleStatus] = useState<Boolean>(false);
    const [descState, setDescStatus] = useState<Boolean>(false);


    const handleSidebarTop = (e: React.MouseEvent<HTMLLIElement>): void => {
        console.log(e.currentTarget.textContent);
        dispatch(byHomeView());
        e.currentTarget.textContent === 'Today' ? (dispatch(today())) : (dispatch(week()));
    }

    const handleProjectSelection = (): void => {
        dispatch(byProjectView());
    }

    const handleNoteSelection = (): void => {
        dispatch(byNoteView());
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
        else if (e.currentTarget.textContent === 'Add Note') {
            dispatch(byNote());
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!/^[a-zA-Z0-9]+$/.test(e.target.value)) {
            setTitleStatus(false);
        }
        else {
            setTitleStatus(true);
        }
    }

    const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (!/^[a-zA-Z0-9]+$/.test(e.target.value)) {
            setDescStatus(false);
        }
        else {
            setDescStatus(true);
        }
    }

    const handleDate = () => {}

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
                    {dummyProjects.map((item) => <li onClick={handleProjectSelection}>{item.name}</li>)}
                </ul>
            </div>

            <div className='bottom-notes-container'>
                <p>Notes</p>
                <ul>
                    {dummyNotes.map((item) => <li onClick={handleNoteSelection}>{item.name}</li>)}
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
                                {modalState?.modalRender?.byTodo &&
                                    (<div className='container-add-todo'>
                                        <div className='todo-top'>
                                            <Input placeholder="Title: Pay Bills" onChange={handleTitle} />
                                            <TextArea placeholder="Details: e.g Internet, Phone, Rent" autoSize onChange={handleDesc} />
                                        </div>

                                        <div className='todo-bottom'>
                                            <div>
                                                <p>Due Date:</p> <DatePicker placeholder='DD/MM/YYYY' onChange = {handleDate} />
                                            </div>

                                            <div>
                                                <p>Priority:</p>
                                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                                    <Radio.Button value="a">LOW</Radio.Button>
                                                    <Radio.Button value="b">MEDIUM</Radio.Button>
                                                    <Radio.Button value="c">HIGH</Radio.Button>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                    </div>)}

                                {modalState?.modalRender?.byProject && (
                                    <div className='container-add-project'>
                                        Add Project Details
                                    </div>
                                )}

                                {modalState?.modalRender?.byNote && (
                                    <div className='container-add-note'>
                                        Add Note Details
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Sidebar