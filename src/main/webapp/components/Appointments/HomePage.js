import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarViewPage from "components/Appointments/CalendarView";

import ListViewPage from "components/Appointments/ListView";
import * as actions from "actions/patients";
import {fetchAllAppointments} from "actions/appointments"
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import {FaCalendarWeek, FaCalendarAlt, FaCalendarPlus} from 'react-icons/fa';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
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
    
  } from 'reactstrap';
  import { DateTimePicker } from "react-widgets";
  import SaveIcon from "@material-ui/icons/Search";
  import MatButton from "@material-ui/core/Button";
  import AddIcon from '@material-ui/icons/Add';
  import Moment from "moment";
  import momentLocalizer from "react-widgets-moment";
import NewAppointment from "./NewAppointment";

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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-force-tabpanel-${index}`}
          aria-labelledby={`scrollable-force-tab-${index}`}
          {...other}
      >
          {value === index && <Box p={5}>{children}</Box>}
      </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [values, setValues] = useState({});
  const [searching, setSearching] = useState(false);
  const [fetchingPatient, setFetchingPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  React.useEffect(() => {
    setLoading(true)
    const onSuccess = () => {
     // setData(props.previousMedications);
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)
     // setErrorMsg("Could not fetch previous medications, try again later");
    }
    props.fetchAllAppointments(onSuccess, onError);
  }, [props.patientId]);
  
 
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
    },
    {
      menuItem: 'New Appointment',
      render: () => <Tab.Pane attached={false}><CalendarViewPage events={events}/></Tab.Pane>,
    }
  ]

  return(
    <React.Fragment>
    <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="inherit"
            aria-label="scrollable force tabs example"
          >
            <Tab
              className={classes.title}
              label="List View"
              icon={<FaCalendarWeek />}
              {...a11yProps(0)}
            />
            <Tab
              className={classes.title}
              label="Calendar View"
              icon={<FaCalendarAlt />}
              {...a11yProps(1)}
            />
             <Tab
              className={classes.title}
              label="Create Appointment"
              icon={<FaCalendarPlus />}
              {...a11yProps(2)}
            /> 
          </Tabs>
          <div></div>
        </AppBar>

        <TabPanel value={value} index={0}>
        <ListViewPage events={events}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <CalendarViewPage events={events}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <NewAppointment />
        </TabPanel>
        </React.Fragment>
  )
  return (
    <div className={classes.inforoot}>
     <ToastContainer  />
     <div className={classes.header}>Appointments</div >
     <Row>
<Col md={12}>
     <Button
                variant="contained"
                color="primary"
                className="float-right mr-1"
                startIcon={<AddIcon />}
              >
                <span style={{textTransform: 'capitalize'}}>Add </span>
                &nbsp;&nbsp;
                <span style={{textTransform: 'lowercase'}}>Patient </span>
                
              </Button>
              </Col>
              </Row>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> 
       
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    hospitalNumber: ownProps.match.params.hospitalNumber,
  };
};

const mapActionToProps = {
  fetchPatientByHospitalNumber: actions.fetchByHospitalNumber,
  fetchAllAppointments: fetchAllAppointments
};

export default connect(mapStateToProps, mapActionToProps)(HomePage);
