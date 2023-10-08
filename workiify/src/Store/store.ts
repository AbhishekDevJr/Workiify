import { configureStore } from "@reduxjs/toolkit";
import mainRenderSlice from "../Features/mainRenderSlice";

export const store = configureStore({
    reducer: {
        mainRender: mainRenderSlice,
    },
});