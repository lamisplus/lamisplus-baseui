import React, { useState } from 'react'
import useForm from '../Functions/UseForm'
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
    Button,
    Alert
  } from 'reactstrap';
  import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'

//Date Picker
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { create } from 'actions/checkIn'
import * as actions from "actions/patients";
import { connect } from 'react-redux'
import { initialfieldState_checkInPatient } from './initailFieldState'

//Dtate Picker package
Moment.locale('en');
momentLocalizer();

const CheckInModal = (props ) => {

    const [errorMsg, setErrorMsg] = React.useState('')
    const [showErrorMsg, setShowErrorMsg] = useState(false)
   // const [showCheckInModal, setShowCheckInModal] = React.useState(props.showModal);
    const onDismiss = () => setShowErrorMsg(false)

    const toggle = () => {
   return props.setShowModal(!props.showModal)
}
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('dateVisitStart' in fieldValues)
          temp.dateVisitStart = fieldValues.dateVisitStart
            ? ''
            : 'This field is required.'
        if ('timeVisitStart' in fieldValues)
          temp.timeVisitStart = fieldValues.timeVisitStart
            ? ''
            : 'This field is required.'
        setErrors({
          ...temp
        })
    
        if (fieldValues === values) return Object.values(temp).every(x => x === '')
      }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
      } = useForm(initialfieldState_checkInPatient, validate)

    const handleSubmit = e => {
        setShowErrorMsg(false)
        const checkInDate = Moment(values.visitDate).format('DD-MM-YYYY')
        const checkInTime = Moment(values.visitTime).format('hh:mm A')
        values['dateVisitStart'] = checkInDate
        values['timeVisitStart'] = checkInTime
        values['patientId'] = props.patientId
        e.preventDefault()
    
        if (validate()) {
          const onSuccess = () => {
            props.setShowModal(false);
            props.fetchPatientByHospitalNumber(props.patientId)
            toast.success('Patient Checked In Successfully', { appearance: 'success' })
          }
          const onError = errstatus => {
              const msg = !(errstatus && errstatus.data && errstatus.data.apierror && errstatus.data.apierror.message) ? 'Something went wrong' : errstatus.data.apierror.message
            setErrorMsg(msg)
            setShowErrorMsg(true)
          }
          props.checkInPatient(values, onSuccess, onError)
          
        }
      }

    return (
        
        <Modal isOpen={props.showModal} toggle={toggle} size='lg'>
             <ToastContainer autoClose={3000} />
        <ModalHeader toggle={toggle}>Check In Patient</ModalHeader>
        <ModalBody>
          <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
          </Alert>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for='qualification'>Visit Type</Label>
                <Input
                  type='select'
                  name='visitTypeId'
                  id='visitTypeId'
                  value={values.visitTypeId}
                  onChange={handleInputChange}
                  required
                >
                  <option value='2'>Booked</option>
                  <option value='3'>Unbooked</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='middleName'>Date Of Visit</Label>
                <DateTimePicker
                  time={false}
                  id='visitDate'
                  name='visitDate'
                  value={values.visitDate}
                  onChange={value1 =>
                    setValues({ ...values, visitDate: value1 })
                  }
                  defaultValue={new Date()}
                  max={new Date()}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for='middleName'>Time of Visit</Label>
                <DateTimePicker
                  date={false}
                  name='visitTime'
                  id='visitTime'
                  value={values.visitTime}
                  onChange={value1 =>
                    setValues({ ...values, visitTime: value1 })
                  }
                  defaultValue={new Date()}
                  max={new Date()}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            CheckIn
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
}

const mapStateToProps = state => {
  return {
    patient: state.patients.patient
  }
}
  
  const mapActionToProps = {
    checkInPatient: create,
    fetchPatientByHospitalNumber: actions.fetchById,
  }
  
  export default connect(mapStateToProps, mapActionToProps)(CheckInModal)
  