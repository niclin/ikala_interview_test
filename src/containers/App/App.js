import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import HeaderContainer from '../HeaderContainer';
import NavigationContainer from '../NavigationContainer';
import MainContent from '../MainContent';

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
          <HeaderContainer />
          <NavigationContainer />
          <MainContent />
        </div>
      </Router>
    );
  }
}
 export default withStyles(styles)(App);
