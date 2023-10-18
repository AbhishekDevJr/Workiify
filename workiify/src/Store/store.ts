import { configureStore } from "@reduxjs/toolkit";
import mainRenderSlice from "../Features/mainRenderSlice";
import modalRenderSlice from "../Features/modalRenderSlice";

export const store = configureStore({
    reducer: {
        mainRender: mainRenderSlice,
        modalRender: modalRenderSlice,
    },
});