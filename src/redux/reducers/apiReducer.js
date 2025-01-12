// reducers/apiReducer.js
const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const apiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'API_CALL_REQUEST':
        return { ...state, loading: true, error: null };
      case 'API_CALL_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'API_CALL_FAILURE':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  
  export default apiReducer;
  