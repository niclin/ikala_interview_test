import axios from 'axios';
import { fetchPrice } from './price';

export const FETCH_SCHEDULE_REQUEST = 'FETCH_SCHEDULE_REQUEST';
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE';
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';

const fetchRequest = (params) => ({
  type: FETCH_SCHEDULE_REQUEST,
  params,
});

const fetchFailure = (error = '取得列車時刻資料時，發生錯誤！') => ({
  type: FETCH_SCHEDULE_FAILURE,
  error,
});

const fetchSuccess = (data) => ({
  type: FETCH_SCHEDULE_SUCCESS,
  data
});

export const fetchSchedule = ({trainDate, originStationID, destinationStationID}) => {
  return (dispatch) => {
    dispatch(fetchRequest({trainDate, originStationID, destinationStationID}));

    return axios({
      method: 'get',
      url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${originStationID}/to/${destinationStationID}/${trainDate}?$format=JSON`
    })
      .then(
        response => {
          dispatch(fetchSuccess(response.data));
          dispatch(fetchPrice({originStationID, destinationStationID}));
        },
        error => {
          dispatch(fetchFailure());
        }
      )
  }
}
