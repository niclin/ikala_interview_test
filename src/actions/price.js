import Api from '../helpers/api'

export const FETCH_PRICE_REQUEST = 'FETCH_PRICE_REQUEST';
export const FETCH_PRICE_FAILURE = 'FETCH_PRICE_FAILURE';
export const FETCH_PRICE_SUCCESS = 'FETCH_PRICE_SUCCESS';

const fetchRequest = () => ({
  type: FETCH_PRICE_REQUEST
});

const fetchFailure = (error = '取得票價資料時，發生錯誤！') => ({
  type: FETCH_PRICE_FAILURE,
  error,
});

const fetchSuccess = (data) => ({
  type: FETCH_PRICE_SUCCESS,
  data
});

export const fetchPrice = ({originStationID, destinationStationID}) => {
  return (dispatch) => {
    dispatch(fetchRequest());

    return Api.getStationPrice(originStationID, destinationStationID)
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
