import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { fetchSchedule } from '../../actions/schedule';
import SearchForm from '../../components/SearchForm';

const mapStateToProps = (state) => ({
  stations: state.stations,
  trainDate: state.schedule.params ? state.schedule.params.trainDate : dayjs().format('YYYY-MM-DD'),
  originStationID: state.schedule.params ? state.schedule.params.originStationID : '',
  destinationStationID: state.schedule.params ? state.schedule.params.destinationStationID : '',
  isSubmitable: state.stations.list.length > 0 && !state.schedule.isFetching
});

const mapDispatchToProps = dispatch => ({
  submit: (data) => dispatch(fetchSchedule(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
