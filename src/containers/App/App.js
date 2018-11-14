import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import NavigationContainer from '../NavigationContainer';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
     return (
      <Router>
        <div className={ classes.root }>
          <CssBaseline />
          <NavigationContainer />
        </div>
      </Router>
    );
  }
}
 export default withStyles(styles)(App);
