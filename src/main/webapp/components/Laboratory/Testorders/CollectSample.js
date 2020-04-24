import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,Button, Form,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { MdSave } from 'react-icons/md'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
//import Table from '@material-ui/core/Table'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {FaPlusSquare} from 'react-icons/fa';
import {TiArrowForward} from 'react-icons/ti'
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import moment from 'moment'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import ModalSample from './collectSampleModal';
import ModalSampleTransfer from './transferSampleModal';
import ModalSampleType from './sampleTypeModal'
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';


Moment.locale('en')
momentLocalizer()

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})


 function CollectSample  (props){
   
  const encounterresult = props.location.state.formdata.row ;

  const classes = useStyles()
  const testorder = useSelector(state => state.laboratory.testorder);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState('')
  useEffect(() => {
    const personId = encounterresult.hospitalNumber;
    const ecounterId = encounterresult.encounterId;
    setLoading(true);
    const onSuccess = () => {
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)     
    }
    dispatch(fetchAllLabTestOrderOfPatient(ecounterId,onSuccess,onError ));
    dispatch(fetchById(personId,onSuccess,onError));
  }, [fetchAllLabTestOrderOfPatient,fetchById]); //componentDidMount  
  const data = [testorder]
  const newsample =  data[0] ? data[0] : null 
  const [useData, setUsedata] = useState(data)
  ///const formdata=newsample
   console.log(newsample)
  //Get list of test type
  const [labTestType, setLabTestType] = useState([])

        newsample.forEach(function(value, index, array) {
        labTestType.push(value['data'].lab_test_group);
    });
  //Make the list contain unique list of Data 
  const uniqueValues = [...new Set(labTestType)];
  const userInfo = encounterresult
  const [modal, setModal] = useState(false) //Modal to collect sample 
  const togglemodal = () => setModal(!modal)
  const [modal2, setModal2] = useState(false)//modal to transfer sample
  const togglemodal2 = () => setModal2(!modal2)
  const [modal3, setModal3] = useState(false)//modal to Sample Types 
  const togglemodal3 = () => setModal3(!modal3)
  const [collectmodal, setcollectmodal] = useState([])//to collect array of datas into the modal and pass it as props
  const [samplelist, setSamplelist] = useState([])
  // const [encounterid, setencounterid] = useState('');
  // const [labNum, setlabNum] = useState({lab_number:''})
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
  console.log(setCollectsample)
  //const newDate = moment(patientrow.date_sample_collected).format('DD-MM-YYYY');
  const saveColllectSample = e => {

    useData['formData'] = useData
    setUsedata({...useData, formData:{"labtest":useData }})
    //console.log(useData)
    toast.warn("Processing Sample ");
    e.preventDefault()
   props.createCollectedSample(collectsample)
 
  }
  const handlelabNumber = e => {
    //  e.preventDefault();
    
    setpatientValue({ ...patientrow, [e.target.name]: e.target.value })
  }

const handlesample = (sampleval) => {  
   setcollectmodal(sampleval);
   setModal(!modal) 
}
const transfersample = (val) => {
  setModal2(!modal2)
  setcollectmodal(val);
}
const viewSampleTypes = (values) => {
  setModal3(!modal3)
  setSamplelist(values);
}
const getGroup = e => {
  const getvalue =e.target.value;
  const testing = newsample.length>0?newsample:null
  console.log(testing.data)
  const getnew = data[0].find(x => x.lab_test_group === getvalue)
  console.log(getnew) 
};
//This is function to check for the status of each collection to display on the tablist below 
const samplestatus = e =>{
  if(e===1){
    return <p><Badge  color="light">Sample Collected</Badge></p>
  }else if(e===2){
    return <p><Badge  color="light">Sample Transfered</Badge></p>
  }else{
    return <p>{"null"}</p>
  }
}
//Check if sample type is not empty 
const samples = e =>{
  console.log(e)
  if(e==="" || e===null){
    return <p>---</p>
  }else{
    return <p><Badge color="info" style={{ cursor:'pointer'}}
      onClick={() =>
      viewSampleTypes(e)}
      >view samples</Badge></p>
  }
}
//This is function to check for the status of each collection to display on the tablist below 
const sampleAction = (e,rowdata) =>{
  if(e!=="" && e!==0){
  return <p> { }</p>
  }else{
    return (
            <div>
              <Tooltip title="Collect Sample">
                  <IconButton aria-label="Collect Sample" onClick={() =>
                    handlesample(rowdata)}>
                  <FaPlusSquare size="15" />
                  </IconButton>
              </Tooltip>
              <Tooltip title="Transfer Sample">
                  <IconButton aria-label="Transfer Sample" onClick={() =>
                    transfersample(rowdata)}>
                  <TiArrowForward size="15" />
                  </IconButton>
              </Tooltip>
              </div>
        )
  }
}
  return (
    <Page title='Collect Sample'>
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div >
            {!loading ?
             <PatientDetailCard getpatientdetails={ props.location.state }/>  
             :
             <p> <Spinner color="primary" /> Loading Please Wait..</p>
            }
            </div>
            <br/>
            <Card className="mb-12">
              <CardHeader>Test Order Details {console.log( data[0] )}
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
                      <Row form>
                          <Col md={3}>
                            <FormGroup>
                              <Label for="occupation">Lab Test Group </Label>

                              <Input
                                type="select"
                                name="testgroup"
                                id="testgroup"
                                onChange={getGroup}
                              >
                                <option value="">    
                                </option>
                                  {
                                    uniqueValues.map(x => 
                                      <option key={x} value={x}>
                                        {x}
                                      </option>
                                  )}
                              </Input>
                            </FormGroup>
                          </Col>
                      </Row>
                    <Form onSubmit={saveColllectSample}>
                      <Table style={{ fontWeight: 'bolder', borderColor:"#000"}} striped>
                        <thead style={{  backgroundColor:'#3E51B5', color:"#fff" }}>
                          <tr>
                            <th>Test</th>
                            <th>Sample Type</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                        {!loading ? newsample.map((row) => (
                          
                          <tr key={row.id}>
                            <th scope="row">{row.data.description===""?"Null ":row.data.description}</th>
                            <td>{samples(row.data.sample_type)}</td>
                            <td> {!row.dateEncounter?null:row.dateEncounter} </td>
                            <td>{samplestatus(row.data.lab_test_order_status)} </td>
                            <td>{sampleAction(row.data.lab_test_order_status, row)}</td>
                          </tr>
                        ))
                        :<p> <Spinner color="primary" /> Loading Please Wait</p>
                        } 
                        </tbody>
                      </Table>
                    
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
      <ModalSampleType modalstatus={modal3} togglestatus={togglemodal3} samptypelist={samplelist} />
    </Page>
  )
}


export default CollectSample