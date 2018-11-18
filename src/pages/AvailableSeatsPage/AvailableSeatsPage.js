import React, { Component } from 'react';
import AvailableSeatsSearchFormContainer from '../../containers/AvailableSeatsSearchFormContainer';
import { FORM_TYPES } from '../../components/SearchForm';
import AvailableSeatsListContainer from '../../containers/AvailableSeatsListContainer';

class AvailableSeatsPage extends Component {
   render() {
    return (
      <div>
        <AvailableSeatsSearchFormContainer
          type={FORM_TYPES.AVAILABLE_SEATS}
          title="查詢尚有座位列車："
        />
        <AvailableSeatsListContainer />
      </div>
    );
  }
}

export default AvailableSeatsPage;
