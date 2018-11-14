import {
  TOGGLE_NAV
} from '../actions';

const defaultState = {
  isOpen: false
}

const navigation = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
}

export default navigation;
