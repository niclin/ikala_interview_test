import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { pad } from '../../utils';
import ResultTable from '../ResultTable';
import { columns, head } from '../ResultTable/data';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5
  }
});

const getScheduleInfo = (stations, {trainDate, originStationID, destinationStationID}) => {
  const trainDateStr = trainDate.replace('-', '/');
  const originStationName = stations.list.find(station => station.StationID === originStationID).StationName.Zh_tw;
  const destinationStationName = stations.list.find(station => station.StationID === destinationStationID).StationName.Zh_tw;
  return `${trainDateStr} 從 ${originStationName} 到 ${destinationStationName} 列車時刻查詢結果：`;
}

const getTableBody = (scheduleData, priceData) => scheduleData.map(schedule => {
  const trainNo = schedule.DailyTrainInfo.TrainNo;
  const trainDate = schedule.TrainDate;
  const originTimeStr = schedule.OriginStopTime.DepartureTime;
  const originTime = new Date(`${trainDate} ${originTimeStr}`).getTime();
  const destinationTimeStr = schedule.DestinationStopTime.ArrivalTime;
  const destinationTime = new Date(`${trainDate} ${destinationTimeStr}`).getTime();
  const duration = destinationTime - originTime;
  const durationMin = Math.round(duration / 1000 / 60);
  const durationStr = `${pad(Math.floor(durationMin / 60), 2)}:${pad(durationMin % 60, 2)}`;

  const standardPrice = Number(priceData[0].Fares.find(fare => fare.TicketType === '標準').Price);
  const businessPrice = Number(priceData[0].Fares.find(fare => fare.TicketType === '商務').Price);
  const freedomPrice = Number(priceData[0].Fares.find(fare => fare.TicketType === '自由').Price);

  const priceStr = `標準: $${standardPrice.toLocaleString('en')} / 商務: $${businessPrice.toLocaleString('en')} / 自由: $${freedomPrice.toLocaleString('en')}`;
  return {
    key: trainNo,
    trainNo: {
      value: trainNo
    },
    originTime: {
      value: originTime,
      text: originTimeStr
    },
    destinationTime: {
      value: destinationTime,
      text: destinationTimeStr
    },
    duration: {
      value: duration,
      text: durationStr
    },
    price: {
      text: priceStr
    }
  }
});

class ScheduleList extends Component {

  render() {
    const { classes, stations, schedule, price } = this.props;

    const info = schedule.params ? getScheduleInfo(stations, schedule.params) : null;
    const tableBody = (schedule.data && price.data) ? getTableBody(schedule.data, price.data) : null;

    return (
      <div className={classes.root}>
        {info &&
          <Typography variant="subtitle1" color="inherit">
            {info}
          </Typography>
        }
        {tableBody &&
          <ResultTable
            columns={columns}
            head={head}
            body={tableBody}
            initSortBy="originTime"
            initAscending={true}
          />
        }
      </div>
    );
  }
}

ScheduleList.propTypes = {
  classes: PropTypes.object.isRequired,
  stations: PropTypes.object,
  schedule: PropTypes.object,
  price: PropTypes.object,
}

export default withStyles(styles)(ScheduleList);
