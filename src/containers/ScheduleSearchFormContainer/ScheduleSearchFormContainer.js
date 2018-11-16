import { connect } from 'react-redux';
import { fetchSchedule } from '../../actions/schedule';
import SearchForm from '../../components/SearchForm';

const mapStateToProps = (state) => ({
  stations: state.stations,
  isSubmitable: state.stations.list.length > 0
});

const mapDispatchToProps = dispatch => ({
  submit: (data) => dispatch(fetchSchedule(data))
});

export default connect(
  mapStateToProps,
)(SearchForm);
