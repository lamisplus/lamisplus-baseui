import React, {useState} from 'react';
import MatButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
}
    from '@material-ui/core';
import {
    Col,
    FormGroup,
    Input,
    Label,
    Row,
  } from 'reactstrap';
import Title from 'components/Title/CardTitle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Spinner from 'react-bootstrap/Spinner';
// React Notification
import { toast } from "react-toastify";
//Date Picker
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';

import axios from 'axios';  
import {url} from 'axios/url';

//Dtate Picker package
Moment.locale('en');
momentLocalizer();

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height:45,
        width: 350,
    },
    button: {
        margin: theme.spacing(1),
    },

    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));
 
export default function AddVitalsPage(props) {
    const classes = useStyles();

    //Save Vitals 
        const [vitals, setVitals] = useState({ 
                formName: 'VITALS_SIGN_FORM', 
                patientId: props.patient.patientId, 
                serviceName:'CLINICAL_SERVICE', 
                visitId:props.patient.id, 
                dateEncounter:new Date() 
            }); 
        const [formDataForVitals, setformDataForVitals] = useState({pulse:"", respiratoryRate:"", temperature:"", diastolic:"", systolic:"", bodyWeight:"", height:""}) 
        const [showLoading, setShowLoading] = useState(false);  
        const apiUrl = url+"encounters";   

        const SaveVitals = (e) => { 
            console.log('the save button is call'); 
        e.preventDefault();  
        const newDatenow = moment(vitals.dateEncounter).format('DD-MM-YYYY');
        const data = { 
                formName: 'VITAL_SIGNS_FORM', 
                patientId:vitals.patientId, 
                serviceName:'GENERAL_SERVICE' ,
                visitId:vitals.visitId,
                formData:formDataForVitals,
                dateEncounter:newDatenow
        };  
        console.log(data);
        axios.post(apiUrl, data)
            .then((result) => {  
                toast.success("Patient Checked In was Successful!");        
                setShowLoading(false);
                props.history.push('/checkedin-patients') 
                console.log(result);
            }).catch((error) => {
                //toast.danger("Processing Please wait "); 
                console.log(error);
            setShowLoading(false)
            setVitals(false);
            // console.log("Error in CreateBook!");
            //toast.error("Something went wrong!");
            }
            ); 
        };

    const onChangeFormdata = (e) => {
        e.persist();     
        setformDataForVitals({...formDataForVitals, [e.target.name]: e.target.value});
        } 


    return (
        
            <form className={classes.form} onSubmit={SaveVitals}>
               
                <Card className={classes.cardBottom}>
                    <CardContent>
                        <Title >New Vitals Signs --- {props.patient.hospitalNumber}
                        </Title>
                        <br/>

                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="hospitalNumber">Date of Vitals</Label>
                                <DateTimePicker time={false} name="dateEncounter"  id="dateEncounter"   value={vitals.dateEncounter}   onChange={value1 => setVitals({...vitals, dateEncounter: value1})}
                                defaultValue={new Date()} max={new Date()}
                            />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Pulse(bpm)</Label>
                                <Input type="text" name="pulse" id="pulse" placeholder=" " value={formDataForVitals.pulse}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Respiratory Rate(bpm)</Label>
                                
                                <Input type="text" name="respiratoryRate" id="respiratoryRate" placeholder="" value={formDataForVitals.respiratoryRate}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Temparature (C)</Label>
                                <Input type="text" name="temperature" id="temperature" placeholder="" value={formDataForVitals.temperature}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form> 
                        <Col md={6}>
                            <FormGroup>
                                <Label for="hospitalNumber">Diastolic(mmHg)</Label>
                                <Input type="text" name="diastolic" id="diastolic" placeholder=""  value={formDataForVitals.diastolic}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>                          
                            <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Systolic(mmhg)</Label>
                                <Input type="text" name="systolic" id="systolic" placeholder=""  value={formDataForVitals.systolic}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Weight Kg</Label>
                                <Input type="text" name="bodyWeight" id="bodyWeight" placeholder="" value={formDataForVitals.bodyWeight}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="middleName">Height</Label>
                                
                                <Input type="text" name="height" id="height" placeholder="" value={formDataForVitals.height}
                                    onChange={onChangeFormdata}/>
                            </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={12}>
                            {showLoading && 
                                
                                <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                                </Spinner> 
                            } 
                            </Col> 
                        </Row>
                        <br/>
                        <MatButton  
                                type="submit" 
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                             >
                                Save
                        </MatButton>
                        <MatButton
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<CancelIcon />}
                        >
                            Cancel
                        </MatButton>
                    </CardContent>
                </Card>
            </form>
    );
}