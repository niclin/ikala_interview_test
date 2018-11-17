import { connect } from 'react-redux';
import ScheduleList from '../../components/ScheduleList';

const mapStateToProps = (state) => ({
  stations: state.stations,
  price: state.price,
  schedule: state.schedule
});

export default connect(
  mapStateToProps,
  null
)(ScheduleList);
