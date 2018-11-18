import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getScheduleItem } from '../../utils';
import Typography from '@material-ui/core/Typography';
import ResultTable from '../ResultTable';
import { columns, head } from '../ResultTable/data';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5
  }
});

const getScheduleInfo = (stations, {originStationID, destinationStationID}) => {
  const originStationName = stations.list.find(station => station.StationID === originStationID).StationName.Zh_tw;
  const destinationStationName = stations.list.find(station => station.StationID === destinationStationID).StationName.Zh_tw;
  return `今天 從 ${originStationName} 到 ${destinationStationName} 尚有座位列車查詢結果：`;
}

const getDirection = (stations, orgiginStationID, destinationStationID) => {
  let orgIndex = 0;
  let desIndex = 0;
  stations.forEach((station, index) => {
    if (station.StationID === orgiginStationID) {
      orgIndex = index;
    } else if (station.StationID === destinationStationID) {
      desIndex = index;
    }
  });
  return desIndex > orgIndex ? '0' : '1'; // '0: 南下', '1: 北上
}

const getTableBody = (availableSeats, schedule, fares, direction) => {
  const now = Date.now();

  return availableSeats.reduce((list, availableSeat) => {
    // 過濾方向
    if (availableSeat.Direction.toString() !== direction) return list;

    // 檢查各站座位
    let numStandardSeats = 0;
    let numBusinessSeats = 0;
    availableSeat.StopStations.forEach(({StandardSeatStatus, BusinessSeatStatus}) => {
      if (StandardSeatStatus === 'Available') numStandardSeats++;
      if (BusinessSeatStatus === 'Available') numBusinessSeats++;
    });

    // 判斷票種
    let ticketType = '';
    if (numStandardSeats === availableSeat.StopStations.length) {
      ticketType = '標準';
    } else if (numBusinessSeats === availableSeat.StopStations.length) {
      ticketType = '商務';
    } else {
      return list;
    }

    const found = schedule.find(s => s.DailyTrainInfo.TrainNo === availableSeat.TrainNo);
    if (!found) return list;

    const scheduleItem = getScheduleItem(found, fares, ticketType);

    // 發車時間已過
    if (scheduleItem.originTime.value < now) return list;

    list.push(scheduleItem);
    return list;

  }, []);
};

class AvailableSeatsList extends Component {

  render() {
    const { classes, stations, availableSeats } = this.props;

    const info = availableSeats.params ? getScheduleInfo(stations, availableSeats.params) : null;
    const tableBody = availableSeats.data
      ? getTableBody(
        availableSeats.data.availableSeats[0].AvailableSeats,
        availableSeats.data.schedule,
        availableSeats.data.price[0].Fares,
        getDirection(
          stations.list,
          availableSeats.params.originStationID,
          availableSeats.params.destinationStationID
        )
      )
      : null;

    return (
      <div className={classes.root}>
        {info &&
          <Typography variant="subtitle1" color="inherit">
            {info}
          </Typography>
        }
        {tableBody
          ? tableBody.length > 0
            ? <ResultTable
                columns={columns}
                head={head}
                body={tableBody}
                initSortBy="originTime"
                initAscending={true}
              />
            : <Typography variant="subtitle2" color="inherit">無符合資料</Typography>
          : null
        }
      </div>
    );
  }
}

AvailableSeatsList.propTypes = {
  classes: PropTypes.object.isRequired,
  stations: PropTypes.object,
  availableSeats: PropTypes.object,
}

export default withStyles(styles)(AvailableSeatsList);;
