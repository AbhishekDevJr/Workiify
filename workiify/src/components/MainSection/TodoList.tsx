import React, { useState } from 'react'
import './todolist.scss';
import { Button, Checkbox, DatePicker, Input, Modal, Radio } from 'antd';
import type { CheckboxProps } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, addTodo } from '../../Features/createTodoSlice';
import type { DatePickerProps } from 'antd';
import type { RadioChangeEvent } from 'antd';

interface TodoItem {
    title: string
    desc: string,
    dueDate: string,
    priority: string
}
interface TodoListProps {
    data: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ data }) => {
    const dispatch = useDispatch();
    const { TextArea } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalItemData, setModalItemData] = useState<TodoItem>(data[0]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedFormData, setEditedFormData] = useState<TodoItem>({
        title: '',
        desc: '',
        dueDate: '',
        priority: ''
    });

    const handleOk = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleDetails = (index: number) => {
        console.log('index----------->', index);
        setModalItemData(data[index]);
        setIsModalOpen(true);
    }

    const handleCheck: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleDelete = (index: number) => {
        dispatch(removeTodo(index));
    }

    const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedFormData({ ...editedFormData, title: e.target.value });
    }

    const handleEditDesc = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setEditedFormData({ ...editedFormData, desc: e.target.value });
    }

    const handleEditDate: DatePickerProps['onChange'] = (date, dateString) => {
        setEditedFormData({ ...editedFormData, dueDate: String(dateString) });
    }

    const handleEditRadio = (e: RadioChangeEvent) => {
        setEditedFormData({ ...editedFormData, priority: e.target.value });
    }

    console.log('modalItemData--------->', modalItemData);

    return (
        <div className='container-todolist'>
            {data.map((item: TodoItem, index) => (
                <div className='container-list'>
                    <div className='task-info-left'>
                        <div className='priority-strip' style={{ borderRight: item.priority === 'LOW' ? '3px solid green' : item.priority === 'MEDIUM' ? '3px solid orange' : '3px solid red' }}></div>
                        <Checkbox onChange={handleCheck} className='todo-check' />
                        <p>{item.title}</p>
                    </div>

                    <div className='task-info-right'>
                        <Button className='todo-details' onClick={() => handleDetails(index)}>DETAILS</Button>
                        <p>{moment(item.dueDate).format('Do MMMM YYYY')}</p>
                        <Button className='btn-remove' onClick = {() => setIsEditModalOpen(true)}>
                            <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title />
                                <g id="Complete">
                                    <g id="edit">
                                        <g>
                                            <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#501f3a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#501f3a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        </g>
                                    </g>
                                </g>
                            </svg></Button>
                        <Button className='btn-remove' onClick={() => handleDelete(index)}>
                            <svg width="18px" height="18px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#501f3a" /><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#501f3a" /></svg>
                        </Button>
                    </div>
                </div>
            ))}

            <Modal
                title=""
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <div className='container-modal-info'>
                    <h1>{modalItemData.title}</h1>
                    <div className='contents-modal'>
                        <div className='contenst-left'>
                            <p>Title:</p>
                            <p>Description:</p>
                            <p>Due Date:</p>
                            <p>Priority:</p>
                        </div>

                        <div className='contents-right'>
                            <p>{modalItemData.title}</p>
                            <p>{modalItemData.desc}</p>
                            <p>{moment(modalItemData.dueDate).format('Do MMMM YYYY')}</p>
                            <p>{modalItemData.priority}</p>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                title=""
                open={isEditModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <div className='container-modal-info'>
                    <h1>{modalItemData.title}</h1>
                    <div className='contents-modal'>
                        <div className='contenst-left'>
                            <p>Title:</p>
                            <p>Description:</p>
                            <p>Due Date:</p>
                            <p>Priority:</p>
                        </div>

                        <div className='contents-right'>
                            <Input placeholder="" onChange={handleEditTitle} required defaultValue={modalItemData.title} value={editedFormData.title} />
                            <TextArea placeholder="Details: e.g Internet, Phone, Rent" autoSize onChange={handleEditDesc} required defaultValue={modalItemData.desc} value={editedFormData.dueDate} />
                            <DatePicker placeholder='DD/MM/YYYY' onChange={handleEditDate} />
                            <Radio.Group defaultValue={modalItemData.priority} buttonStyle="solid" onChange={handleEditRadio} value={editedFormData.priority}>
                                <Radio.Button value="LOW">LOW</Radio.Button>
                                <Radio.Button value="MEDIUM">MEDIUM</Radio.Button>
                                <Radio.Button value="HIGH">HIGH</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TodoList;