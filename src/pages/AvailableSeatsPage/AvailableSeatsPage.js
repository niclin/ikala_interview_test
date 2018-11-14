import React, { Component } from 'react';
import AvailableSeatsSearch from '../../components/AvailableSeatsSearch';
import AvailableSeatsList from '../../components/AvailableSeatsList';

class AvailableSeatsPage extends Component {
   render() {
    return (
      <div>
        <AvailableSeatsSearch />
        <AvailableSeatsList />
      </div>
    );
  }
}

export default AvailableSeatsPage;
