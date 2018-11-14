import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  tableCell: {
    padding: theme.spacing.unit,
    textAlign: 'center'
  }
});

class ResultTable extends Component {
   render() {
    const { classes } = this.props;
     return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>車次</TableCell>
            <TableCell className={classes.tableCell}>出發時間</TableCell>
            <TableCell className={classes.tableCell}>到達時間</TableCell>
            <TableCell className={classes.tableCell}>行車時間</TableCell>
            <TableCell className={classes.tableCell}>票價</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell}>123</TableCell>
            <TableCell className={classes.tableCell}>00:00</TableCell>
            <TableCell className={classes.tableCell}>23:59</TableCell>
            <TableCell className={classes.tableCell}>12:34</TableCell>
            <TableCell className={classes.tableCell}>$1499</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

ResultTable.propTypes = {
  classes: PropTypes.object.isRequired
}

 export default withStyles(styles)(ResultTable);
