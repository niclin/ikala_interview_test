import React, { Component } from 'react';
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SchedulePage from '../../pages/SchedulePage';
import AvailableSeatsPage from '../../pages/AvailableSeatsPage';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar
});

class MainContent extends Component {
   render() {
    const { classes } = this.props;
     return (
      <main className={ classes.content }>
        <div className={ classes.toolbar } />
        <Route path="/" exact component={SchedulePage} />
        <Route path="/available-seats" exact component={AvailableSeatsPage} />
      </main>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired
}

 export default withStyles(styles)(MainContent);
