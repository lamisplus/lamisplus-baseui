import React, { useState } from 'react'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Col, FormGroup, Input, Label, Row, Card, Alert, CardBody } from 'reactstrap'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Spinner from 'react-bootstrap/Spinner'
// React Notification
import { toast } from 'react-toastify'
//Date Picker
import 'react-widgets/dist/css/react-widgets.css'
import { DateTimePicker } from 'react-widgets'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import * as encounterAction from "actions/encounter";
import * as actions from "actions/patients";

import {connect} from 'react-redux';
//Dtate Picker package
Moment.locale('en')
momentLocalizer()

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  cardBottom: {
    marginBottom: 20
  },
  Select: {
    height: 45,
    width: 350
  },
  button: {
    margin: theme.spacing(1)
  },

  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}))

function AddVitalsPage (props) {
  const classes = useStyles()
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const onDismiss = () => setShowErrorMsg(false)
  const [vitals, setVitals] = useState({
    dateEncounter: new Date()
  })
  const [formDataForVitals, setformDataForVitals] = useState({
    pulse: '',
    respiratoryRate: '',
    temperature: '',
    diastolic: '',
    systolic: '',
    bodyWeight: '',
    height: ''
  })
  const [showLoading, setShowLoading] = useState(false)
  const SaveVitals = e => {
    setShowErrorMsg(false)
    setShowLoading(true)
    const newDatenow = Moment(vitals.dateEncounter).format('DD-MM-YYYY')
    const data = {
      formName: 'VITAL_SIGNS_FORM',
      patientId: props.patientId,
      serviceName: 'GENERAL_SERVICE',
      visitId: props.patient.visitId,
      formData: formDataForVitals,
      dateEncounter: newDatenow
    }
    e.preventDefault()
      const onSuccess = () => {
        setformDataForVitals({});
        setShowLoading(false)
        props.toggle();
        props.fetchPatientVitalSigns(props.patientId)
        toast.success('Patient Checked In Successfully', { appearance: 'success' })
      }
      const onError = errstatus => {
        const msg = !(errstatus && errstatus.data && errstatus.data.apierror && errstatus.data.apierror.message) ? 'Something went wrong' : errstatus.data.apierror.message
        setErrorMsg(msg)
        setShowErrorMsg(true)
        setShowLoading(false)
      }
      props.createVitalSigns(data, onSuccess, onError)
      
  }
 
  const onChangeFormdata = e => {
    e.persist()
    setformDataForVitals({
      ...formDataForVitals,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form className={classes.form} onSubmit={SaveVitals}>
      <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
          </Alert>
      <Card >
        <CardBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='hospitalNumber'>Date of Vital Signs</Label>
                <DateTimePicker
                  time={false}
                  name='dateEncounter'
                  id='dateEncounter'
                  value={vitals.dateEncounter}
                  onChange={value1 =>
                    setVitals({ ...vitals, dateEncounter: value1 })
                  }
                  defaultValue={new Date()}
                  max={new Date()}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='middleName'>Pulse (bpm)</Label>
                <Input
                  type='text'
                  name='pulse'
                  id='pulse'
                  placeholder=' '
                  value={formDataForVitals.pulse}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for='middleName'>Respiratory Rate (bpm)</Label>
                <Input
                  type='text'
                  name='respiratoryRate'
                  id='respiratoryRate'
                  placeholder=''
                  value={formDataForVitals.respiratoryRate}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='middleName'>Temparature (C)</Label>
                <Input
                  type='text'
                  name='temperature'
                  id='temperature'
                  placeholder=''
                  value={formDataForVitals.temperature}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='hospitalNumber'>Blood Pressure</Label>
                <Input
                  type='text'
                  name='systolic'
                  id='systolic'
                  placeholder='Systolic (mmHg)'
                  value={formDataForVitals.systolic}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
            <Col md={3} style={{ paddingTop: '10px' }}>
              <FormGroup>
                <Label for='hospitalNumber'>{'  '}</Label>
                <Input
                  type='text'
                  name='diastolic'
                  id='diastolic'
                  placeholder='Diastolic (mmHg)'
                  value={formDataForVitals.diastolic}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='middleName'>Body Weight (Kg)</Label>
                <Input
                  type='text'
                  name='bodyWeight'
                  id='bodyWeight'
                  placeholder=''
                  value={formDataForVitals.bodyWeight}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for='middleName'>Height (cm)</Label>
                <Input
                  type='text'
                  name='height'
                  id='height'
                  placeholder=''
                  value={formDataForVitals.height}
                  onChange={onChangeFormdata}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {showLoading && (
                <Spinner animation='border' role='status'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
          <br />
          <MatButton
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </MatButton>
          <MatButton
            variant='contained'
            color='default'
            onClick={props.toggle}
            className={classes.button}
            startIcon={<CancelIcon />}
          >
            Cancel
          </MatButton>
        </CardBody>
      </Card>
    </form>
  )
}
const mapStateToProps = state => {
  return {
  vitalSigns: state.patients.vitalSigns,
  patient: state.patients.patient
  }
}

const mapActionToProps = {
  createVitalSigns: encounterAction.create,
  fetchPatientVitalSigns: actions.fetchPatientLatestVitalSigns
}

export default connect(mapStateToProps, mapActionToProps)(AddVitalsPage)