import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

const navWidth = 210;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  navigation: {
    [theme.breakpoints.up('sm')]: {
      width: navWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: navWidth,
  },
  selected: {
    backgroundColor: '#eee'
  }
});

class Navigation extends Component {

  render() {
    const { classes, container, isNavOpen, toggleNav } = this.props;

    const drawer = (
      <Fragment>
        <div className={ classes.toolbar }></div>
          <List>
            <ListItem button component={ NavLink } to="/">
              <ListItemText primary="列車時刻查詢" />
            </ListItem>
            <ListItem button component={ NavLink } to="/available-seats">
              <ListItemText primary="尚有座位列車查詢" />
            </ListItem>
          </List>
      </Fragment>
    );

    return (
      <nav className={ classes.navigation }>
        <Hidden smUp>
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={isNavOpen}
            onClose={toggleNav}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            { drawer }
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            className={ classes.navigation }
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            { drawer }
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired
};

export default withStyles(styles)(Navigation);
