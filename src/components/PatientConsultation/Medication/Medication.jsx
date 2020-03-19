import React, {useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardBody,
    Col,
    Row,
    Card,
    FormGroup,
    Label,
    Input,
    Form,
    Alert,
} from 'reactstrap';
import MatButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//import moment from 'moment';
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';  
import {url} from 'axios/url';

//Dtate Picker package
Moment.locale('en');
momentLocalizer();

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
          width: '95%',
          margin: 20,
          backgroundColor: '#eee',
      },
      })); 
    const cardStyle = {
        borbderColor: '#fff',
        marginBottom: 10,
    };


export default function Medication(props) {
    const [drugOrder, setDrugOrder] = React.useState([]);
    const [successMsg, setSuccessMsg] = React.useState();
    const classes = useStyles();
     //Get countries    
     
    //POST METHOD TO SAVE THE RECORD
    const {getpatient} =props.getpatientdetails ;
    const PatientID = getpatient.row.patientId;
    const visitId = getpatient.row.id;
   const [medis, setmedis] = useState([]);
    
    const [showLoading, setShowLoading] = useState(false);  
    const apiUrl = url+"encounters/GENERAL_SERVICE/DRUG_ORDER_FORM/"+PatientID;  
    
    const saveDrugOrders = (e) => { 
    e.preventDefault();  
        setSuccessMsg("");
    const data = {
            formData : medis,
            patientId: PatientID, 
            visitId:visitId,
            formName: 'DRUG_ORDER_FORM',
            serviceName: 'GENERAL_SERVICE',

    }; 
    console.log(data);
    axios.post(apiUrl, data)
        .then((result) => {          
            setShowLoading(false);
            props.history.push('/checkedin-patients')
            toast.success(" Successful!");
            setSuccessMsg("Drug Order Successfully Saved!");
        }).catch((error) => {
            console.log(error);
        setShowLoading(false)
        setmedis([]);

        }
        ); 
    };
  
    const addDrugs = value => {
        console.log('adding drug');
        console.log(value);
        const allmedis = [...medis,  value ];
        setmedis(allmedis);
        console.log(medis);
      };
      
      const removeDrug = index => {
        const allMedis = [...medis];
        allMedis.splice(index, 1);
        setmedis(allMedis);
        console.log(medis);
      };
      const drugOrdersApi = url+"encounters/pharmacy/drugs";
      React.useEffect(() => {
        async function fetchDrugs() {
          const response = await fetch(drugOrdersApi);
          const body = await response.json();
          setDrugOrder(body.map(({ genericName, id }) => ({ label: genericName, value: id })));
           console.log(body);
        }
        fetchDrugs();
       
      }, []);
      function getDrugName(id) {
        return drugOrder.find(x => x.value === id).label;
        //return 'drugNMw';
    }
  return (
          <Row>
                <Col lg={5} >
                  <Card  style={cardStyle} className=" p-3">
                    <CardBody>
                        <Typography className={classes.title} color="primary" gutterBottom>
                                        Drug Order
                        </Typography>
                         <div>
                         {successMsg ? 
                        <Alert color="success"> 
                    {successMsg}
            </Alert> : ""
            }
                         <NewDrugOrderForm addDrugs={addDrugs} drugOrder={drugOrder} />
                                        </div>

                                      
                                   
                    </CardBody>
                  </Card>
                </Col>
                
                <Col lg={7} >
               
                { medis.length > 0 ?
                    <Row>
                        
                        <br/>
                        <br/>
                       
                        <Col lg={12} >
                            <Card  style={cardStyle} >
                                <CardBody>
                                    <Typography className={classes.title} color="primary" gutterBottom>
                                    <Col md={12}>
                                    
                                        <div className={classes.demo}>
                                            <List>
                                            {medis.map((medi, index) => (
                                            <CurrentDrugOrders
                                            key={index}
                                            index={index}
                                            medi={medi}
                                            removeDrug={removeDrug}
                                            drugTypeName={getDrugName(medi.drug_order)}
                                            />
                                            ))}
                                            </List>
                                    </div>
                                    </Col>
                                    </Typography>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={12}>
                        <MatButton  
                                        type="submit" 
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        onClick={saveDrugOrders}
                                        >
                                        Save &nbsp;
                                        { showLoading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : ""}
                                </MatButton> 
                        </Col>
                   
                                            </Row>
                  : ""}
                </Col> 
               
              </Row>   
  );
}

