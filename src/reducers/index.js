import { combineReducers } from  'redux';
import navigation from '../reducers/navigation';
import stations from '../reducers/stations';

export default combineReducers({
  navigation,
  stations
});
