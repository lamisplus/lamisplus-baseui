import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Row,
  Col,
    FormGroup,
    Input,
    Label,
    Alert,
    Card,
    CardBody,
    CardHeader
  } from 'reactstrap';

  import Spinner from 'react-bootstrap/Spinner';
  import moment from 'moment';
  import Select from 'react-select';
  import * as encounterActions from "actions/encounter";
  import * as actions from "actions/laboratory";
  
  import {connect} from 'react-redux';


function TestOrderPage(props) {   
   const PatientID = props.patientId;
   const visitId = props.visitId;
    const [testGroups, setTestGroup] = React.useState([]);
    const [tests, setTests] = React.useState([]);
    const [testOrders, setTestOrders] = React.useState([]);
    const [showLoading, setShowLoading] = useState(false);  
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    React.useEffect(() => {
      if(props.testGroupList.length === 0){
        setErrorMessage();
        const onSuccess = () => {
        }
        const onError = errstatus => {
         setErrorMessage("Could not fetch test groups at the moment, try again later")
        }
       props.fetchTestGroup(onSuccess, onError)
       
}
   }, []);
   
   React.useEffect(() => {
    setTestGroup(props.testGroupList.map(({ category, id }) => ({ label: category, value: id })));
}, [props.testGroupList]);

React.useEffect(() => {
  setTests(props.tests);
}, [props.tests]);

  const getTestByTestGroup = (e) => {
    const testGroupId = e.target.value;

    async function fetchTests() {
        setErrorMessage("")
        const onSuccess = () => {
          setTests(props.tests);
        }
        const onError = errstatus => {
         setErrorMessage("Could not fetch test list, please try again later")
         setTests([])
        }
        props.fetchTestByTestGroup(testGroupId, onSuccess, onError)
      }
      fetchTests();
}
const saveTestOrder = (e) => { 
  try{
  e.preventDefault(); 
  if (!testOrders || testOrders.length < 1) {
      setErrorMessage("You must pick a test before you can submit");
      return;
  }
 
  const data = {
    formData: testOrders,
    patientId: PatientID, 
    visitId: visitId,
    formName: 'LABTEST_ORDER_FORM',
    serviceName: 'GENERAL_SERVICE',
    dateEncounter: moment(new Date()).format('DD-MM-YYYY')      
  }; 
  setShowLoading(true);
  setSuccessMessage('');
  const onSuccess = () => {
    setShowLoading(false);
    setTestOrders([]);
    setTests([]);
    setSuccessMessage("Test Order Successfully Saved!");
  }
  const onError = () => {
    setErrorMessage("An error occurred, could not save request!");
    setShowLoading(false)
  }
  props.createLabOrder(data, onSuccess, onError);
}catch(err){
  console.log(err)
}
  };

  const handleChange = (newValue) => {
    setTestOrders(newValue ? newValue : []);    
  };

return (
<form  onSubmit={saveTestOrder} >
            <Card  >
              <CardHeader> Test Order</CardHeader>
                    <CardBody>
                        {successMessage ? 
                        <Alert color="success">
                    {successMessage}
            </Alert> : ""
            }
             {errorMessage ? 
                        <Alert color="danger">
                    {errorMessage}
            </Alert> : ""
            }
                        <br/>
                        <Row>
                        <Col md={5}>
                            <FormGroup>
                                    <Label for="testGroup">Select Test Order</Label>
                                    <Input type="select" name="testGroup" onChange={getTestByTestGroup}>
                                        <option value="">Select Test Group</option>
                                        {testGroups.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                {label}
                                                </option>
                                                ))}
                                    </Input>
                                </FormGroup> 
</Col>
<Col md={5}>
                            <FormGroup>
                                    <Label for="testGroup">Select Test</Label>
                                    <Select
        isMulti={true}
        onChange={handleChange}
        options={tests.map(x => ({...x, label:x.description, value:x.id}))}
      />
                                    </FormGroup>
                                    </Col>

                                    <Col md={2}>
<Button class="btn btn-primary mt-4" type="button" onClick={saveTestOrder} >Save
&nbsp;
                                        { showLoading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : ""}
</Button>
                                      </Col>
                        </Row>
                        
                    </CardBody>                      
                </Card>

    <br/>
        </form>    
)
}

const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
    testGroupList: state.laboratory.testGroup,
    tests: state.laboratory.tests
  }
}

const mapActionToProps = {
  fetchTestGroup: actions.fetchAllTestGroup,
  fetchTestByTestGroup: actions.fetchAllTestsByTestGroup,
  createLabOrder: encounterActions.create
}

export default connect(mapStateToProps, mapActionToProps)(TestOrderPage)
