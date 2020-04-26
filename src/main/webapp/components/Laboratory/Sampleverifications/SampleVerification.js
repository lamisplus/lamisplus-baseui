import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti' 
import { FaRegEye } from 'react-icons/fa'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import MatButton from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {GoChecklist} from 'react-icons/go';
import 'react-widgets/dist/css/react-widgets.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import ModalSampleVerify from './VerifySample';
// import ModalSampleResult from '../TestResult/EnterResult';
// import ModalSampleReject from './SampleRejection';
import ModalSampleType from './sampleTypeModal'
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})

 function CollectVerification  (props){
  const classes = useStyles()
  const encounterresult = props.location.state.getpatientlists.row ;
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
  const formdata=newsample
  console.log(formdata)
  //Get list of test type
  const [labTestType, setLabTestType] = useState([])
  console.log(setLabTestType)
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

const handlesample = (sampleval) => {  
   setcollectmodal(sampleval);
   setModal(!modal) 
}
const handlereject = (sampleval) => {
  setcollectmodal(sampleval);
  setModal3(!modal3)
 
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
  }else if(e==="3"){
    return <p><Badge  color="light">Sample Verified</Badge></p>
  }else if(e==="4"){
    return <p><Badge  color="light">Sample Rejected</Badge></p>
  }else if(e===5){
    return <p><Badge  color="light">Result Available</Badge></p>
  }else{
    return <p>{"null"}</p>
  }
}
//Check if sample type is not empty 
const samples = e =>{
  console.log(e)
  if(e==="" || e===null){
    return <p>null</p>
  }else{
    return <p><Badge color="info" style={{ cursor:'pointer'}}
      onClick={() =>
      viewSampleTypes(e)}
      >{e.length} Sample</Badge></p>
  }
}
//This is function to check for the status of each collection to display on the tablist below 
const sampleAction = (e) =>{
  return (
          <div>
            <Tooltip title="Verify Sample">                                              
                <IconButton aria-label="Verify Sample" onClick={() =>
                  handlesample(e)}
                  >
                <GoChecklist size="15" />
                </IconButton>
            </Tooltip>
            {e.data.sample_type!==null ?
              <Tooltip title="View Sample Type">
                <IconButton aria-label="View Sample Type" onClick={() =>
                  viewSampleTypes(e.data.sample_type)}>
                <FaRegEye size="15" />
                </IconButton>
            </Tooltip>
            :
            ""
           }
            </div>
          )
}
  return (
    <Page title=' Sample Verification'>
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
              <CardHeader>Test Order Details 
              <Link to="/laboratory">
              <MatButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  
                  className=" float-right mr-1"
                >
                  <TiArrowBack/>{" "} Back
                </MatButton>
                
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
                   
                      <Table style={{ fontWeight: 'bolder', borderColor:"#000"}} striped>
                        <thead style={{   backgroundColor:'#9F9FA5', color:"#000"  }}>
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
                            <td> {userInfo.dateEncounter} </td>
                        <td>{samplestatus(row.data.lab_test_order_status)} </td>
                            <td>{sampleAction(row)}</td>
                          </tr>
                        ))
                        :<p> <Spinner color="primary" /> Loading Please Wait</p>
                        } 
                        </tbody>
                      </Table>
                    
                  
                 
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalSampleVerify modalstatus={modal} togglestatus={togglemodal} datasample={collectmodal} />
      {/* <ModalSampleResult modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} /> */}
      {/* <ModalSampleReject modalstatus={modal3} togglestatus={togglemodal3} datasample={collectmodal} /> */}
      <ModalSampleType modalstatus={modal3} togglestatus={togglemodal3} samptypelist={samplelist} />
    </Page>
  )
}


export default CollectVerification