import { connect } from 'react-redux';
import { toggleNav } from '../../actions';
import Navigation from '../../components/Navigation';

const mapStateToProps = (state) => ({
  isNavOpen: state.navigation.isOpen
});

const mapDispatchToProps = dispatch => ({
  toggleNav: () => dispatch(toggleNav)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
