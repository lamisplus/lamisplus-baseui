import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,Alert, Form,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {FaPlusSquare, FaRegEye} from 'react-icons/fa';
import {TiArrowForward} from 'react-icons/ti'
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Page from 'components/Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import ModalSample from './collectSampleModal';
import ModalSampleTransfer from './transferSampleModal';
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import ModalViewResult from './../TestResult/ViewResult';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  td: {borderBottom :'#fff'}
})


 function CollectSample  (props){
  const encounterresult = props.location.state.formdata.row ? props.location.state.formdata.row : null;
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
  // const [newsample] = useState(formDatasample)
  // const checklabnum = newsample.includes('lab_number'); 
  // if(checklabnum===false){
  //   newsample.lab_number=''
  // }
  // console.log(newsample)
  //Get list of test type
  const labTestType = []
        newsample.forEach(function(value, index, array) {
        labTestType.push(value['data'].lab_test_group);
    });
  //Make the list contain unique list of Data 
  const uniqueValues = [...new Set(labTestType)];
  const [modal, setModal] = useState(false) //Modal to collect sample 
  const togglemodal = () => setModal(!modal)
  const [modal2, setModal2] = useState(false)//modal to transfer sample
  const togglemodal2 = () => setModal2(!modal2)
  const [modal3, setModal3] = useState(false)//modal to View Result
  const togglemodal3 = () => setModal3(!modal3)
  const [collectmodal, setcollectmodal] = useState([])//to collect array of datas into the modal and pass it as props

  // const [encounterid, setencounterid] = useState('');
  const [labNum, setlabNum] = useState({lab_number:""})

  const handlelabNumber = e => {
    //  e.preventDefault();   
    setlabNum({ ...labNum, [e.target.name]: e.target.value })
  }
const handlesample = (row) => { 

   setcollectmodal({...collectmodal, ...row});
   setModal(!modal) 
}
const transfersample = (val) => {
  setModal2(!modal2)
  setcollectmodal(val);
}
const viewresult = (row) => {  
  setcollectmodal({...collectmodal, ...row});
  setModal3(!modal3) 
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
    return <p><Badge  color="primary">Sample Collected</Badge></p>
  }else if(e===2){
    return <p><Badge  color="primary">Sample Transfered</Badge></p>
  }else if(e==="3"){
    return <p><Badge  color="primary">Sample Verified</Badge></p>
  }else if(e==="4"){
    return <p><Badge  color="primary">Sample Rejected</Badge></p>
  }else if(e===5){
    return <p><Badge  color="primary">Result Available</Badge></p>
  }else{
    return <p>{" "}</p>
  }
}

//This is function to check for the status of each collection to display on the tablist below 
const sampleAction = (e) =>{

    return (

        <Menu>
            <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px"}}>
              Action <span aria-hidden>▾</span>
            </MenuButton>
            <MenuList style={{hover:"#eee"}}>
              <MenuItem onSelect={() => handlesample(e)}><FaPlusSquare size="15" style={{color: '#000'}}/>{" "}Collect Sample</MenuItem>
              <MenuItem onSelect={() => transfersample(e)}><TiArrowForward size="15" style={{color: '#000'}}/>{" "} Transfer Sample</MenuItem>             
              {e.data.lab_test_order_status===5 ?
                 <MenuItem onSelect={() => viewresult(e)}><FaRegEye size="15" style={{color: '#3F51B5'}}/>{" "}View Result</MenuItem>
                 :""}  
            </MenuList>
        </Menu>
        )

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
              <CardHeader>Test Order Details 
              <Link 
              to ={{ 
                pathname: "/laboratory",  
                activetab: 1
              }} >
              
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
            <Alert color="primary">
              Please make sure you enter Lab number before collecting sample
            </Alert>
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
                          <Col md={3} className='float-right mr-1'>
                          {/* {labNum['lab_number']==="" ? */}
                          <FormGroup>
                              <Label for="occupation">Lab Number </Label>
                          <Input
                            type='text'
                            className='cr-search-form__input '
                            name='lab_number'
                            id='lab_number'
                            value={labNum.lab_number}
                            onChange={handlelabNumber}
                          />
                          </FormGroup>
                         
                        </Col>
                      </Row>
                    <Form >
                      <Table  striped responsive>
                        <thead style={{  backgroundColor:'#9F9FA5' }}>
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
                          
                          <tr key={row.id} style={{ borderBottomColor: '#fff' }}>
                            <th className={classes.td}>{row.data.description===""?" ":row.data.description}</th>
                            <td className={classes.td}>{row.data.sample_type==="" ? " ":row.data.sample_type}</td>
                            <td className={classes.td}> {encounterresult.dateEncounter==="" ? " ":encounterresult.dateEncounter} </td>
                            <td className={classes.td}>{samplestatus(row.data.lab_test_order_status)} </td>
                            <td className={classes.td}>{sampleAction(row)}</td>
                          </tr>
                        ))
                        :<p> <Spinner color="primary" /> Loading Please Wait</p>
                        } 
                        </tbody>
                      </Table>
                    
                    <br />
                   
                    </Form>
                    
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalSample modalstatus={modal} togglestatus={togglemodal} datasample={collectmodal}  labnumber={labNum}/>
      <ModalSampleTransfer modalstatus={modal2} togglestatus={togglemodal2} datasample={collectmodal} labnumber={labNum}/>
      <ModalViewResult modalstatus={modal3} togglestatus={togglemodal3} datasample={collectmodal} />

    </Page>
  )
}


export default CollectSample