import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import MatButton from '@material-ui/core/Button';
import './PatientRegistrationPage.css'
import {Col,  Form,  FormGroup,Input, Label,Row,Alert,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {  Card,CardContent, }
from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { IoMdFingerPrint } from "react-icons/io";
import { FaFileImport } from "react-icons/fa";
import {FaPlusSquare} from 'react-icons/fa';
import 'react-widgets/dist/css/react-widgets.css';
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
//Date Picker
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
// React Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from 'components/Title/CardTitle';
import {url} from 'axios/url';
import * as actions from "../../store/actions/patients/patients";
import {initialfieldState_patientRegsitration}  from './initailFieldState';
import useForm from '../Functions/UseForm';


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
      width: 300,
    },
    button: {
      margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.default,
      },
      inline: {
        display: 'inline',
      },
    
  }));


const PatientRegistration = (props) => {
    // const [currentId, setCurrentId] = useState(0) ;
    const classes = useStyles();
    const apicountries = url+"countries";
    const apistate = url+"state/country/";
    //Getting List of Countries and State
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [relatives, setRelatives] = useState([]);
    const [relative, setRelative] = useState([{}]);
    const relationshipTypes = [{id:"1", name:"Father"},{id:"2", name:"Mother"},
    {id:"3", name:"Sister"},{id:"4", name:"Brother"}];
    const [patient, setPatient] = useState({  initialfieldState_patientRegsitration });  
  
    //Get countries
    useEffect(() => {
        async function getCharacters() {
            try{
          const response = await fetch(apicountries);
          const body = await response.json();          
          setCountries(body.map(({ name, id }) => ({ label: name, value: id })));
          const defaultCountryId = body.find(x => x.name === 'Nigeria').id;
          setPatient({...patient, countryId: defaultCountryId});         
          setStateByCountryId(defaultCountryId);
          }catch(error){
              console.log(error);
          }
        }
        getCharacters();
      }, []);


   //toast msg.
    const { addToast } = useToasts()
    //Get States from selected country 
    const getStates = (e) => {
        setPatient({...patient, [e.target.name]: e.target.value});
        const getCountryId = e.target.value;
        setStateByCountryId(getCountryId);
        
    }

    function setStateByCountryId (getCountryId) {
        async function getCharacters() {
            const response = await fetch(apistate+getCountryId);            
            const stateList = await response.json();
            setStates(stateList.map(({ name, id }) => ({ label: name, value: id })));
            
          }
          getCharacters();
    }

    //fetch province
    const getProvinces = (e) => {
        setPatient({...patient, [e.target.name]: e.target.value});
        const stateId = e.target.value;
        
        console.log(stateId);
        async function getCharacters() {
            const response = await fetch("/api/province/state/"+stateId);
            const provinceList = await response.json();
            console.log(provinceList);
            setProvinces(provinceList.map(({ name, id }) => ({ label: name, value: id })));
          }
          getCharacters();
    }

    function getRelationshipName(id) {
        return id ? relationshipTypes.find(x => x.id === id).name : "";
    }
    

      const addRelative = value => {
        const allRelatives = [...relatives,  value ];
        setRelatives(allRelatives);
      };
      
      const removeRelative = index => {
        const allRelatives = [...relatives];
        allRelatives.splice(index, 1);
        setRelatives(allRelatives);
      };

      const handleAddRelative = e => {
        e.preventDefault();
        if (!relative) return;
        addRelative(relative);
        setRelative({email:"", firstName:"", lastName:"",
            otherNames:"", relationshipTypeId:"", mobilePhoneNumber:"", address:""});
      };

      const onRelativeChange = e => {
        //  e.preventDefault();
        setRelative({...relative, [e.target.name]: e.target.value});
       
        }

    // 
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('hospitalNumber' in fieldValues)
            temp.hospitalNumber = fieldValues.hospitalNumber ? "" : "This field is required."
        if ('dateRegistration' in fieldValues)
            temp.dateRegistration = fieldValues.dateRegistration ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialfieldState_patientRegsitration, validate)
    
    
        // setValues({...values, dateRegistration: newDatenow});
        //The Submit Button Implemenatation 
        const handleSubmit = e => {
            const newDatenow = moment(values.dateRegistration).format('DD-MM-YYYY');
            //setValues({ dateRegistration: newDatenow});           
            values['dateRegistration']= newDatenow;
            values['personRelativeDTOList']= relatives;
            console.log(values);
            e.preventDefault()

            
            if (validate()) {
                const onSuccess = () => {
                    resetForm()
                    addToast("Submitted successfully", { appearance: 'success' })
                }
                const onError = errstatus => {
                    console.log(errstatus);
                    addToast(errstatus, { appearance: 'warning' })
                }
                props.createPatient(values, onSuccess,onError)
           
            }
        }

  return (
    <Page title="Patient Registration" >
        <ToastContainer autoClose={3000} />
        <Alert color="primary">
        All Information with Asterisks(*) are compulsory 
      </Alert>
    <Form onSubmit={handleSubmit}>
         {/* First  row form entry  for Demographics*/}
        <Row>
        <Col xl={12} lg={12} md={12}>
        <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Basic Information <br/>
                    
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"
                            startIcon={<FaFileImport />}>
                            Import image
                        </MatButton>
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"  startIcon={<IoMdFingerPrint />}>
                            Finger print
                        </MatButton> 
                        <br/> 
                </Title>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="hospitalNumber">Patient Id</Label>
                                <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Patient ID " value={values.hospitalNumber} onChange={handleInputChange} required/>
                            </FormGroup>
                            </Col>
                            
                            <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Date Of Registration</Label>
                                
                                <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   value={values.dateRegistration}   onChange={value1 => setValues({...values, dateRegistration: value1})}
                                defaultValue={new Date()} max={new Date()}
                                required/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={values.firstName} onChange={handleInputChange} required/>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Other Name(s)</Label>
                                <Input type="text" name="otherNames" id="otherNames" placeholder="Middle Name" value={values.otherNames} onChange={handleInputChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="lastName">Last Name </Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={values.lastName} onChange={handleInputChange} required/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="maritalStatus">Gender</Label>
                                    <Input type="select" name="genderId" id="genderId" value={values.genderId} onChange={handleInputChange} required>
                                        <option value="1">Female</option>
                                        <option value="2">Male</option>
                                    </Input>
                                </FormGroup>  
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="occupation">Occupation</Label>
                                <Input type="select" name="occupationId" id="occupationId" value={values.occupationId} onChange={handleInputChange}>
                                    <option value="1">Students</option>
                                    <option value="2">Business</option>
                                    <option value="3">Government</option>
                                </Input>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="qualification">Hightest Qualification</Label>
                                <Input type="select" name="educationId" value={values.educationId} onChange={handleInputChange}>
                                    <option value="1">PHD</option>
                                    <option value="2">MSC</option>
                                    <option value="3">BSC</option>
                                    <option value="4">HND</option>
                                    <option value="5">NCE</option>
                                </Input>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="maritalStatus">Marital Status</Label>
                                <Input type="select" name="maritalStatusId" id="maritalStatusId" value={values.maritalStatusId} onChange={handleInputChange}>
                                    <option value="1">Single</option>
                                    <option value="2">Married</option>
                                    <option value="3">Divorce</option>
                                </Input>
                            </FormGroup>  
                            </Col>
                            <Col md={4}>
                            <FormGroup >
                                <Label>Date OF Birth</Label>
                                <DateTimePicker time={false} name="dob"  dropUp onChange={value1 => setPatient({...patient, dob: value1})} max={new Date()} required/>
                            </FormGroup>
                            </Col>
                            <Col md={4} >
                                {/* Estimate Date of birth in a row  */}
                                <Row form>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Year</Label>
                                            <Input type="text" name="year" id="year" placeholder="Year" value={patient.Estimate} onChange={handleInputChange} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Months</Label>
                                            <Input type="text" name="months" id="months" placeholder="Months" value={values.EstimateMonths} onChange={handleInputChange} />
                                        </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                        <FormGroup>
                                            <Label for="year">Days</Label>
                                            <Input type="text" name="days" id="days" placeholder="Days" value={values.EstimateDays} onChange={handleInputChange} />
                                        </FormGroup>
                                        </Col>
                                </Row>
                            </Col>           
                            <Col md={4}>
                            <FormGroup check>
                                <Label></Label>
                                <Input type="checkbox"/>Estimated Date of  Birth
                            </FormGroup>
                            </Col>
                        </Row>
                </CardContent>

            </Card>
            </Col>
        </Row>
        {/* Second row form entry  for contact details*/}
        <Row>
        <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>  
                                         
                <CardContent>
                <Title >Contact Details <br/></Title>
                        <Row form>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="phoneNumber">Phone Number</Label>
                                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" value={values.mobilePhoneNumber} 
                                onChange={handleInputChange} />
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="altPhoneNumber">Alt. Phone Number</Label>
                                <Input type="text" name="alternatePhoneNumber" id="alternatePhoneNumber" placeholder="Alternative Number" value={values.alternatePhoneNumber}  onChange={handleInputChange}/>
                            </FormGroup>
                            </Col>
                            <Col md={4}>
                            <FormGroup>
                                <Label for="emailAddress">Email Address</Label>
                                <Input type="email" name="email" id="email" placeholder="Email Address" value={values.email} onChange={handleInputChange}  />
                            </FormGroup>
                            </Col>
                        </Row>
                    <Row>
                        <Col xl={12} lg={12} md={12}>
                            <Card className={classes.cardBottom}>

                                <CardContent>
                                    <Title > Address <br/></Title>

                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="country">Country</Label>
                                                <Input type="select" name="countryId" id="countryId" value={values.countryId}  onChange={getStates}>
                                                    {countries.map(({ label, value }) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </Input>

                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="stressAddress">State</Label>
                                                <Input type="select" name="stateId" id="stateId" placeholder="Select State" value={values.stateId} onChange={getProvinces}>
                                                    {states.map(({ label, value }) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="lga">Province/District/LGA </Label>
                                                <Input type="select" name="provinceId" id="provinceId" placeholder="Select Province" value={values.provinceId} onChange={handleInputChange}>
                                                    {provinces.map(({ label, value }) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>


                                    </Row>

                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="city">Street Address</Label>
                                                <Input type="text" name="city" id="city" placeholder="City" value={values.city}  onChange={handleInputChange}/>
                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="landMark">Land Mark</Label>
                                                <Input type="text" name="landmark" id="landmark" placeholder="Land Mark" value={values.landmark}  onChange={handleInputChange}/>
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>

                </CardContent>
            </Card>
            </Col>
        </Row>

    {/* Third  row form entry  for Contact Address*/}

         {/* fourth  row form entry  for Relatives*/}
         <Row>
            <Col xl={12} lg={12} md={12}>
            <Card className={classes.cardBottom}>                                          
                <CardContent>
                    <Title > 
                        Relatives 
                        <MatButton
                            variant="contained"
                            color="primary" className=" float-right mr-1"  startIcon={<FaPlusSquare />}  onClick={handleAddRelative}>
                            Add Relative 
                        </MatButton> 
                   
                    </Title>
                    <br/>
                            <Row form>
                            <Col md={3}>
                            <FormGroup>
                                <Label for="occupation">Relationship Type</Label>
                                <Input type="select" name="relationshipTypeId" id="relationshipTypeId" value={relative.relationshipTypeId} onChange={onRelativeChange}  >
                                <option value="">Select Relative Relationship Type</option>
                                {relationshipTypes.map(({ id, name }) => (
                                                <option key={id} value={id}>
                                                {name}
                                                </option>
                                                ))}
                                </Input>
                            </FormGroup>
                            </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" value={relative.firstName}  placeholder="First Name" onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="middleName">Middle Name</Label>
                                    <Input type="text" name="otherNames" id="otherNames" placeholder="Middle Name"  value={relative.otherNames} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="lastName">Last Name </Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={relative.lastName} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row form>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="relativePhoneNumber">Phone No.</Label>
                                    <Input type="text" name="relativePhoneNumber" id="relativePhoneNumber" placeholder="Relative Phone No." value={relative.mobilePhoneNumber} onChange={e => setRelative({...relative, mobilePhoneNumber: e.target.value})}/>
                                </FormGroup>
                                </Col>
                                <Col md={3}>
                                <FormGroup>
                                    <Label for="email">Email Address</Label>
                                    <Input type="text" name="email" id="email" placeholder="Relative Email Address" value={relative.email} onChange={onRelativeChange}/>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input type="text" name="address" id="address" placeholder="Relative Address" onChange={onRelativeChange} value={relative.address}/>
                                </FormGroup>  
                                </Col>
                            </Row>
                            <Row>
                            <Col md={12}>
                            <div className={classes.demo}>
                            <List>
                            {relatives.map((relative, index) => (
                            <RelativeList
                            key={index}
                            index={index}
                            relative={relative}
                            removeRelative={removeRelative}
                            relationshipTypeName={getRelationshipName(relative.relationshipTypeId)}
                            />
                            ))}
                            </List>
                        </div>
                        </Col>
                            </Row>
                            <Row>
                            <Col md={12}>
                            
                            </Col> 
                            </Row>
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
                                    
                                    className={classes.button}
                                    startIcon={<CancelIcon />}
                                >
                                Cancel
                            </MatButton>  

                                
                    </CardContent>
                </Card>
                </Col>
            </Row>
    </Form>
</Page>
  );
};


function RelativeList ({ relative, index, removeRelative, relationshipTypeName }) {

    return (
        <ListItem>
                  <ListItemText
                    primary={ <React.Fragment>
                        {relationshipTypeName}, {relative.firstName} {relative.otherNames} {relative.lastName}</React.Fragment> }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                         
                          color="textPrimary"
                        >
                        {relative.mobilePhoneNumber} {relative.email} <br></br>
                        </Typography>
                        {relative.address}
                      </React.Fragment>
                    }
                  />
                  
                  <ListItemSecondaryAction  onClick={() => removeRelative(index)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
                
    );
  } 

  const mapStateToProps = state => ({
    patientList: state.patients.list
})

const mapActionToProps = {
    createPatient: actions.create,
    //updatePatient: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(PatientRegistration);
