import {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_FAILURE,
  FETCH_PRICE_SUCCESS
} from '../actions/price';

const defaultState = {
  isFetching: false,
  data: null,
  error: null,
}

const price = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null
      }
    case FETCH_PRICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      }
    case FETCH_PRICE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default price;
