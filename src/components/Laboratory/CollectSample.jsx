import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { useState } from 'react'
import { MdSave } from 'react-icons/md'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'

import 'react-datepicker/dist/react-datepicker.css'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import moment from 'moment'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import { connect } from 'react-redux'
import { createCollectedSample } from '../../actions/laboratory'
import ModalSample from './collectSampleModal';
import ModalSampleTransfer from './transferSampleModal';


Moment.locale('en')
momentLocalizer()

const useStyles2 = makeStyles(theme => ({
  inforoot: {
    width: '100%',
    marging: theme.spacing(5)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))
const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 11
  }
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

 function CollectSample (props) {
  const classes = useStyles()
  const classes2 = useStyles2()
  const data = [props.location.state.getpatientlists.row.formData.labtest_order[0]]
  const [useData, setUsedata] = useState(data)
  const userInfo = props.location.state.getpatientlists.row
  const [showLoading, setShowLoading] = useState(false)
  const [checkvalue, setCheckvalue] = useState(0);
  const [transfer, setTransfer] = useState('');
  /* For modal popup */
  const { className } = props
  const [checked, setChecked] = useState({id:'', statuscheck:false })
  const [modal, setModal] = useState(false)
  const togglemodal = () => setModal(!modal)
  const [modal2, setModal2] = useState(false)
  const togglemodal2 = () => setModal2(!modal2)
  const [collectmodal, setcollectmodal] = useState('')
  // const [encounterid, setencounterid] = useState('');
  const [labNum, setlabNum] = useState({lab_number:''})
  //const [patientrow, setpatientValue] = useState({date_sample_collected:new Date(), sample_collected:''});
  const TodayDate = moment(new Date()).format('DD-MM-YYYY')
  const [patientrow, setpatientValue] = useState({
        date_sample_collected: TodayDate,
        lab_number: '',
  })
  const [collectsample, setCollectsample] = useState({
        dateEncounter: "",
        formData: {},
        formName: "LAB_ORDER_FORM",
        patientId: 0,
        serviceName: "GENERAL_SERVICE",
        visitId: 0
  })
  //const newDate = moment(patientrow.date_sample_collected).format('DD-MM-YYYY');


  const saveColllectSample = e => {
    console.log(patientrow)
    const newDatenow = moment(TodayDate).format('DD-MM-YYYY')

    useData['formData'] = useData
    setUsedata({...useData, formData:{"labtest":useData }})
    console.log(useData)
    toast.warn("Processing Sample ");
    e.preventDefault()
   props.createCollectedSample(collectsample)
 
  }
  const handlelabNumber = e => {
    //  e.preventDefault();
    
    setpatientValue({ ...patientrow, [e.target.name]: e.target.value })
  }
  const handlecollect = e => {
    setChecked({...checked, [e.target.value]: e.target.value})
    console.log(e)
  }
const handlesample = (val) => {
   setModal(!modal)
   setcollectmodal(val);

  //const defaultCountryId = data[0].find(x => x.description === 'CD4')
  //setPatientorder({...patientorder, sample_collected: newsample_collected });
  //console.log(defaultCountryId)
}
const transfersample = (val) => {
  setModal2(!modal2)
  setcollectmodal(val);

}

  return (
    <Page title='Collect Sample'>
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div className={classes2.inforoot}>
            <ExpansionPanel
              defaultExpanded
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1c-content'
                id='panel1c-header'
              >
                <div className={classes2.column}>
                    <Typography className={classes.heading}>
                        Name:  {userInfo.firstName} {' '} {userInfo.lastName}
                        <br/>
                        Gender: {userInfo.gender || 'N/A'} 
                    </Typography>
                </div>
                <div className={classes2.column}>
                    <Typography className={classes2.heading}>
                        DOB:  {userInfo.dob}
                        <br/>
                        Phone Number :  {userInfo.mobilePhoneNumber || 'N/A'}
                    </Typography>
                </div>
              </ExpansionPanelSummary>
            </ExpansionPanel>
            </div>
            <br/>
            <Card className="mb-12">
              <CardHeader>Test Order Details
              <Link to="/laboratory">
                <Button color="primary" className=" float-right mr-1" >
                        <TiArrowBack/>Go Back
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <br />
              <Row>
                <Col>
                  <Card body>
                    <Form onSubmit={saveColllectSample}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label='caption table'
                      >
                        <TableHead style={{ fontWeight: 'bolder' }}>
                          <TableRow>
                            <StyledTableCell align='center'>
                              Test
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Sample Type
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Date Requested
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Collected
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              Refered
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          
                            {useData.map(row => (
                            
                            <StyledTableRow key={row.id}>
                              <TableCell component='th' scope='row'>
                                {row.description}
                              </TableCell>
                              <TableCell align='center'>{row.sample_type}</TableCell>
                              <TableCell align='center'>
                              {userInfo.dateEncounter} 
                                {/* date_sample_collected */}
                              </TableCell>
                              <TableCell align='center'>
                                <Button  size="sm" color="info" onClick={() =>
                                      handlesample(row.description)}>Collect Sample
                                </Button>
                                
                              </TableCell>
                              <TableCell align='center'>
                              <Button  size="sm" color="warning" onClick={() =>
                                      transfersample(row.description)}>Transfer Sample
                                </Button>
                              </TableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <br />
                    
                      <Row form>
                        <Col md={3} style={{ marginTop: '20px' }}>
                          <Input
                            type='text'
                            placeholder='Lab. Number '
                            className='cr-search-form__input '
                            name='lab_number'
                            id='lab_number'
                            value={patientrow.lab_number}
                            onChange={handlelabNumber}
                          />
                        </Col>
                        <Col md={2}>
                          <p style={{ paddingLeft: '30px', marginTop: '30px' }}>
                            {' '}
                            OR Generate{' '}
                          </p>
                        </Col>
                        <Col md={2} style={{ marginTop: '20px' }}>
                          <DateTimePicker
                            time={false}
                            name='date_sample_collected'
                            id='date_sample_collected'
                            defaultValue={new Date()}
                            max={new Date()}
                          />
                        </Col>

                        <Col md={2} style={{ marginTop: '20px' }}>
                          <FormGroup>
                            <MatButton
                              type='submit'
                              variant='contained'
                              color='primary'
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
      <ModalSample modalstatus={modal} togglestatus={togglemodal} datasample={collectmodal} testorder={data}  userInfo={userInfo} useData={useData}/>
      <ModalSampleTransfer modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} testorder={data}  userInfo={userInfo} useData={useData}/>
      {/* Modal to cancel new test result  */}
      {/* <Modal isOpen={modal3} toggle={toggle} className={className} size='sm'>
        <Form >
          <ModalHeader toggle={toggle3}>Collect Sample </ModalHeader>
          <ModalBody>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for='exampleEmail'>Date Sample Collected</Label>
                  <DateTimePicker
                    time={false}
                    name='date_sample_collected'
                    dropDown
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col md={12}>
                {showLoading && (
                  <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                )}
              </Col>
            </Row>
            <Button color='primary' type='submit'>
              Save
            </Button>{' '}
            <Button color='secondary' onClick={toggle3}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal> */}

      {/* End of each Modal popup for each action */}

      {/* Modal to cancel new test result  */}
      {/* <Modal isOpen={modal} toggle={toggle} className={className} size='sm'>
        <Form >
                <ModalHeader toggle={toggle}>Collect Test Order </ModalHeader>
          <ModalBody>
            <Row >
              <Col md={12}>
                <p>Are you sure you have collect the Sample {transfer} ? </p>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col md={12}>
                {showLoading && (
                  <Spinner animation='border' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                )}
              </Col>
            </Row>
            <Button color='primary'  onClick={handlecollect} >
              Yes
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              No
            </Button>
          </ModalFooter>
        </Form>
      </Modal> */}

      {/* End of each Modal popup for each action */}
    </Page>
  )
}


export default connect(null, { createCollectedSample })(CollectSample)