import React, { useState } from "react";
import Page from "components/Page";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";

import CalendarViewPage from "components/Appointments/CalendarView";
import ListViewPage from "components/Appointments/ListView";
import * as actions from "actions/patients";
import { connect } from "react-redux";
import { Tab } from 'semantic-ui-react'
import {
    Form,
    Input,
    Alert,
    CardBody,
    Card,
    Col,
    Row,
    FormGroup,
    Label,
    Button
  } from 'reactstrap';
  import { DateTimePicker } from "react-widgets";
  import SaveIcon from "@material-ui/icons/Search";
  import MatButton from "@material-ui/core/Button";
  import Moment from "moment";
  import momentLocalizer from "react-widgets-moment";

  //Dtate Picker package
Moment.locale("en");
momentLocalizer();

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "5px",
    paddingBottom: "10px"
  },
  inforoot: {
    margin: "5px",
  }
}));

function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [values, setValues] = useState({});
  const [searching, setSearching] = useState(false);
  const [fetchingPatient, setFetchingPatient] = useState(false);
  const hospitalNumber =
    props.hospitalNumber || props.patient.hospitalNumber || "";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
 const events = [
  { id: 1, title: 'event 1', date: '2020-05-26' },
  { id: 11, title: 'event 11', date: '2020-05-26' },
  { id: 12, title: 'event 13', date: '2020-05-30' },
  { id: 13, title: 'event 1', date: '2020-05-29' },
  { id: 14, title: 'event 11', date: '2020-05-28' },
  { id: 15, title: 'event 2', date: '2020-05-27' }
];
  const panes = [
    {
      menuItem: 'List View',
      render: () => <Tab.Pane attached={false}><ListViewPage events={events}/></Tab.Pane>,
    },
    {
      menuItem: 'Calendar View',
      render: () => <Tab.Pane attached={false}><CalendarViewPage events={events}/></Tab.Pane>,
    }
  ]
  return (
    <div className={classes.inforoot}>
     <ToastContainer  />
     <div className={classes.header}>Appointments</div >
    <Form>
           <Row>
               <Col md={12}>
           <Card>
              <CardBody>
                <Row>
                    <Col md={3}>
                    <FormGroup>
                      <Label for="startDate">Appointments From</Label>
                      <DateTimePicker
                        time={false}
                        name="startDate"
                        id="startDate"
                        value={values.startDate}
                        onChange={value =>
                          setValues({ ...values, startDate: value })
                        }
                        
                        
                      />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                    <FormGroup>
                      <Label for="endDate">Appointments To</Label>
                      <DateTimePicker
                        time={false}
                        name="endDate"
                        id="endDate"
                        value={values.endDate}
                        onChange={value =>
                          setValues({ ...values, endDate: value })
                        }
                        defaultValue={new Date()}
                        max={new Date()}
                        required
                      />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                    <FormGroup>
                      <Label for="patientId">Patient ID</Label>
                      <Input
                        type="text"
                        name="patientId"
                        id="patientId"
                      
                        value={values.patientId}
                        onChange={value =>
                            setValues({ ...values, patientId: value })
                          }

                      />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                    <FormGroup>
                      <Label for="service">Services</Label>
                      <Input
                         type="select"
                        name="service"
                        id="service"
                      
                        value={values.service}
                        onChange={value =>
                            setValues({ ...values, service: value })
                          }
                      >
<option>No Services</option>
                          </Input>
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={searching}
                >

                  {!searching ?
                  <span style={{textTransform: 'capitalize'}}>Search</span>
                   : <span style={{textTransform: 'capitalize'}}>Searching...</span>}
                  
                </MatButton>
                    </Col>
                </Row>
</CardBody>
               </Card>
              
               </Col>
           </Row>
        <Row>
          <Col md={12}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Col>
        </Row>
        </Form>   
       
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    patient: state.patients.patient,
    hospitalNumber: ownProps.match.params.hospitalNumber,
  };
};

const mapActionToProps = {
  fetchPatientByHospitalNumber: actions.fetchByHospitalNumber,
};

export default connect(mapStateToProps, mapActionToProps)(HomePage);
