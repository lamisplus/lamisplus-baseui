import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ToastContainer } from 'react-toastify'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// {/* Auto textfield complete */}
import {
    MdDashboard,
    MdContacts
  } from 'react-icons/md';
import {GiFiles,GiTestTubes } from 'react-icons/gi';  
import { FaBriefcaseMedical} from "react-icons/fa"; 
//{/*  Check box list */}

import PatientChart from 'components/PatientConsultation/PatientChart';
import PatientDashboardSubMenu from 'components/PatientConsultation/PatientDashboardSubMenu'
import PatientAllergies from 'components/PatientDashboard/PatientAllergies';
import PatientVitals from 'components/PatientDashboard/PatientVitals';
import ClinicalHistory from 'components/PatientDashboard/ClinicalHistory';
import Consultation from './consulatation/consultation';
import PatientDetailCard from 'components/Functions/PatientDetailCard';
import TestOrder from './TestOrder/TestOrder';
import Medication from './Medication/Medication';
import ServiceForm from './ServiceForm/serviceForm';
import {  Card, CardBody, CardDeck} from 'reactstrap';
import * as actions from "actions/patients";
import {connect} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';


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

const useStyles = makeStyles(theme => ({
  root2: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin:theme.spacing(7),
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 12,
          
      },
      pos: {
        fontSize: 11,
      },
    cardContent:{
        padding: 2,
    },
    cardroot:{
        margin:theme.spacing(1),
        height: 250 + 'px !important' ,
    }
    
    },
    alertmsge:{
        marginTop: theme.spacing(2),
    },
    rootaccordia: {
        width: '100%',
    },
    accordiaheading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    allergiesroot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    
    checkboxroot: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
        
    },

    formroot: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
        textDecoration: 'underline',
        },
    },
    inforoot: {
        width: '100%',
        margin: 0,
        backgroundColor: '#eee',
    },
    navItemText: {
      padding: theme.spacing(2),
    },
    }));

    const cardHeight = {
        height: 200, 
        position: 'relative',
        overflow: 'auto',
    };

function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);  
  const [fetchingPatient, setFetchingPatient] = useState(false);
  const hospitalNumber = props.location.state.hospitalNumber || props.patient.hospitalNumber || '';


  const isEmpty = (value) => {
    if(JSON.stringify(value) === "{}"){
      return true;
    }
    return false;
  }

  React.useEffect(() => {
    setFetchingPatient(true);
    const onSuccess = () => {
      setFetchingPatient(false);
    }
    const onError = () => {
      setFetchingPatient(false);
    }
    props.fetchPatientByHospitalNumber(hospitalNumber, onSuccess, onError)
  }, [hospitalNumber]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 switch (isEmpty(props.patient)) {

 }
  return (
  
  <div>
    
    {/* Show couldnt load patient info if api call to fetch patient is unsuccessful, else show patient dashboard */}
    { (!fetchingPatient && isEmpty(props.patient)) ? 
    <div className={classes.inforoot}>
        Couldn't load patient information.
      </div> :

      <div className={classes.root}> 

        <div className={classes.inforoot} >
            <PatientDetailCard />   
        </div> 
       
      <AppBar position="static" >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="white"
          aria-label="scrollable force tabs example"
        >
          <Tab className={classes.title} label="Dashboard" icon={<MdDashboard />} {...a11yProps(0)} />  
          <Tab className={classes.title} label="Consultation" icon={<MdContacts />} {...a11yProps(1)} />
          <Tab className={classes.title} label="Service Form" icon={<GiFiles />} {...a11yProps(2)} />
          <Tab className={classes.title} label="Test Order" icon={<GiTestTubes />} {...a11yProps(3)} />
          <Tab className={classes.title} label="Medication" icon={<FaBriefcaseMedical />} {...a11yProps(4)} />          ,l
        </Tabs>
        <div>
     
    </div>
      </AppBar>
      <ToastContainer />
      { fetchingPatient ? 

<LinearProgress color="primary" thickness={5}/>
: <div>

 <PatientDashboardSubMenu />
    
      {/* The DashBoard Tab  */}
      <TabPanel value={value} index={0}>
      <CardDeck>
         <PatientVitals patientId={props.patient.patientId}  /> 
        <PatientAllergies height={cardHeight} addstatus={false} /> 
      </CardDeck>
      <br></br>
    <PatientChart patientId={props.patient.patientId}  />
    <br></br>
    <Card>
                        <CardBody>
                            <ClinicalHistory />                     
                        </CardBody>                      
                    </Card>
</TabPanel>
    {/* End of dashboard */}

{/* Begining of consultation  */}
<TabPanel value={value} index={1}>
            <Consultation patientId={props.patient.patientId } visitId={props.patient.visitId} />
</TabPanel>    
 {/* End of consultation */}
 
 {/* service forms */}
 <TabPanel value={value} index={2}>    
    <ServiceForm patientId={props.patient.patientId } visitId={props.patient.visitId}/>            
</TabPanel>
{/* service forms */}

{/* test orders */}
      <TabPanel value={value} index={3}>
        <TestOrder patientId={props.patient.patientId } visitId={props.patient.visitId}/>
      </TabPanel>
    {/* test orders */}

 {/* medication */}
    <TabPanel value={value} index={4}>
        <Medication patientId={props.patient.patientId } visitId={props.patient.visitId}  />
      </TabPanel>
       {/* medication */}

      <TabPanel value={value} index={6}>
      
      </TabPanel>
      </div>
    }
      
      </div>
}
   </div>  
  );
}

const mapStateToProps = state => {
  return {
  patient: state.patients.patient
  }
}

const mapActionToProps = {
  fetchPatientByHospitalNumber: actions.fetchByHospitalNumber,
}

export default connect(mapStateToProps, mapActionToProps)(HomePage)