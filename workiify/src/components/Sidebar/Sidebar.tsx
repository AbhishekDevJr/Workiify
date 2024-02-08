import React, { useState } from 'react'
import './sidebar.scss';
import { today, week } from '../../Features/mainRenderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { byTodo, byNote, byProject } from '../../Features/modalRenderSlice';
import { byHomeView, byNoteView, byProjectView } from '../../Features/projectRenderSlice';
import { Input, DatePicker, Radio } from 'antd';
import type { DatePickerProps } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { addTodo } from '../../Features/createTodoSlice';
import { createProject, selectedProject } from '../../Features/createProjectSlice';

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
    const { TextArea } = Input;
    const [titleStatus, setTitleStatus] = useState<Boolean>(false);
    const [descStatus, setDescStatus] = useState<Boolean>(false);
    const [dateStatus, setDateStatus] = useState<Boolean>(false);
    const [radioStatus, setRadioStatus] = useState<Boolean>(true);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        dueDate: '',
        priority: 'LOW' as string | string[]
    });
    const [currentType, setCurrentType] = useState<String>('TODO');
    const projectData = useSelector((state: any) => state.projectList.projectData);

    console.log('projectData ---------->', projectData);


    const handleSidebarTop = (e: React.MouseEvent<HTMLLIElement>): void => {
        dispatch(byHomeView());
        e.currentTarget.textContent === 'Today' ? (dispatch(today())) : (dispatch(week()));
    }

    const handleProjectSelection = (index: number): void => {
        console.log('projectData[index]------------>', projectData[index]);
        dispatch(byProjectView());
        dispatch(selectedProject(projectData[index]));
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
        console.log('ModalAdd----------->', e.currentTarget.textContent);
        if (e.currentTarget.textContent === 'Add To Do') {
            setCurrentType('TODO');
            dispatch(byTodo());
        }
        else if (e.currentTarget.textContent === 'Add Project') {
            setCurrentType('PROJECT');
            dispatch(byProject());
        }
        else if (e.currentTarget.textContent === 'Add Note') {
            setCurrentType('NOTE');
            dispatch(byNote());
        }
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!/^[\w\-\s]+$/.test(e.target.value)) {
            setTitleStatus(false);
            setFormData({ ...formData, title: '' });
        }
        else {
            setTitleStatus(true);
            setFormData({ ...formData, title: e.target.value });
        }
    }

    const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (/^[\w\-\s]+$/.test(e.target.value)) {
            setDescStatus(true);
            setFormData({ ...formData, desc: e.target.value });
        }
        else {
            setDescStatus(false);
            setFormData({ ...formData, desc: '' });
        }
    }

    const handleDate: DatePickerProps['onChange'] = (date, dateString) => {
        if (dateString) {
            setDateStatus(true);
            setFormData({ ...formData, dueDate: String(dateString) });
        }
        else {
            setDateStatus(false);
            setFormData({ ...formData, dueDate: '' });
        }
    }

    const handleRadio = (e: RadioChangeEvent) => {
        if (e.target.value) {
            setRadioStatus(true);
            setFormData({ ...formData, priority: e.target.value });
        }
        else {
            setRadioStatus(false);
            setFormData({ ...formData, priority: '' });
        }
    }

    const handleSubmit = () => {
        console.log('FormData------->', formData, currentType);
        if (titleStatus && descStatus && dateStatus && radioStatus) {
            //Submit Form
            if (currentType === 'TODO') {
                dispatch(addTodo(formData));
            } else if (currentType === 'PROJECT') {
                console.log('Dispatch Form Data--------->', formData);
                dispatch(createProject(formData));
            }
            // else {
            //     dispatch(addNote(formData));
            // }

            setIsModalOpen(false);
            setFormData({
                title: '',
                desc: '',
                dueDate: '',
                priority: 'LOW'
            });

            setTitleStatus(false);
            setDescStatus(false);
            setDateStatus(false);
        }
        else {
            alert('Please fill valid data.');
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
                    {projectData.map((item: any, index: number) => <li onClick={() => handleProjectSelection(index)}>{item.title}</li>)}
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

                <Modal title="" open={isModalOpen} onCancel={handleModalClose} onOk={handleSubmit}>
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
                                            <Input placeholder="Title: Pay Bills" onChange={handleTitle} required value={formData.title} />
                                            <TextArea placeholder="Details: e.g Internet, Phone, Rent" autoSize onChange={handleDesc} required value={formData.desc} />
                                        </div>

                                        <div className='todo-bottom'>
                                            <div>
                                                <p>Due Date:</p> <DatePicker placeholder='DD/MM/YYYY' onChange={handleDate} />
                                            </div>

                                            <div>
                                                <p>Priority:</p>
                                                <Radio.Group defaultValue="LOW" buttonStyle="solid" onChange={handleRadio} value={formData.priority}>
                                                    <Radio.Button value="LOW">LOW</Radio.Button>
                                                    <Radio.Button value="MEDIUM">MEDIUM</Radio.Button>
                                                    <Radio.Button value="HIGH">HIGH</Radio.Button>
                                                </Radio.Group>
                                            </div>
                                        </div>
                                    </div>)}

                                {modalState?.modalRender?.byProject && (<div className='container-add-todo container-add-projects'>
                                    <div className='todo-top project-top'>
                                        <Input placeholder="Title: Project Title" onChange={handleTitle} required value={formData.title} />
                                        <TextArea placeholder="Details: Project Details" autoSize onChange={handleDesc} required value={formData.desc} />
                                    </div>

                                    <div className='todo-bottom project-bottom'>
                                        <div>
                                            <p>Due Date:</p> <DatePicker placeholder='DD/MM/YYYY' onChange={handleDate} />
                                        </div>

                                        <div>
                                            <p>Priority:</p>
                                            <Radio.Group defaultValue="LOW" buttonStyle="solid" onChange={handleRadio} value={formData.priority}>
                                                <Radio.Button value="LOW">LOW</Radio.Button>
                                                <Radio.Button value="MEDIUM">MEDIUM</Radio.Button>
                                                <Radio.Button value="HIGH">HIGH</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                </div>)}

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