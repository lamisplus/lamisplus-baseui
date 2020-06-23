import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { fetchUsers } from "../../actions/user";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const userList = (props) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.fetchAllPatients();
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>

              <StyledTableCell align="center">Username</StyledTableCell>

              <StyledTableCell align="center">Gender </StyledTableCell>

              <StyledTableCell align="center">Designation </StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.usersList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow>
                    <TableCell component="th" scope="row" align="left">
                    {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell align="center">
                      {row.username}
                    </TableCell>

                    <TableCell align="center">
                      {row.gender}
                    </TableCell>

                    <TableCell align="center">
                      {row.designation}
                    </TableCell>

                    <TableCell align="center">
                      Action
                    </TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.users.list,
});

const mapActionToProps = {
  fetchAllPatients: fetchUsers,
};

export default connect(mapStateToProps, mapActionToProps)(userList);
