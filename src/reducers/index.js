import { combineReducers } from  'redux';
import navigation from './navigation';
import stations from './stations';
import schedule from './schedule';
import price from './price';

export default combineReducers({
  navigation,
  stations,
  schedule,
  price,
});
