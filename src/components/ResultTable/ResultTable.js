import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function sortArrayBy(arr, sortBy, ascending) {
if (sortBy === undefined) {
  return arr.slice(0);
} else {
  return arr.sort((a, b) => {
    return (a[sortBy].value - b[sortBy].value) * (ascending ? 1 : -1);
  });
}
}

const styles = theme => ({
  tableCell: {
    padding: theme.spacing.unit,
    textAlign: 'center'
  }
});

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: props.initSortBy,
      ascending: props.initAscending === undefined ? true : props.initAscending
    }
  }

  handleSort = (sortBy) => (e) => {
    const ascending = this.state.sortBy === sortBy ? !this.state.ascending : this.props.initAscending;
    this.setState(state => ({
      sortBy,
      ascending
    }));
  }
   render() {
    const { classes, columns, head, body } = this.props;
    const sortedBody = sortArrayBy(body, this.state.sortBy, this.state.ascending);

    return (
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(col => {
                const text = head[col.key].text;
                return (
                  <TableCell
                    className={classes.tableCell}
                    key={ col.key }
                  >
                    {
                      col.sortable ? (
                        <TableSortLabel
                          active={this.state.sortBy === col.key}
                          direction={this.state.ascending ? 'asc' : 'desc'}
                          onClick={this.handleSort(col.key)}
                        >
                          {text}
                        </TableSortLabel>
                      ) : text
                    }
                  </TableCell>
                );
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedBody.map(row => {
              return (
                <TableRow key={row.key}>
                  {
                    columns.map(col => {
                      const text = row[col.key].text || row[col.key].value;
                      return (
                        <TableCell className={classes.tableCell} key={ col.key }>{ text }</TableCell>
                      );
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    );
  }
}
ResultTable.propTypes = {
  classes: PropTypes.object.isRequired
}

 export default withStyles(styles)(ResultTable);
