// sagas/apiSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// API call
const fetchData = () => axios.get('https://jsonplaceholder.typicode.com/posts');

// Worker saga: will be fired on API_CALL_REQUEST actions
function* fetchApiData() {
  try {
    const response = yield call(fetchData);
    yield put({ type: 'API_CALL_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}

// Watcher saga: watches for actions dispatched to the store, starts worker saga
function* apiSaga() {
  yield takeLatest('API_CALL_REQUEST', fetchApiData);
}

export default apiSaga;
