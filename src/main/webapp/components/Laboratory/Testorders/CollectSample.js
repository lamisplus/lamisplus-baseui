import React from 'react'
import {Card, CardBody,CardHeader,Col,Row,Alert,Table, Form,FormGroup,Label,Input} from 'reactstrap'
import { useState , useEffect} from 'react'
import { TiArrowBack } from 'react-icons/ti'
import MatButton from '@material-ui/core/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {FaPlusSquare, FaRegEye} from 'react-icons/fa';
import {TiArrowForward} from 'react-icons/ti'
import { toast } from 'react-toastify'
import 'react-widgets/dist/css/react-widgets.css'
//Date Picker
import { ToastContainer } from 'react-toastify'
import Page from './../../Page'
import {  fetchById } from '../../../actions/patients'
import {  fetchAllLabTestOrderOfPatient } from '../../../actions/laboratory'
import ModalSample from './collectSampleModal';
import ModalSampleTransfer from './transferSampleModal';
import { useSelector, useDispatch } from 'react-redux';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import { Spinner } from 'reactstrap';
import { Badge } from 'reactstrap';
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import ModalViewResult from './../TestResult/ViewResult';


const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    },
    td: { borderBottom :'#fff'}
})





  const CollectSample = (props) => {

    const sampleCollections = props.location.state ? props.location.state.formDataObj : {};
    const encounterDate = props.location.state.dateEncounter
    console.log(props.location.state)
        const classes = useStyles()
        const testorder = useSelector(state => state.laboratory.testorder);
        const dispatch = useDispatch();
        const [loading, setLoading] = useState('')

    useEffect(() => {
        if(props.location.state.encounterId !="" ){         
                setLoading(true);
                    const onSuccess = () => {
                        setLoading(false)
                        //setnewSample(samples)
                        
                    }
                    const onError = () => {
                        setLoading(false)     
                    }
            dispatch(fetchAllLabTestOrderOfPatient(props.location.state.encounterId,onSuccess,onError ));
            dispatch(fetchById(props.location.state.hospitalNumber,onSuccess,onError));
        }
    }, [props.location.state.encounterId]); //componentDidMount  
    
    const fetchTestOrders = testorder;
        //Get list of test type
        const labTestType = [];
            if(fetchTestOrders !== null || fetchTestOrders ===""){
                fetchTestOrders.forEach(function(value, index, array) {
                    labTestType.push(value['data'].lab_test_group);
                });
            }

        //Make the list contain unique list of Data 
        const uniqueValues = [...new Set(labTestType)];
        const [modal, setModal] = useState(false) //Modal to collect sample 
        const toggleModal = () => setModal(!modal)
        const [modal2, setModal2] = useState(false)//modal to transfer sample
        const toggleModal2 = () => setModal2(!modal2)
        const [modal3, setModal3] = useState(false)//modal to View Result
        const toggleModal3 = () => setModal3(!modal3)
        const [collectModal, setcollectModal] = useState([])//to collect array of datas into the modal and pass it as props

        const [labNum, setlabNum] = useState({lab_number:""})

        const  checkLabNumber = fetchTestOrders.hasOwnProperty("lab_number"); //check if that key exist in the array
            if(checkLabNumber !==false || checkLabNumber ===undefined){    
                setlabNum({...labNum, lab_number:fetchTestOrders.lab_number})
            }

    const handleLabNumber = e => {
      //  e.preventDefault();   
      setlabNum({ ...labNum, [e.target.name]: e.target.value })
    }

    const handleSample = (row) => { 
        setcollectModal({...collectModal, ...row});
        setModal(!modal) 
    }

    const transferSample = (row) => {
        setModal2(!modal2)
        setcollectModal({...collectModal, ...row});
    }

    const viewresult = (row) => {  
        setcollectModal({...collectModal, ...row});
        setModal3(!modal3) 
    }

    const getGroup = e => {
        const getValue =e.target.value;
        const testOrders = fetchTestOrders.length >0 ? fetchTestOrders:{}
        const getNewTestOrder = fetchTestOrders.find(x => x.lab_test_group === getValue)
    };
    //This is function to check for the status of each collection to display on the tablist below 
    const sampleStatus = e =>{
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
                        <MenuItem onSelect={() => handleSample(e)}><FaPlusSquare size="15" style={{color: '#000'}}/>{" "}Collect Sample</MenuItem>
                            <MenuItem onSelect={() => transferSample(e)}><TiArrowForward size="15" style={{color: '#000'}}/>{" "} Transfer Sample</MenuItem>             
                                { e.data.lab_test_order_status===5 ?
                                    <MenuItem onSelect={() => viewresult(e)}><FaRegEye size="15" style={{color: '#3F51B5'}}/>{" "}View Result</MenuItem>
                                    :""
                                }  
                    </MenuList>
            </Menu>
          )
  }


return (
    <Page title='Collect Sample'>
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
                                                    <option value=""> </option>
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
                                            onChange={handleLabNumber}
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
                                                {!loading ? fetchTestOrders.map((row) => (
                                                    <tr key={row.id} style={{ borderBottomColor: '#fff' }}>
                                                      <th className={classes.td}>{row.data.description===""?" ":row.data.description}</th>
                                                      <td className={classes.td}>{row.data.sample_type==="" ? " ":row.data.sample_type}</td>
                                                      <td className={classes.td}> {row.data.date_sample_collected==="" ? encounterDate:row.data.date_sample_collected} </td>
                                                      <td className={classes.td}>{sampleStatus(row.data.lab_test_order_status)} </td>
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
      <ModalSample modalstatus={modal} togglestatus={toggleModal} datasample={collectModal}  labnumber={labNum}/>
      <ModalSampleTransfer modalstatus={modal2} togglestatus={toggleModal2} datasample={collectModal} labnumber={labNum}/>
      <ModalViewResult modalstatus={modal3} togglestatus={toggleModal3} datasample={collectModal} />

    </Page>
  )
  
}


export default CollectSample