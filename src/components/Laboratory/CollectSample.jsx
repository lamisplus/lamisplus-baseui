import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input 
} from 'reactstrap';
import { useState} from 'react';
import { MdSave} from 'react-icons/md';
import {TiArrowBack} from 'react-icons/ti';
import MatButton from '@material-ui/core/Button';

import "react-datepicker/dist/react-datepicker.css";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';  

import TableBody from '@material-ui/core/TableBody';  
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';  
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
 import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';  
import TableRow from '@material-ui/core/TableRow'; 
import TableHead from '@material-ui/core/TableHead';   
import Paper from '@material-ui/core/Paper';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from 'components/Page';
import {url} from 'axios/url';
import Spinner from 'react-bootstrap/Spinner';

Moment.locale('en');
momentLocalizer();


  const useStyles2 = makeStyles(theme => ({
    inforoot: {
      width: '100%',
      marging: theme.spacing(5),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }));
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

export default function CollectSample(props){
  
    const classes = useStyles();
    const classes2 = useStyles2();
    const apiUrl = url+"encounters/";
    const data = [props.location.state.getpatientlists.row];
    const [showLoading, setShowLoading] = useState(false);
    // const [datas, setdatas]= useState(data)
    //console.log(data);

  /* For modal popup */
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle3 = () => setModal3(!modal3);
  // const [encounterid, setencounterid] = useState('');
  const [labNum, setlabNum] = useState(['']);
  //const [patientrow, setpatientValue] = useState({date_sample_collected:new Date(), sample_collected:''});
  const TodayDate = moment(new Date()).format('DD-MM-YYYY');
  const [patientrow, setpatientValue] = useState({
                                                    date_sample_collected:TodayDate,
                                                    lab_testid: '1',
                                                    description: "",
                                                    sample_type: "",
                                                    test_result: 0,
                                                    sample_referred: "",
                                                    sample_collected: "",
                                                    unit_measurement: "",
                                                    date_result_reported: "",

                                                  })
//const newDate = moment(patientrow.date_sample_collected).format('DD-MM-YYYY');


// const getUsermodal = (usercollection)=> {
// // setuservalue(user);
// console.log(usercollection);
// setencounterid(usercollection.encounterId);
// setpatientValue(usercollection.formData)
// setModal3(!modal3);

// }
const saveDateofSample = (e) => {
  //toast.warn("Processing Registration");
  //setpatientValue({...patientrow, date_sample_collected: newDate});
  setShowLoading(true);
  e.preventDefault();
  const datapost = {  formData: data,
                      lab_number:labNum.lab_number
                  };
    console.log(datapost);
  const newapiurl = apiUrl//+encounterid;
  axios.put(newapiurl, datapost)
    .then((result) => {          
      setShowLoading(false);
      props.history.push('/patients')
      toast.success("Patient Registration Successful!");
    }).catch((error) => {
    setShowLoading(false)
   
    }
    );
};
const saveColllectSample = (e) => {
  //toast.warn("Processing Registration");
  //setpatientValue({...patientrow, date_sample_collected: newDate});
  setShowLoading(true);
  e.preventDefault();
  const data = {  formData: patientrow };
    console.log(data);
  const newapiurl = apiUrl//+encounterid;
  axios.put(newapiurl, data)
    .then((result) => {          
      setShowLoading(false);
      props.history.push('/patients')
      toast.success("Patient Registration Successful!");
    }).catch((error) => {
    setShowLoading(false)
   
    }
    );
};
const onChangeLabnum = e => {
  //  e.preventDefault();
  setlabNum({...labNum, [e.target.name]: e.target.value});
 
  }
  return (
    <Page title="Collect Sample">
      <ToastContainer autoClose={2000} />
        <Row >
          <Col>
          <div className={classes2.inforoot} >
            <ExpansionPanel defaultExpanded style={{ backgroundColor: '#F5F5F5'}}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
                <div className={classes2.column}>
                    <Typography className={classes.heading}>
                        Name:  {data[0].firstName} {' '} {data[0].lastName}
                        <br/>
                        Gender: Female
                    </Typography>
                </div>
                <div className={classes2.column}>
                    <Typography className={classes2.heading}>
                        DOB:  {data[0].dob}
                        <br/>
                        Phone Number : +234567890
                    </Typography>
                </div>
                
                </ExpansionPanelSummary>
               
            </ExpansionPanel>
            </div>
            <br/>
            <Card className="mb-12">
              <CardHeader className="text-primary">Test Order  --  
              <Link to="/test-order">
                <Button color="primary" className=" float-right mr-1" >
                        <TiArrowBack/>Go Back
                </Button>
                </Link>
              </CardHeader>
              <CardBody>
              
                      <br/>
                        <Row>
                          <Col>
                            <Card body>
                              <TableContainer component={Paper}>                
                                    <Table className={classes.table} aria-label="caption table">
                                    <TableHead style={{fontWeight: "bolder" }}>
                                        <TableRow>
                                        <StyledTableCell align="center">Test</StyledTableCell>
                                        <StyledTableCell align="center">Sample Type</StyledTableCell>
                                        <StyledTableCell align="center">Date Requested</StyledTableCell>
                                        <StyledTableCell align="center">Collected</StyledTableCell>
                                        <StyledTableCell align="center">Refered</StyledTableCell>
                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {data.map(row => (
                                            <StyledTableRow key={row.encounterId}>
                                            <TableCell component="th" scope="row">
                                            {row.encounterId}
                                            </TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">{row.dateEncounter}</TableCell>
                                            <TableCell align="center">  
                                              <FormGroup check>
                                              <Label check disabled>
                                                <Input type="checkbox" checked />{' '}
                                                </Label>
                                              </FormGroup>
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormGroup check>
                                                <Label check >
                                                  <Input type="checkbox" />{' '}
                                                  </Label>
                                               </FormGroup>
                                            </TableCell>
                                            
                                            
                                            </StyledTableRow>
                                       ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                                <br/>
                                <Form  onSubmit={saveColllectSample}>
                            <Row form >
                              <Col md={3} style={{ marginTop: '20px'}}>
                                        <Input
                                            type="search"
                                            placeholder="Lab. Number "
                                            className="cr-search-form__input "
                                            name="lab_number"
                                            id="lab_number"
                                            value={labNum.lab_number} 
                                            onChangeLabnum={onChangeLabnum}
                                             
                                        />                                
                                </Col>
                                <Col md={2} >
                                   <p style={{ paddingLeft:'30px', marginTop: '30px'}}> OR Generate </p>          
                                </Col>
                                <Col md={2} style={{ marginTop: '20px'}}>
                                    <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                                    defaultValue={new Date()} max={new Date()}
                                    />                             
                                </Col>
                               
                                <Col md={2} style={{ marginTop: '20px'}}>
                                <FormGroup>
                                    
                                    <MatButton  
                                        type="submit" 
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<MdSave />}
                                    >
                                        Save
                                    </MatButton>
                                </FormGroup>

                                </Col>
                            </Row>
                        </Form>
                            </Card>
                          </Col>
                        </Row>
                        
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                 {/* Modal to cancel new test result  */} 
                 <Modal isOpen={modal3} toggle={toggle3} className={className} size='sm'>
                 <Form onSubmit={saveDateofSample}>
                    <ModalHeader toggle={toggle3}>Collect Sample </ModalHeader>
                    <ModalBody>
                       
                        
                        <Row form>
                            <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail">Date Sample Collected</Label>
                                <DateTimePicker time={false} name="date_sample_collected"  dropDown  />

                            </FormGroup>
                            </Col>
                            
                        </Row>       
                        
                    </ModalBody>
                    <ModalFooter>
                    <Row>
                            <Col md={12}>
                            {showLoading && 
                                
                                <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                                </Spinner> 
                            } 
                            </Col> 
                            </Row>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" onClick={toggle3}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>

             
             {/* End of each Modal popup for each action */}  

             {/* Modal to cancel new test result  */} 
             <Modal isOpen={modal} toggle={toggle} className={className} size='sm'>
                 <Form onSubmit={saveDateofSample}>
                    <ModalHeader toggle={toggle}>Transfer Test Order</ModalHeader>
                    <ModalBody>
                       
                        
                        <Row form>
                            <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail">Date Sample Collected</Label>
                                
                                <Input type="text" name="referer" id="referer" placeholder="Enter the Transfer Name" value={patientrow.referer} onChange={value1 => setpatientValue({...patientrow, referer: value1})} />
                            </FormGroup>
                            </Col>
                            
                        </Row>       
                        
                    </ModalBody>
                    <ModalFooter>
                    <Row>
                            <Col md={12}>
                            {showLoading && 
                                
                                <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                                </Spinner> 
                            } 
                            </Col> 
                            </Row>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>

             
             {/* End of each Modal popup for each action */}  
    </Page>
  )
}

