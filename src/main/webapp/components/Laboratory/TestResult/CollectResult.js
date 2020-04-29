import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import MatButton from '@material-ui/core/Button'

// import {GoChecklist} from 'react-icons/go';
import 'react-widgets/dist/css/react-widgets.css'
import {FaPlusSquare} from 'react-icons/fa';
import {FaRegEye} from 'react-icons/fa';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import ModalSampleResult from './EnterResult';
import ModalSampleType from './sampleTypeModal'
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})


 function CollectResult  (props){
  const classes = useStyles()
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
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
  const [modal2, setModal2] = useState(false)//modal to transfer sample
  const togglemodal2 = () => setModal2(!modal2)
  const [modal3, setModal3] = useState(false)//modal to Sample Types 
  const togglemodal3 = () => setModal3(!modal3)
  const [collectmodal, setcollectmodal] = useState([])//to collect array of datas into the modal and pass it as props
  const [samplelist, setSamplelist] = useState([])

const handleresult = (sampleval) => {  
   setcollectmodal(sampleval);
   setModal2(!modal2) 
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
    return <p>{"---"}</p>
  }
}

//This is function to check for the status of each collection to display on the tablist below 
const sampleAction = (rowdata) =>{

  return (
          <div>
            
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret size="sm" color="info" >
                    Action
                  </DropdownToggle>
                  <DropdownMenu>

                    <DropdownItem onClick={() =>
                        handleresult(rowdata)}>                     
                            <FaPlusSquare size="15" style={{color: '#3F51B5'}}/>{" "}Enter Result
                    </DropdownItem>
                    
                  </DropdownMenu>
            </ButtonDropdown>
            </div>
          )

}
  return (
    <Page title=' Sample Result'>
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
                        <thead style={{  backgroundColor:'#9F9FA5', color:"#000" }}>
                          <tr>
                            <th>Test</th>
                            <th>Sample Type</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {!loading ? newsample.map((row) => (
                          
                          <tr key={row.id}>
                            <th scope="row">{row.data.description===""?"---":row.data.description}</th>
                            <td>{row.data.sample_type===""?"---":row.data.sample_type}</td>
                            <td> {encounterresult.dateEncounter} </td>
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
      <ModalSampleResult modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} />
      <ModalSampleType modalstatus={modal3} togglestatus={togglemodal3} samptypelist={samplelist} />
    </Page>
  )
}


export default CollectResult