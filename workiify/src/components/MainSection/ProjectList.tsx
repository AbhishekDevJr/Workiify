import React from 'react'

interface ProjectItem {
    title: string
    desc: string,
    dueDate: string,
    priority: string
}
interface ProjectListProps {
    projectData: ProjectItem;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData }) => {
    return (
        <div className='container-projectlist'>
            <p>{projectData.title}</p>
            <p>{projectData.desc}</p>
            <p>{projectData.dueDate}</p>
            <p>{projectData.priority}</p>
        </div>
    )
}

export default ProjectList;