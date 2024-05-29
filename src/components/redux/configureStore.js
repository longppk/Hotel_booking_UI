// src/store/index.js
import { createSlice, configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
})

export default store;
