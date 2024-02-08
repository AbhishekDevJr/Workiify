import { createSlice } from "@reduxjs/toolkit";

interface Project {
    title: string,
    desc: string,
    dueDate: string,
    priority: string
}

interface CreateProjectState {
    projectData: Project[];
    selectedProject: any
}

const initialState: CreateProjectState = {
    projectData: [],
    selectedProject: {},
};

export const createProjectSlice = createSlice({
    name: 'createProject',
    initialState: initialState,
    reducers: {
        createProject: (state, action) => {
            state.projectData.push(action.payload)
        },
        selectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
    }
});

export const { createProject, selectedProject } = createProjectSlice.actions;

export default createProjectSlice.reducer;