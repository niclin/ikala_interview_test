import axios from 'axios';
import dayjs from 'dayjs';

export const FETCH_AVAILABLE_SEATS_REQUEST = 'FETCH_AVAILABLE_SEATS_REQUEST';
export const FETCH_AVAILABLE_SEATS_FAILURE = 'FETCH_AVAILABLE_SEATS_FAILURE';
export const FETCH_AVAILABLE_SEATS_SUCCESS = 'FETCH_AVAILABLE_SEATS_SUCCESS';

const fetchRequest = (params) => ({
  type: FETCH_AVAILABLE_SEATS_REQUEST,
  params,
});

const fetchFailure = (error = '取得尚有座位列車資料時，發生錯誤！') => ({
  type: FETCH_AVAILABLE_SEATS_FAILURE,
  error,
});

const fetchSuccess = (data) => ({
  type: FETCH_AVAILABLE_SEATS_SUCCESS,
  data
});

export const fetchAvailableSeats = ({originStationID, destinationStationID}) => {
  return (dispatch) => {
    dispatch(fetchRequest({originStationID, destinationStationID}));

    const data = {
      availableSeats: null,
      price: null,
      schedule: null,
    };

    return axios.get(`https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatusList/${originStationID}?$format=JSON`)
      .then(
        response => {
          data.availableSeats = response.data;
          return axios.get(`https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${originStationID}/to/${destinationStationID}?$format=JSON`);
        }
      )
      .then(
        response => {
          data.price = response.data;
          const trainDate = dayjs().format('YYYY-MM-DD');
          return axios.get(`https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${originStationID}/to/${destinationStationID}/${trainDate}?$format=JSON`);
        }
      )
      .then(
        response => {
          data.schedule = response.data;
          dispatch(fetchSuccess(data));
        }
      )
      .catch(() => {
        dispatch(fetchFailure())
      })
  }
}
