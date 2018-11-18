import { connect } from 'react-redux';
import AvailableSeatsList from '../../components/AvailableSeatsList';

const mapStateToProps = (state) => ({
  stations: state.stations,
  availableSeats: state.availableSeats
});

export default connect(
  mapStateToProps
)(AvailableSeatsList);
