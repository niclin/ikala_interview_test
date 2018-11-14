import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ResultTable from '../ResultTable';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 5
  }
});

class AvailableSeatsList extends Component {
   render() {
    const { classes } = this.props;
     return (
      <div className={classes.root}>
        <Typography variant="subtitle1" color="inherit">
          今天從 台北 到 高雄 尚有座位列車查詢結果：
        </Typography>
        <ResultTable />
      </div>
    );
  }
}

AvailableSeatsList.propTypes = {
  classes: PropTypes.object.isRequired
}

 export default withStyles(styles)(AvailableSeatsList);;
