import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination'; 
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {
  MdDashboard
} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from 'axios/url';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    width:200,
  },
}));
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 11,
  },
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);



export default function TestOrder(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  const apistate = url+"visits/datevisit/";
  useEffect(() => {    
    const GetData = async () => {    
      const result = await axios(apistate);    
      setData(result.data);  
      console.log(result.data);   
    }  
    GetData();     

}, []);   

const handleChangePage = (event, newPage) => {  
  setPage(newPage);  

};  
const handleChangeRowsPerPage = event => {  
  setRowsPerPage(+event.target.value);  
  setPage(0);  
};

   
  return (
    <Paper className={classes.root}>   
      <TableContainer component={Paper}>                
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Hospital No</StyledTableCell>
              <StyledTableCell align="center">Patient Name</StyledTableCell>
              <StyledTableCell align="center">Start Visit</StyledTableCell>
              
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => { 
            return ( 
                <StyledTableRow key={row.name}>
                  <TableCell component="th" scope="row">
                  {row.hospitalNumber}  
                  </TableCell>
                  <TableCell align="center">{row.firstName} {''} {row.lastName}</TableCell>
                  <TableCell align="center">{row.dateVisitStart} {' '} {row.timeVisitStart}</TableCell>
                
                  <TableCell align="center">
                  {/* <Link to="/enroll-patient-dashboard" getpatient={row}> */}
                  <Link to={{ pathname: '/enroll-patient-dashboard', state: { getpatient: {row}} }}>
                    <Tooltip title="View Dashboard">
                        <IconButton aria-label="View Dashboard">
                        <MdDashboard />
                        </IconButton>
                    </Tooltip>
                    </Link>
                </TableCell>
                </StyledTableRow>
            );  

          })}  
          </TableBody>
        </Table>
      </TableContainer>
       <TablePagination  

       rowsPerPageOptions={[5, 10, 15]}  

       component="div"  

       count={data.length}  

       rowsPerPage={rowsPerPage}  

       page={page}  

       onChangePage={handleChangePage}  

       onChangeRowsPerPage={handleChangeRowsPerPage}  

     />  
     </Paper> 
     
  );

}