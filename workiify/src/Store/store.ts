import { configureStore } from "@reduxjs/toolkit";
import mainRenderSlice from "../Features/mainRenderSlice";
import modalRenderSlice from "../Features/modalRenderSlice";
import projectRenderSlice from "../Features/projectRenderSlice";
import createTodoSlice from "../Features/createTodoSlice";
import createProjectSlice from "../Features/createProjectSlice";

export const store = configureStore({
    reducer: {
        mainRender: mainRenderSlice,
        modalRender: modalRenderSlice,
        mainView: projectRenderSlice,
        todoList: createTodoSlice,
        projectList: createProjectSlice,
    },
});