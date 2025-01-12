// reducers/index.js
import { combineReducers } from 'redux';
import apiReducer from './apiReducer'; // Example reducer for handling API calls

const rootReducer = combineReducers({
  api: apiReducer,
  // Add other reducers here
});

export default rootReducer;
