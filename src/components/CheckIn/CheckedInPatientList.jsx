
import React from 'react';  

import { makeStyles, withStyles } from '@material-ui/core/styles';  

import Paper from '@material-ui/core/Paper';  

import Table from '@material-ui/core/Table';  

import TableBody from '@material-ui/core/TableBody';  

import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';  
import axios from 'axios';    
import { useState, useEffect } from 'react' ;
import {
    MdDashboard
} from 'react-icons/md';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'; 
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col} from 'reactstrap'; 
// import Spinner from 'react-bootstrap/Spinner';
// React Notification
// import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import CheckInModal from 'components/CheckIn/CheckInModal';
import {url} from 'axios/url';



const useStyles = makeStyles({  
  root: {  
    width: '100%',  
  },  
  container: {  
    maxHeight: 440,  
  },  
});  
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
 

export default function MatPaginationTable(props) {  
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);  
  //Modal state
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
    //end og modal state
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  //Get list of Visit/checkin patients API 
  const apipatient = url+"visits/datevisit/";
  console.log(apipatient);
  useEffect(() => {    
        const GetData = async () => {    
          const result = await axios(apipatient);    
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
        <ToastContainer autoClose={2000} />
      <TableContainer className={classes.container}>  

        <Table stickyHeader aria-label="sticky table">  

        <TableHead>  

            <TableRow>  

              <StyledTableCell>Hospital No</StyledTableCell>  
              <StyledTableCell align="center">Patient Name</StyledTableCell>   
              <StyledTableCell align="center">Start Visit</StyledTableCell>
              <StyledTableCell align="center">End Visit</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>


            </TableRow>  

          </TableHead>  

          <TableBody>  

            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  

           <StyledTableRow >  

                <TableCell component="th" scope="row">  

                  {row.hospitalNumber}  

                </TableCell>  
              <TableCell align="center">{row.firstName} {''} {row.lastName}</TableCell>  

              <TableCell align="center">{row.dateVisitStart} {' '} {row.timeVisitStart} </TableCell>  

                <TableCell align="center">{row.dateVisitEnd} {' '} {row.timeVisitEnd} </TableCell>  

                <TableCell align="center">
               
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
            {/* The checkedin modal  */}
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Check In Patient</ModalHeader>
                <ModalBody>
                    <CheckInModal  />
                </ModalBody>

                <ModalFooter>
                    <Row>
                    <Col md={12}>
                    
                    </Col> 
                    </Row>
                    <Button color="primary" onClick={toggle}>Check In</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
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