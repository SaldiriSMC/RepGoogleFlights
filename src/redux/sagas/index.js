// sagas/index.js
import { all } from 'redux-saga/effects';
import apiSaga from './apiSaga'; // Import your API saga

export default function* rootSaga() {
  yield all([
    apiSaga(), // Add your API saga here
    // Add other sagas here
  ]);
}
