import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    title: string,
    desc: string,
    dueDate: string,
    priority: string
}

interface CreateTodoState {
    formData: Todo[];
}

const initialState: CreateTodoState = {
    formData: [],
};

export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            state.formData.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.formData = state.formData.filter((item, index) => index !== action.payload);
        }
    }
});

export const { addTodo, removeTodo } = createTodoSlice.actions;

export default createTodoSlice.reducer;