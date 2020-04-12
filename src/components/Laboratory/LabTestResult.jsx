import Page from 'components/Page';
import React from 'react';
import {
    Card,
    Alert,
    Col,
    Row,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input 
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
import {FaPlusSquare, FaTimesCircle} from 'react-icons/fa';
import {GoChecklist} from 'react-icons/go';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';  
import ResultSearch from 'components/Laboratory/SearchForm/ResultSearch';
import axios from 'axios';
//import {url} from 'axios/url';  
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en');
momentLocalizer();



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

const LabTestResult = (props) => {
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);   
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  
  const apistate = "https://lp-base-app.herokuapp.com/api/encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM";
      useEffect(() => {    
        const GetData = async () => {    
          const result = await axios(apistate);    
          setData(result.data);  
          console.log(data);   
        }  
        GetData();     

}, []);   

const [modal, setModal] = useState(false);
const [modal2, setModal2] = useState(false);
const [modal3, setModal3] = useState(false);

const toggle = () => setModal(!modal);
const toggle2 = () => setModal2(!modal2);
const toggle3 = () => setModal3(!modal3);
const textstyle = {
    fontSize: '14px',
    fontWeight: 'bolder'
  };
const className =""
const handleChangePage = (event, newPage) => {  

setPage(newPage);  

};  

const handleChangeRowsPerPage = event => {  
setRowsPerPage(+event.target.value);  
setPage(0);  
};  


  return (
    <div>     
        
              <Row>          
                <Col sm="12">
                  <Card body>
                      <Form>
                        <ResultSearch />
                      </Form>          
                        
                      <br/>
                        <TableContainer component={Paper}>                
                            <Table className={classes.table} aria-label="caption table">
                            <TableHead>
                              
                                <TableRow>
                                <StyledTableCell>Lab Number</StyledTableCell>
                                <StyledTableCell align="center">Patient ID</StyledTableCell>
                                <StyledTableCell align="center">Patient Name</StyledTableCell>
                                <StyledTableCell align="center">Date Collected</StyledTableCell>
                                <StyledTableCell align="center">Sample </StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                                return ( 
                                    <StyledTableRow key={row.encounterId}>
                                    <TableCell component="th" scope="row">
                                        {row.hospitalNumber}
                                    </TableCell>
                                    <TableCell align="center">{row.hospitalNumber}</TableCell>
                                <TableCell align="center">{row.firstName} {' '} {row.lastName}</TableCell>
                                <TableCell align="center">{row.dateEncounter}</TableCell>
                                    <TableCell align="center">{row.formData.lab_test_order[0].description}</TableCell>
                                    
                                    <TableCell align="center">
                                        <Tooltip title="Verify Collected Sample">
                                                
                                                <IconButton aria-label="Verify Sample" onClick={toggle}>
                                                <GoChecklist size="15" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Enter Result">
                                                <IconButton aria-label="Enter Result" onClick={toggle2}>
                                                <FaPlusSquare size="15" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Rejected Result">
                                                <IconButton aria-label="Rejected Result" onClick={toggle3}>
                                                <FaTimesCircle size="15" />
                                                </IconButton>
                                            </Tooltip>
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


              {/* The Modal popup for each action */}
            {/* Modal to view test detail */} 
            <Modal isOpen={modal} toggle={toggle} className={className} size='md'>
                <ModalHeader toggle={toggle}>Verify Sample Collected</ModalHeader>
                <ModalBody>
                <Row >
                    <Col md={8}>
                    <p>Are you Sure the sample is valid </p>
                    
                    <FormGroup>
                        <Label for='maritalStatus'>Correct Sample Collected ?</Label>
                        <Input
                        type='select'
                        name='labtest_order_status'
                        id='labtest_order_status'
                        
                        required                       
                        >
                        <option value=''>Please Slect </option>
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>                       
                        </Input>
                    </FormGroup>
                   
                    </Col>
                </Row>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            {/* Modal to enter new test result  */} 
                <Modal isOpen={modal2} toggle={toggle2} className={className} size='lg'>
                    <ModalHeader toggle={toggle2}>Enter Test Detail</ModalHeader>
                    <ModalBody>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Test 
                          <br/>
                          <p style={textstyle}>Haemoglobin </p>

                        
                        </Col>
                        <Col xs="4">
                          Sample Test
                          <br/>
                          <p style={textstyle}>Blood</p>
                          
                          </Col>
                        <Col xs="4">
                          Date Of Result
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            />            
                          </Col>
                       
                    </Row >
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                         
                          <FormGroup>
                                <Label for="exampleEmail">Result</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                          Unit
                          <br/>
                          <p style={textstyle}>mm/hl</p>
                          
                          </Col>
                        <Col xs="4">
                          Sample collected
                          <br/>
                          <p style={textstyle}>020/03/03<small className="text-muted">By Evans</small></p>
                          </Col>
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                         
                          <FormGroup>
                                <Label for="examplePassword">File</Label>
                                <Input type="file" name="file"  placeholder="file upload" />
                            </FormGroup>
                        
                        </Col>
                        <Col xs="4">
                          Date Asseyed
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            /> 
                          
                          </Col>
                        
                       
                    </Row>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="12">
                         
                          <FormGroup>
                                <Label for="examplePassword">Enter Note here</Label>
                                <Input type="text" name="password"  placeholder="Note" />
                            </FormGroup>

                        
                        </Col>
                        
                    </Row>
                       
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle2}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle2}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            {/* Modal to cancel new test result  */} 
                <Modal isOpen={modal3} toggle={toggle3} className={className} size='lg'>
                    <ModalHeader toggle={toggle3}>Reject Sample </ModalHeader>
                    <ModalBody>
                    <Row style={{ marginTop: '20px'}}>
                        <Col xs="4">
                          Test 
                          <br/>
                          <p style={textstyle}>Haemoglobin </p>

                        
                        </Col>
                        <Col xs="4">
                          Sample Test
                          <br/>
                          <p style={textstyle}>Blood</p>
                          
                          </Col>
                        <Col xs="4">
                          Date Of Result
                          <br/>
                          <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                            defaultValue={new Date()} max={new Date()}
                            />            
                          </Col>
                       
                    </Row >
                        <br/>
                        <Form>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Reason For Rejection</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Not well collected</option>
                                    <option>Mistake on the sample</option>
                                    <option>Not needed</option>
                                   
                                  </Input>
                            </FormGroup>
                            </Col>
                            <Col md={12}>
                            <FormGroup>
                                <Label for="examplePassword">Note</Label>
                                <Input type="text" name="result-received" id="result" placeholder="Result Recieved" />
                            </FormGroup>
                            </Col>
                            
                        </Row>       
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle3}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle3}>Cancel</Button>
                    </ModalFooter>
                </Modal>

             
             {/* End of each Modal popup for each action */} 
       
</div>

  
  );
};

export default LabTestResult;
