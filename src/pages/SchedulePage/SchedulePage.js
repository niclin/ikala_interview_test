import React, { Component } from 'react';
import ScheduleSearch from '../../components/ScheduleSearch';
import ScheduleList from '../../components/ScheduleList';

class SchedulePage extends Component {
   render() {
    return (
      <div>
        <ScheduleSearch />
        <ScheduleList />
      </div>
    );
  }
}

export default SchedulePage;
