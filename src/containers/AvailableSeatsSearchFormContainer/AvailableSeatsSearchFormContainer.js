import { connect } from 'react-redux';
import { fetchAvailableSeats } from '../../actions/availableSeats';
import SearchForm from '../../components/SearchForm';

const mapStateToProps = (state) => ({
  stations: state.stations,
  originStationID: state.availableSeats.params ? state.availableSeats.params.originStationID : '',
  destinationStationID: state.availableSeats.params ? state.availableSeats.params.destinationStationID : '',
  isSubmitable: state.stations.list.length > 0 && !state.availableSeats.isFetching
});

const mapDispatchToProps = dispatch => ({
  submit: (data) => dispatch(fetchAvailableSeats(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);
