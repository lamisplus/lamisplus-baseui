import React, { useState }  from 'react'
import { Button, Dropdown, Menu,} from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { url } from "api/index";
import Popover from '@material-ui/core/Popover';
import {connect} from 'react-redux';
import { Badge } from 'reactstrap';
import CheckInModal from 'components/CheckIn/CheckInModal';
import FormRendererModal from 'components/FormManager/FormRendererModal';
import * as CODES from "api/codes";
import { ToastContainer, toast } from 'react-toastify'

const useStyles = makeStyles(theme => ({
    navItemText: {
        padding: theme.spacing(2),
      }
      }));

function PatientDashboardSubMenu (props){
  const classes = useStyles();
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const formInfo = [
      {
          formCode:CODES.ADMIT_PATIENT_FORM,
          programCode:CODES.GENERAL_SERVICE,
          formName:"ADMIT_PATIENT"
      }
  ]
  const checkInPatient = () => {
    setCheckIn(true);
  }
  const checkOutPatient = () => {

  }
  const onSuccess = () => {
    toast.success('Form saved successfully!', { appearance: 'success' })
    setShowFormModal(false);
  }
  const admitPatient = () => {
      setCurrentForm({
        code:CODES.ADMIT_PATIENT_FORM,
        programCode:CODES.GENERAL_SERVICE,
        formName:"ADMIT_PATIENT"
    });
      setShowFormModal(true);
  }
  const [relationshipTypes, setRelationshipTypes] = useState(false);
 /*# Get list of RELATIVE parameter from the endpoint #*/
 React.useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(`${url}/application-codesets/codesetGroup?codesetGroup=RELATIONSHIP`);
        const body = await response.json();
        setRelationshipTypes(body);
      } catch (error) {
        console.log(error);
      }
    }
    getCharacters();
  }, []);
    
  function getRelationshipName(id) {
        return id ? relationshipTypes.find(x => x.id == id).display : "";
      }
      
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    
    return (
        <React.Fragment>
      <Menu size='mini' color={"silver"} inverted  >
        <Menu.Item
          name='Alerts'
          active={false}
         
        >
            Alerts &nbsp;
            <Badge color="dark">0</Badge>
            </Menu.Item>
        <Menu.Item  name='Relationships' >
            <div  aria-describedby={id} onClick={handleClick}>
            Relationships &nbsp;
<Badge color="dark">{props.patient.personRelativeDTOs ? props.patient.personRelativeDTOs.length : 0}</Badge>
            </div>
            <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
       <List>
         {(props.patient.personRelativeDTOs && props.patient.personRelativeDTOs.length > 0 ) ? props.patient.personRelativeDTOs.map((relative, index) => (
                          <RelativeList
                            key={index}
                            index={index}
                            relative={relative}
                            relationshipTypeName={getRelationshipName(relative.relationshipTypeId)}
                          />
                        )) : 
                        <Typography className={classes.navItemText}>No Relationship </Typography>}
                      </List>
      </Popover>
        </Menu.Item>
         <Dropdown item text='Visit Actions'>
            <Dropdown.Menu>
            <Dropdown.Item onClick={admitPatient}>Admit Patient</Dropdown.Item>
            <Dropdown.Item>Transfer Patient to Ward / Service</Dropdown.Item>
            <Dropdown.Item>Transfer Out</Dropdown.Item>
            <Dropdown.Item>Discharge Patient</Dropdown.Item>
        
            </Dropdown.Menu>
          </Dropdown>

        <Menu.Menu position='right'>

         
        { (props.patient && props.patient.dateVisitStart ) ?
         <Menu.Item>
             Current Visit:&nbsp; <b>{props.patient.dateVisitStart} {props.patient.timeVisitStart}</b> | &nbsp; &nbsp;
         <Button color="black" onClick={checkOutPatient}>Check Out</Button>
       </Menu.Item>
       :
          <Menu.Item>
            <Button color="black" onClick={checkInPatient}>Check In</Button>
          </Menu.Item>
}
        </Menu.Menu>
      </Menu>
      <CheckInModal patientId={props.patient.patientId} showModal={checkIn} setShowModal={setCheckIn}/>
      <FormRendererModal patientId={props.patient.patientId} showModal={showFormModal} setShowModal={setShowFormModal} currentForm={currentForm} onSuccess={onSuccess}/>
      <ToastContainer />
      </React.Fragment>
    )
  }

function RelativeList({
    relative,
    relationshipTypeName
  }) {
    return (
      <ListItem>
        <ListItemText
          primary={
            <React.Fragment>
              {relationshipTypeName}, {relative.firstName} {relative.otherNames}{" "}
              {relative.lastName}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {relative.mobilePhoneNumber} {relative.email} <br></br>
              </Typography>
              {relative.address}
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }

const mapStateToProps = state => {
    return {
    patient: state.patients.patient
    }
  }
  
  const mapActionToProps = {
    
  }
  
  export default connect(mapStateToProps, mapActionToProps)(PatientDashboardSubMenu)