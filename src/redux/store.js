// store.js
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Root reducer
import rootSaga from './sagas'; // Root saga

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with the middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
