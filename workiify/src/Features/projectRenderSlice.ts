import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byHome: true,
    byProject: false,
    byNote: false,
};

export const mainViewSlice = createSlice({
    name: 'mainView',
    initialState: initialState,
    reducers: {
        byHomeView: (state) => {
            state.byHome = true;
            state.byProject = false;
            state.byNote = false;
        },
        byProjectView: (state) => {
            state.byHome = false;
            state.byProject = true;
            state.byNote = false;
        },
        byNoteView: (state) => {
            state.byHome = false;
            state.byProject = false;
            state.byNote = true;
        }
    }
});

export const { byHomeView, byProjectView, byNoteView } = mainViewSlice.actions;

export default mainViewSlice.reducer;