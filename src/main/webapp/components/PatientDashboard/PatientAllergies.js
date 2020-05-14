import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Col,
  FormGroup,
  Row,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import CreatableSelect from 'react-select/creatable';
import FormRendererModal from 'components/FormManager/FormRendererModal';
import * as CODES from "api/codes";
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  chiproot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
},
chip: {
    margin: theme.spacing(0.5),
},
}));

export const allergies = [
  { value: 'penicilin', label: 'Penicilin' },
  { value: 'egg', label: 'Egg' },
  { value: 'milk', label: 'Milk' },
  { value: 'peanut', label: 'Peanut'},
];

 function PatientAlert(props ) {
  const classes = useStyles(props);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(false);
  const handleChange = (newValue: any, actionMeta: any) => {
    props.setNewAllergy(newValue ? newValue.map(it => it.value) : []);    
  };
  const onSuccess = () => {
    toast.success('Form saved successfully!', { appearance: 'success' })
    setShowFormModal(false);
  }
  const addAllergy = () => {
    setCurrentForm({
      code:CODES.PATIENT_ALLERGY_FORM,
      programCode:CODES.GENERAL_SERVICE,
      formName:"PATIENT ALLERGY"
  });
    setShowFormModal(true);
}
  return (
<React.Fragment>
            <Card >
              <CardHeader>Allergies <button type="button" class="float-right ml-3" onClick={addAllergy}><i class="fa fa-plus"></i> Add Vitals</button></CardHeader>
                    <CardBody>
                        
                                    
                                      {props.patientAllergies ? props.patientAllergies.map((allergy, index) => (
                                    <Chip
                                          label={allergy}
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      )) : <Chip
                                      label="No Allergy"
                                      color="secondary"
                                      variant="outlined"
                                  />}
                                      
                            <br></br>
                            {props.addstatus && 
                      <Row form>
                         <Col md={12}>
                                            <FormGroup>
                                            <CreatableSelect
        isMulti
        onChange={handleChange}
        options={allergies}
        placeholder="Add New Allergy"
      />
                                        
                                            </FormGroup>
                                            </Col>
                                           
                                        </Row>

                            
                            }                            
                    </CardBody>                      
            </Card>
            <FormRendererModal patientId={props.patient.patientId} showModal={showFormModal} setShowModal={setShowFormModal} currentForm={currentForm} onSuccess={onSuccess}/>
      <ToastContainer />
      </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
  patient: state.patients.patient
  }
}

const mapActionToProps = {
  
}

export default connect(mapStateToProps, mapActionToProps)(PatientAlert)