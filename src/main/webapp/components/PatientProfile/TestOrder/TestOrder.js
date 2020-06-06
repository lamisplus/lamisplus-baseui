import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import {
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardDeck,
} from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";

import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import Select from "react-select";
import * as encounterActions from "actions/encounter";
import * as actions from "actions/laboratory";
import {fetchPatientTestOrders} from "actions/patients"
import { fetchApplicationCodeSet } from "actions/applicationCodeset";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { v1 as uuidv1 } from "uuid";
import * as CODES from "api/codes";
import PreviousTestOrder from "./TestOrderHistory";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { APPLICATION_CODESET_PRIORITIES } from "actions/types";

function TestOrderPage(props) {
  const PatientID = props.patientId;
  const visitId = props.visitId;
  const [tests, setTests] = React.useState([]);
  const [testOrders, setTestOrders] = React.useState([]);
  const [testOrder, setTestOrder] = React.useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  React.useEffect(() => {
    if (props.priorities.length === 0) {
      props.fetchApplicationCodeSet("PRIORITY", APPLICATION_CODESET_PRIORITIES);
    }
    if (props.testGroupList.length === 0) {
      setErrorMessage();
      const onSuccess = () => {};
      const onError = (errstatus) => {
        setErrorMessage(
          "Could not fetch test groups at the moment, try again later"
        );
      };
      props.fetchTestGroup(onSuccess, onError);
    }
  }, []);

  React.useEffect(() => {
    setTests(props.tests);
  }, [props.tests]);

  const onInputChange = (e) => {
    e.persist();
    console.log(testOrder);
    setTestOrder({ ...testOrder, [e.target.name]: e.target.value });
  };

  const getTestByTestGroup = (testGroup) => {
    setTestOrder({ ...testOrder, testGroup: testGroup });
    console.log(testGroup);
    async function fetchTests() {
      setErrorMessage("");
      const onSuccess = () => {
        setTests(props.tests);
      };
      const onError = (errstatus) => {
        setErrorMessage("Could not fetch test list, please try again later");
        setTests([]);
      };
      props.fetchTestByTestGroup(testGroup.value.id, onSuccess, onError);
    }
    fetchTests();
  };
  function getTestGroupNameById(id) {
    //  return testGroups.find((x) => x.value === id).label;
  }

  const removeTest = (index) => {
    const testOrderList = [...testOrders];
    testOrderList.splice(index, 1);
    setTestOrders(testOrderList);
  };

  const isViralLoad = () => {
    let value = testOrder &&
    testOrder.test &&
    testOrder.test.value &&
    testOrder.test.value.name === "Viral Load";
    return value;
    
  };

  const addNewTest = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!testOrder) return;
    //
    if (!(testOrder.test.value && testOrder.priority.value)) {
      window.scrollTo(0, 0);
      setErrorMessage("Fill all required fields");
      return;
    }

    if (isViralLoad() && !testOrder.vlIndication) {
      window.scrollTo(0, 0);
      setErrorMessage("Fill all required fields");
      return;
    }
    setTestOrders([...testOrders, testOrder]);
    setTestOrder({ test: {}, priority: {}, testGroup: {}, vlIndication: "" });
  };

  const saveTestOrder = (e) => {
    e.preventDefault();
    if (showLoading) {
      return;
    }

    if (!testOrders || testOrders.length < 1) {
      setErrorMessage("You must pick a test before you can submit");
      return;
    }

    // default value that have to go with the form data
    const defaults = {
      patient_id: props.patientId,
      test_result: "",
      date_result_reported: "",
      date_sample_collected: "",
      comment: "",
      user_id: "",
      sample_type: "",
      lab_test_order_id: uuidv1(),
      lab_test_order_status: 0,
    };

    //looping through the test order to create the formData structure expected by the server
    var orders = testOrders.map((x) => {
      return {
        ...{
          lab_test_id: x.test.value.id,
          description: x.test.value.name,
          lab_test_group: x.testGroup.value.name,
          lab_test_group_id: x.testGroup.value.id,
          unit_measurement: x.test.value.unitMeasurement,
          priority: x.priority.value,
          viral_load_indication: x.vlIndication
        },
        ...defaults,
      };
    });

    const data = {
      data: orders,
      patientId: PatientID,
      visitId: visitId,
      formCode: CODES.LAB_TEST_ORDER_FORM,
      programCode: CODES.GENERAL_SERVICE,
      dateEncounter: moment(new Date()).format("DD-MM-YYYY"),
    };
    
    setShowLoading(true);
    setSuccessMessage("");
    const onSuccess = () => {
      setShowLoading(false);
      setTestOrders([]);
      setSuccessMessage("Test Order Successfully Saved!");
      props.fetchPatientTestOrder(props.patientId);
    };
    const onError = () => {
      setErrorMessage("An error occurred, could not save request!");
      setShowLoading(false);
    };
    props.createLabOrder(data, onSuccess, onError);
  };

  return (
    <Row>
      <Col md={4}>
        <Card>
          <CardHeader> Test Order</CardHeader>
          <CardBody>
            {successMessage ? (
              <Alert color="success">{successMessage}</Alert>
            ) : (
              ""
            )}
            {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ""}
            <br />
            <form onSubmit={addNewTest}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="testGroup">Select Test Order*</Label>
                    <Select
                      required
                      isMulti={false}
                      value={testOrder.testGroup}
                      onChange={getTestByTestGroup}
                      options={props.testGroupList.map((x) => ({
                        label: x.name,
                        value: x,
                      }))}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="testGroup">Select Test*</Label>

                    <Select
                      isMulti={false}
                      required
                      value={testOrder.test}
                      onChange={(e) => setTestOrder({ ...testOrder, test: e })}
                      options={tests.map((x) => ({
                        label: x.name,
                        value: x,
                      }))}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="priority">Select Priority*</Label>
                    <Select
                      isMulti={false}
                      required
                      value={testOrder.priority}
                      onChange={(e) =>
                        setTestOrder({ ...testOrder, priority: e })
                      }
                      options={props.priorities.map((x) => ({
                        label: x.display,
                        value: x,
                      }))}
                    />
                  </FormGroup>
                </Col>
                {isViralLoad() && (
                  <Col md={12}>
                    <FormGroup>
                      <Label for="vlIndication">VL Indication*</Label>
                      <Input
                        required
                        name="vlIndication"
                        id="vlIndication"
                        value={testOrder.vlIndication}
                        onChange={onInputChange}
                      />
                    </FormGroup>
                  </Col>
                )}
                {props.visitId ? (
                  <Col md={12}>
                    <Button
                      class="btn btn-primary "
                      type="button"
                      onClick={addNewTest}
                    >
                      Add Test
                    </Button>
                  </Col>
                ) : (
                  <Col md={12}>
                    <Alert color="danger">
                      {" "}
                      This patient does not have a current visit. You have to
                      check in to proceed
                    </Alert>
                  </Col>
                )}
              </Row>
            </form>
          </CardBody>
        </Card>
      </Col>
      <Col md={8}>
      {testOrders.length > 0  &&
        <Row>
          <Col md={12}>
           
              <Card>
                <CardHeader>Current Test Order</CardHeader>
                <Row>
                  <Col md={12}>
                    <List>
                      {testOrders.map((testOrder, index) => (
                        <TestOrderList
                          key={index}
                          index={index}
                          testOrder={testOrder}
                          removeTest={removeTest}
                        />
                      ))}
                    </List>
                  </Col>
                  
                </Row>
                
              </Card>
          
            
          </Col>
          <Col md={12}> 
          <br></br>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={saveTestOrder}
                    >
                      Save &nbsp;
                      {showLoading ? (
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        ""
                      )}
                    </Button>
                    
                    <br></br>
          <hr></hr>
                  </Col>
                  
                  </Row>
                    }
                  <Row>
         
          <Col md={12}>
            
            <Card>
              <CardHeader>Previous Test Order</CardHeader>
              <PreviousTestOrder patientId={props.patient.patientId} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

function TestOrderList({ testOrder, index, removeTest }) {
  return (
    <ListItem>
      <ListItemText
        primary={
          <React.Fragment>
            {testOrder.testGroup ? testOrder.testGroup.value.name : ""} -{" "}
            {testOrder.test ? testOrder.test.value.name : ""}
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              Priority:{" "}
              {testOrder.priority ? testOrder.priority.value.display : ""}
              {testOrder.vlIndication ? (
                <span> | VL Indication: {testOrder.vlIndication} </span>
              ) : (
                ""
              )}
            </Typography>
          </React.Fragment>
        }
      />

      <ListItemSecondaryAction onClick={() => removeTest(index)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
    testGroupList: state.laboratory.testGroup,
    tests: state.laboratory.tests,
    priorities: state.applicationCodesets.priorities,
  };
};

const mapActionToProps = {
  fetchTestGroup: actions.fetchAllTestGroup,
  fetchTestByTestGroup: actions.fetchAllTestsByTestGroup,
  createLabOrder: encounterActions.create,
  fetchApplicationCodeSet: fetchApplicationCodeSet,
  fetchPatientTestOrder: fetchPatientTestOrders,
};

export default connect(mapStateToProps, mapActionToProps)(TestOrderPage);
