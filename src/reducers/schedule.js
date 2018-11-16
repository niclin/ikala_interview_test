import {
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_FAILURE,
  FETCH_SCHEDULE_SUCCESS
} from '../actions/schedule';

const defaultState = {
  isFetching: false,
  data: null,
  error: null,
}

const schedule = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null
      }
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      }
    case FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default schedule;
