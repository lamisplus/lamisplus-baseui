import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from 'api/index';
import {
    Col,
    Row,
    Card,
    CardHeader,
    CardBody
  } from 'reactstrap';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      

    },
    chips: {
        fontSize: 11,
        marginRight: 30
      },
    
    
  },
}));
const chips = {
    marginLeft: 0
};

export default function PatientVitals(props) {
    const {getpatient} =props.getpatientdetails ;
    const getpatientID = getpatient.row.patientId;
    const classes = useStyles();
    const [data, setData] = useState({pulse:'', height: '', systolic: '', diastolic: '', bodyWeight: ''}); 
    // const newid = data;
    
    console.log(data.patientId);
    const apistate = url+"encounters/GENERAL_SERVICE/VITAL_SIGNS_FORM/"+getpatientID+"/last";
    useEffect(() => {    
    const GetData = async () => {    
        const result = await axios(apistate);    
        setData(result.data.formData);  
        console.log(result.data.formData);   
    }  
    GetData();     

    }, []); 

  return (
    
            <Card  >
                    <CardHeader> Recent Vital Signs</CardHeader>
                        
                    <CardBody>
                    <Row item xs='12'>
                           <Col item xs='6'>             
                        Pulse (bpm) :< span> <b>{data.pulse || 'N/A'}</b></span> 
                                    
                                </Col>
                          
                                <Col item xs='6'>
                                            Weight (kg): <span><b>{data.bodyWeight || 'N/A'}</b></span>                                 
                                            </Col>
                                <Col item xs='6'>
                                            RR (bpm): <span><b>{data.respiratoryRate || 'N/A'}</b></span> 
                                </Col>
                                <Col item xs='6'>
                                            Height (m): <span><b>{data.height || 'N/A'}</b></span>  
                                </Col>
                                <Col item xs='6'>
                                            Temperature (C):  <span><b>{data.temperature || 'N/A'}</b></span> 
                                </Col>
                                <Col item xs='6'>
                                            BMI: <span><b>{data.pulse || 'N/A'}</b></span> 
                                </Col>
                                <Col item xs='6'>
                                            Blood Pressure (mmHg): <span><b>{data.pulse || 'N/A'}</b></span> 
                                </Col>
                                <Col item xs='6'>
                                            BMI Status: <span><b>{data.pulse || 'N/A'}</b></span> 
                                </Col>
                                </Row>
                    </CardBody>                      
            </Card>                     
  );
}