import React, { useState } from 'react'
import './ProjectList.scss';
import { Button, DatePicker, DatePickerProps, Input, Modal, Radio, RadioChangeEvent } from 'antd';
import moment from 'moment';

interface ProjectItem {
    title: string
    desc: string,
    dueDate: string,
    priority: string
}
interface ProjectListProps {
    projectData: ProjectItem;
}

const { TextArea } = Input;

const ProjectList: React.FC<ProjectListProps> = ({ projectData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedFormData, setEditedFormData] = useState<ProjectItem>({
        title: '',
        desc: '',
        dueDate: '',
        priority: ''
    });

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditOk = () => {
        setIsEditModalOpen(false);
        // dispatch(updateTodo({ index: editIndex, editedTodo: editedFormData }));
    };

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

    return (
        <div className='container-projectlist'>
            <div className='project-item-card'>

                <div className='card-top'>
                    <p>{projectData.title}</p>
                    <Button>X</Button>
                </div>

                <div className='card-middle'>
                    <p>{projectData.desc}</p>
                </div>

                <div className='card-bottom'>
                    <p>{projectData.dueDate}</p>
                    <p>{projectData.priority}</p>
                    <Button onClick={() => setIsModalOpen(true)}>View</Button>
                    <Button onClick={() => setIsEditModalOpen(true)}>Edit</Button>
                </div>
            </div>

            <Modal
                title=""
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <div className='container-modal-info'>
                    <h1>{projectData.title}</h1>
                    <div className='contents-modal'>
                        <div className='contenst-left'>
                            <p>Title:</p>
                            <p>Description:</p>
                            <p>Due Date:</p>
                            <p>Priority:</p>
                        </div>

                        <div className='contents-right'>
                            <p>{projectData.title}</p>
                            <p>{projectData.desc}</p>
                            <p>{moment(projectData.dueDate).format('Do MMMM YYYY')}</p>
                            <p>{projectData.priority}</p>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                title=""
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleCancel}
                centered
            >
                <div className='container-modal-info'>
                    <h1>{editedFormData.title}</h1>
                    <div className='contents-modal'>
                        <div className='contenst-left'>
                            <p>Title:</p>
                            <p>Description:</p>
                            <p>Due Date:</p>
                            <p>Priority:</p>
                        </div>

                        <div className='contents-right'>
                            <Input placeholder="" onChange={handleEditTitle} required defaultValue={editedFormData.title} value={editedFormData.title} />
                            <TextArea placeholder="" autoSize onChange={handleEditDesc} required defaultValue={editedFormData.desc} value={editedFormData.desc} />
                            <DatePicker placeholder='DD/MM/YYYY' onChange={handleEditDate} />
                            <Radio.Group defaultValue={editedFormData.priority} buttonStyle="solid" onChange={handleEditRadio} value={editedFormData.priority}>
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

export default ProjectList;