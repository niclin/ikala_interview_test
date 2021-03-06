import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  form: {
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 120
  }
});

class AvailableSeatsSearch extends Component {
   render() {
    const { classes, isSubmitable } = this.props;

    return (
      <div>
        <Typography variant="h6" color="inherit">
          查詢尚有座位列車：
        </Typography>
        <form className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="origin-station">起程站</InputLabel>
            <NativeSelect
              input={<Input name="originStation" id="origin-station" />}
            >
              <option></option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="destination-station">到達站</InputLabel>
            <NativeSelect
              input={<Input name="destinationStation" id="destination-station" />}
            >
              <option></option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="secondary"
              >
                查詢
              </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

AvailableSeatsSearch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AvailableSeatsSearch);
