import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    byTodo: true,
    byProject: false,
    byNote: false,
}

const modalRenderSlice = createSlice({
    name: 'ModalRender',
    initialState: initialState,
    reducers: {
        byTodo: (state) => {
            return ({ ...state, byTodo: true, byProject: false, byNote: false });
        },

        byProject: (state) => {
            return ({ ...state, byTodo: false, byProject: true, byNote: false });
        },

        byNote: (state) => {
            return ({ ...state, byTodo: false, byProject: false, byNote: true });
        }
    }
});

export const { byTodo, byProject, byNote } = modalRenderSlice.actions;

export default modalRenderSlice.reducer;