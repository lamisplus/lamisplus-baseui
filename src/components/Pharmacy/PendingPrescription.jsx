import Page from 'components/Page';
import React from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Alert,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TiWarningOutline } from "react-icons/ti";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    GiMedicines
} from 'react-icons/gi';
import TablePagination from '@material-ui/core/TablePagination';  
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchTestOrder from 'components/Laboratory/SearchForm/SearchTestOrder';

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

const PendingPrescription = (props) => {
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  const apistate = "https://jsonplaceholder.typicode.com/users";
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
    <Page title="Pending Prescription" >     
        <Row>        
        <Col xl={12} lg={12} md={12}>
          <Alert color="primary">
                <TiWarningOutline 
                    size="30"
                    className=" text-dark"/>  { '  '} 
                    Note : Only  Patients can be search here
            </Alert>
          </Col>
        </Row>

              <Row>          
                <Col sm="12">
                  <Card body>
                    <Form>
                      <SearchTestOrder />
                    </Form>          
                      <br/>
                      <TableContainer component={Paper}>                
                        <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell>Patient ID</StyledTableCell>
                            <StyledTableCell align="center">Patient Name</StyledTableCell>
                            <StyledTableCell align="center">Phone Number</StyledTableCell>
                            <StyledTableCell align="center">Total</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                          return (  

                                <StyledTableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.usernme}</TableCell>
                                <TableCell align="center">{row.username}</TableCell>
                                <TableCell align="center">{row.username}</TableCell>
                                <TableCell align="center">
                                        
                                        <Typography variant="caption" className="text-primary"   display="block"  gutterBottom>
                                            <GiMedicines/>
                                            <Link to="/view-prescription"> View Prescription</Link>
                                        </Typography>                                    
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
     
                  </Card>
                </Col>
                
              </Row>
       
</Page>

  
  );
};

export default PendingPrescription;
