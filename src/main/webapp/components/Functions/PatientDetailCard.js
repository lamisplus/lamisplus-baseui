import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import   { Age } from 'components/Functions/GetAge';
import {connect} from 'react-redux';
import { Col, Row, } from 'reactstrap'


const useStyles = makeStyles(theme => ({
   
root2: {

   width: '100%',
   backgroundColor: theme.palette.background.paper,
   fontSize: 13,
   spacing: value => value ** 1
   },
   }));


 function PatientDetailCard (props){
    const classes = useStyles();
   
return (
    <div className={classes.root2}>
        <ExpansionPanel >
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
               <  Row style={{marging:"0px" }}>
                  <Col md={4}>
                     <span style={{marging:"0px" }}> Patient ID : <b>{props.patient.hospitalNumber}</b></span>
                  </Col>
                  
                  <Col md={4}>
                     <span style={{marging:"0px" }}>Date Of Birth : <b>{props.patient.dob}</b></span>
                  </Col>
                  <Col md={4}>
                     <span> Age : <b>{Age(props.patient.dob)}</b></span>
                  </Col>
                  <Col md={4}>
                     <span> Name : <b>{props.patient.firstName} {' '} {props.patient.lastName} </b></span>
                  </Col>
                  <Col md={4}>
                     <span>  Gender : <b>{props.patient.genderId ===1 ? 'Female' : 'Male'}</b></span>
                  </Col>
                  <Col md={4}>
                     <span> Phone Number : <b>{props.patient.mobilePhoneNumber || 'N/A'}</b></span>
                  </Col>
                  <Col md={4}>
                     <span>  Email Address : <b>{props.patient.email || 'N/A'}</b></span>
                  </Col>
               </Row>

               </ExpansionPanelSummary>
               
            </ExpansionPanel></div>
)

}

const mapStateToProps = state => {
    return {
    patient: state.patients.patient
    }
  }

  
  export default connect(mapStateToProps, {})(PatientDetailCard)