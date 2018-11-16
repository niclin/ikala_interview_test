import React, { Component } from 'react';
import ScheduleSearchFormContainer from '../../containers/ScheduleSearchFormContainer';
import { FORM_TYPES } from '../../components/SearchForm';
import ScheduleList from '../../components/ScheduleList';

class SchedulePage extends Component {
   render() {
    return (
      <div>
        <ScheduleSearchFormContainer
          type={FORM_TYPES.SCHEDULE}
          title="查詢列車時刻："
        />
        <ScheduleList />
      </div>
    );
  }
}

export default SchedulePage;