function NewDrugOrderForm({addDrugs, drugOrder}){
    
    const classes = useStyles();
    const [medi, setmedi] = useState({start_date : new Date()}); 
    const [errorMsg, setErrorMsg] = useState('');
    const onChange = (e) => {
        e.persist();     
        setmedi({...medi, [e.target.name]: e.target.value});
        } 
    
    const handleAddDrugs = e => {
        e.preventDefault();
        setErrorMsg('');
        if (!medi) return;
//
        if(!(medi.start_date && medi.duration_unit && medi.duration && medi.dose  && medi.dose_frequency && medi.drug_order)){
            window.scrollTo(0, 0);
            setErrorMsg('Fill all required fields');    
            return;
        }
        addDrugs(medi);
        setmedi({start_date:new Date(), duration_unit:"", comment:"",
           duration:"", dose:"",drug_order:"", generic_name:"", dose_frequency:""});
      };


    return (
        <Form className={classes.formroot} >
 {errorMsg ? 
                        <Alert color="danger"> 
                    {errorMsg}
            </Alert> : ""
            }
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Drug Generic Name</Label>
                                                <Input type="select" name="drug_order" id="drug_order" 
                                                    value={medi.drug_order}
                                                    onChange={onChange}>
                                                    
                                                        {drugOrder.map(({ label, value }) => (
                                                            <option key={value} value={value}>
                                                            {label}
                                                            </option>
                                                        ))}
                                                    </Input>
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Dose <small >(Amount of medication taken at one time)</small></Label>
                                                <Input type="text" name="dose" id="dose" placeholder="Dose" 
                                                    value={medi.dose}
                                                    onChange={onChange}
                                                />
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Dose Frequency <small>(Frequency of dose per day)</small></Label>
                                                <Input type="text" name="dose_frequency" id="dose_fequency" placeholder="Dose Frequency" 
                                                    value={medi.dose_frequency}
                                                    onChange={onChange}
                                                />
                                            </FormGroup>  
                                        </Col>
                                        <Col md={12}>
                                            <Label for="middleName">Start Date</Label>
                                
                                            <DateTimePicker time={false} name="start_date"  id="start_date"   value={medi.start_date}   onChange={value1 => setmedi({...medi, start_date:value1})}
                                                defaultValue={new Date()} max={new Date()} format='D/M/Y'
                                                />
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                            <Label for="hospitalNumber">Duration</Label>
                                                <Input type="text" name="duration" id="duration" placeholder="Duration" 
                                                value={medi.duration}
                                                onChange={onChange}
                                                />
                                            </FormGroup>  
                                         </Col>
                                        <Col md={12}>
                                                <FormGroup>
                                                <Label for="hospitalNumber">Duration Unit</Label>
                                                <Input type="select" name="duration_unit" id="duration_unit"  value={medi.duration_unit}
                                                        onChange={onChange}>
                                                    <option value="">Select a duration unit</option>        
                                                    <option value="Days">Days</option>
                                                    <option value="Weeks">Weeks</option>
                                                    <option value="Months">Months</option>
                                                </Input>
                                                </FormGroup>  
                                        </Col>
                                         <Col md={12}>
                                                <FormGroup>
                                                <Label for="hospitalNumber">Enter Instruction</Label>
                                                    <Input type="text" name="comment" id="comment" placeholder="Enter Instruction" 
                                                        value={medi.comment}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>  
                                         </Col>
                                             <br/>

                                             <MatButton  
                                                type="submit" 
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={handleAddDrugs}
                                            >
                                                Add
                                            </MatButton>

                                               </Form >
    )

}
function CurrentDrugOrders ({ medi, index, removeDrug, drugTypeName }) {

    return (
        <ListItem>
                  <ListItemText
                    primary={
                    <React.Fragment>{drugTypeName}, {medi.dose} unit(s) to be taken {medi.dose_frequency} time(s) a day</React.Fragment> 
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                         
                          color="textPrimary"
                        >
                        Start at {medi.start_date.toLocaleDateString()} for {medi.duration} {medi.duration_unit} <br></br>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  
                  <ListItemSecondaryAction  onClick={() => removeDrug(index)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
                
    );
  } 

