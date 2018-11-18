import {
  FETCH_AVAILABLE_SEATS_REQUEST,
  FETCH_AVAILABLE_SEATS_FAILURE,
  FETCH_AVAILABLE_SEATS_SUCCESS
} from '../actions/availableSeats';

const defaultState = {
  isFetching: false,
  params: null,
  data: null,
  error: null,
}

const availableSeats = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_SEATS_REQUEST:
      return {
        ...state,
        isFetching: true,
        params: action.params,
        data: null,
        error: null,
      }
    case FETCH_AVAILABLE_SEATS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      }
    case FETCH_AVAILABLE_SEATS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default availableSeats;
