import userSlice from "./slices/user/userSlice";
import {configureStore} from "@reduxjs/toolkit";
import { api } from "../App/utils/Api";
import productSlice from "./products/productSlice";

const store = configureStore({
    reducer: {
        user:userSlice,
        products: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: api
        }
    })
});

export default store;