import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    byToday: true,
    byWeek: false
}

export const mainRenderSlice = createSlice({
    name: 'mainRender',
    initialState: initialState,
    reducers: {
        today: (state) => {
            state.byToday = true;
            state.byWeek = false;
        },
        week: (state) => {
            state.byToday = false;
            state.byWeek = true;
        }
    }
});

export const { today, week } = mainRenderSlice.actions;

export default mainRenderSlice.reducer;