import React, { useState } from 'react'
import useForm from '../Functions/UseForm'
import FormRenderer from 'components/FormManager/FormRenderer';
import {
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert
  } from 'reactstrap';
  import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  import MatButton from '@material-ui/core/Button'
  import * as actions from "actions/patients";
import { connect } from 'react-redux'


const FormRendererModal = (props ) => {

    const [errorMsg, setErrorMsg] = React.useState('')
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const onDismiss = () => setShowErrorMsg(false)

    const toggle = () => {
   return props.setShowModal(!props.showModal)
    }
    
   return (
        
    <Modal isOpen={props.showModal} toggle={toggle} zIndex={"9999"} >
         <ToastContainer />
   <ModalHeader toggle={toggle}>{props.title || ''}</ModalHeader>
    <ModalBody>
      <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
        {errorMsg}
      </Alert>
      <FormRenderer patientId={props.patient.patientId} formCode={props.currentForm.code} programCode={props.currentForm.programCode} visitId={props.patient.visitId} onSuccess={props.onSuccess} />
      </ModalBody>
     
      </Modal>
    );
   }

const mapStateToProps = state => {
  return {
    patient: state.patients.patient
  }
}
  
  const mapActionToProps = {
    
  }
  
  export default connect(mapStateToProps, mapActionToProps)(FormRendererModal)