import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import dayjs from 'dayjs';

export const FORM_TYPES = {
  SCHEDULE: 'schedule',
  AVAILABLE_SEATS: 'availableSeats'
}

const styles = theme => ({
  form: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 140
  },
});

const FIELD_NAMES = {
  TRAIN_DATE: 'trainDate',
  ORIGIN_STATION_ID: 'originStationID',
  DESTINATION_STATION_ID: 'destinationStationID',
}

const getStationOptions = (stations) =>
  [
    <option key="-1" value=""></option>
  ].concat(stations.list.map(station => (
    <option
      key={station.StationID}
      value={station.StationID}
    >
      {station.StationName.Zh_tw}
    </option>
  )));

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [FIELD_NAMES.TRAIN_DATE]: props.trainDate || '',
      [FIELD_NAMES.ORIGIN_STATION_ID]: props.originStationID || '',
      [FIELD_NAMES.DESTINATION_STATION_ID]: props.destinationStationID || '',
      errMsgs: []
    }
  }

  minDayjs = dayjs().startOf('day');

  maxDayjs = dayjs().add(27, 'day').endOf('day');

  setDefaultState = (field, value) => {
    if (this.state[field] === '' && value) this.setState({[field]: value});
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value});
  }

  handleCloseAlert = () => {
    this.setState({ errMsgs: []})
  }

  handleSubmit = e => {
    e.preventDefault();

    const errMsgs = [];

    if (this.props.type === FORM_TYPES.SCHEDULE && this.state[FIELD_NAMES.TRAIN_DATE] === '') {
      errMsgs.push('請選擇乘車日期');
    } else {
      const trainDayjs = dayjs(this.state[FIELD_NAMES.TRAIN_DATE]);
      if (trainDayjs.isBefore(this.minDayjs) || trainDayjs.isAfter(this.maxDayjs)) {
        errMsgs.push('乘車日期超出範圍');
      }
    }

    if (this.state[FIELD_NAMES.ORIGIN_STATION_ID] === '') {
      errMsgs.push('請選擇起程站');
    }

    if (this.state[FIELD_NAMES.DESTINATION_STATION_ID] === '') {
      errMsgs.push('請選擇到達站');
    }

    if (
      this.state[FIELD_NAMES.ORIGIN_STATION_ID] !== ''
      && (this.state[FIELD_NAMES.ORIGIN_STATION_ID] === this.state[FIELD_NAMES.DESTINATION_STATION_ID])
    ) {
      errMsgs.push('起程站和到達站不得相同');
    }

    this.setState({errMsgs});

    if (errMsgs.length > 0) return;

    const { submit } = this.props;
    if (typeof submit === 'function') submit(this.state);
  }

  render() {
    const { classes, type, title, stations, trainDate, originStationID, destinationStationID, isSubmitable } = this.props;

    // this.setDefaultState(FIELD_NAMES.TRAIN_DATE, trainDate);
    // this.setDefaultState(FIELD_NAMES.ORIGIN_STATION_ID, originStationID);
    // this.setDefaultState(FIELD_NAMES.DESTINATION_STATION_ID, destinationStationID);

    this.minDayjs = dayjs().startOf('day');
    this.maxDayjs = dayjs().add(27, 'day').endOf('day');

    return (
      <div>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        <form
          className={classes.form}
          onSubmit={this.handleSubmit}
        >
          {
            type === FORM_TYPES.SCHEDULE &&
            <FormControl className={classes.formControl}>
              <TextField
                id="date"
                label="乘車日期 *"
                type="date"
                defaultValue={trainDate}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: this.minDayjs.format('YYYY-MM-DD'),
                  max: this.maxDayjs.format('YYYY-MM-DD')
                }}
                onChange={this.handleChange(FIELD_NAMES.TRAIN_DATE)}
              />
            </FormControl>
          }
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="origin-station">起程站 *</InputLabel>
            <NativeSelect
              defaultValue={originStationID}
              input={<Input name="originStation" id="origin-station" />}
              onChange={this.handleChange(FIELD_NAMES.ORIGIN_STATION_ID)}
            >
              { getStationOptions(stations) }
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="destination-station">到達站 *</InputLabel>
            <NativeSelect
              defaultValue={destinationStationID}
              input={<Input name="destinationStation" id="destination-station" />}
              onChange={this.handleChange(FIELD_NAMES.DESTINATION_STATION_ID)}
            >
              { getStationOptions(stations) }
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="secondary"
                disabled={!isSubmitable}
                onClick={this.handleSubmit}
              >
                查詢
              </Button>
          </FormControl>
        </form>
        <Dialog
          open={this.state.errMsgs.length > 0}
          onClose={this.handleCloseAlert}
          fullWidth
          maxWidth="xs"
        >
          <DialogContent>
            {
              this.state.errMsgs.map((errMsg, index) => (
                <DialogContentText key={index}>{errMsg}</DialogContentText>
              ))
            }
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseAlert}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SearchForm.defaultProps = {
  trainDate: dayjs().format('YYYY-MM-DD'),
}

SearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([FORM_TYPES.SCHEDULE, FORM_TYPES.AVAILABLE_SEATS]).isRequired,
  title: PropTypes.string,
  stations: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
  }).isRequired,
  trainDate: PropTypes.string,
  originStationID: PropTypes.string,
  destinationStationID: PropTypes.string,
  isSubmitable: PropTypes.bool.isRequired,
  submit: PropTypes.func,
}

export default withStyles(styles)(SearchForm);
