// src/store/reducers/index.js

import { combineReducers } from 'redux';
import searchReducer from './searchData';


const rootReducer = combineReducers({
  search: searchReducer
});

export default rootReducer;
