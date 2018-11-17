import React, { Component } from 'react';
import ScheduleSearchFormContainer from '../../containers/ScheduleSearchFormContainer';
import { FORM_TYPES } from '../../components/SearchForm';
import ScheduleListContainer from '../../containers/ScheduleListContainer';

class SchedulePage extends Component {
   render() {
    return (
      <div>
        <ScheduleSearchFormContainer
          type={FORM_TYPES.SCHEDULE}
          title="查詢列車時刻："
        />
       <ScheduleListContainer />
      </div>
    );
  }
}

export default SchedulePage;
