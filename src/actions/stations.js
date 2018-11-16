import Api from '../helpers/api'

export const FETCH_STATIONS_REQUEST = 'FETCH_STATIONS_REQUEST';
export const FETCH_STATIONS_FAILURE = 'FETCH_STATIONS_FAILURE';
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';

const fetchRequest = () => ({
  type: FETCH_STATIONS_REQUEST
});

const fetchFailure = (error = '取得車站基本資料時，發生錯誤！') => ({
  type: FETCH_STATIONS_FAILURE,
  error,
});

const fetchSuccess = (list) => ({
  type: FETCH_STATIONS_SUCCESS,
  list
});

export const fetchStations = () => {
  return (dispatch) => {
    dispatch(fetchRequest());

    return Api.getAllStations()
      .then(
        response => {
          dispatch(fetchSuccess(response.data));
        },
        error => {
          dispatch(fetchFailure());
        }
      )
  }
}
