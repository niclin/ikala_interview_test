import {
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_FAILURE,
  FETCH_STATIONS_SUCCESS
} from '../actions/stations';

const defaultState = {
  isFetching: false,
  list: [],
  error: null,
}

const stations = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_STATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        list: []
      }
    case FETCH_STATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.list.slice(0),
      }
    case FETCH_STATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default stations;
