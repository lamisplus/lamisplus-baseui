import React from 'react';
import Page from 'components/Page';
import { SubmissionGrid, Form } from 'react-formio';
import * as actions from "actions/formManager";
import {connect} from 'react-redux';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { toast } from 'react-toastify'
import { Card, Alert, CardBody, Spinner } from 'reactstrap'


Moment.locale('en')
momentLocalizer()

const FormRenderer = props => {
  const [form, setForm] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showLoadingForm, setShowLoadingForm] = React.useState(true)
  const onDismiss = () => setShowErrorMsg(false)
  const options = {
    noAlerts: true,

  }
  React.useEffect(() => {
    
    const onSuccess = () => {
      setShowLoadingForm(false)
      }
      const onError = errstatus => {
        setErrorMsg('Error loading form, something went wrong')
        setShowErrorMsg(true)
        setShowLoadingForm(false)
      }
    props.fetchForm(props.formCode, onSuccess, onError);
  }, [props.formCode]);
  React.useEffect(() => {
    setErrorMsg('')
    setShowErrorMsg(false)
    if( props.form.name && !props.form.resourceObject){
        setErrorMsg('Form resource not found, please contact adminstration.')
        setShowErrorMsg(true)
        return;
      }
      setForm(props.form);
  },[props.form]);
  const submission = { ...props.submission, ...{data : {patient: props.patient}} };

  const submitForm = ( submission) => {
   // e.preventDefault()
   
      const onSuccess = () => {
        setShowLoading(false)
        toast.success('Form saved successfully!', { appearance: 'success' })
      }
      const onError = errstatus => {
        setErrorMsg('Something went wrong, request failed! Please contact admin.')
        setShowErrorMsg(true)
        setShowLoading(false)
      }
      const encounterDate = submission['dateEncounter'] ? submission['dateEncounter'] : new Date();
      const formatedDate = Moment(encounterDate).format('DD-MM-YYYY')
      const data = {
          data: [submission.data],
          patientId: props.patientId,
          formCode: props.formCode,
          programCode: props.form.programCode,
          dateEncounter: formatedDate,
          visitId: props.visitId,
      }
      if(props.typePatient){
        data = {...data, ...{typePatient: props.typePatient}}
      }
      props.saveEncounter(data, 
        props.onSuccess ? props.onSuccess : onSuccess, 
        props.onError ? props.onError : onError);
  }

  return (
    <React.Fragment>
      { (showLoadingForm) ? 
   <span className="text-center"><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /> Loading form...</span>
:
   <Card >
      <CardBody>
      <h4 class="text-capitalize">{'New: '}{props.title || props.form.name}</h4>
      
      <hr />
      {/* <Errors errors={props.errors} /> */}
      <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
          </Alert>

      <Form
          form={props.form.resourceObject}
          submission={submission}
          hideComponents={props.hideComponents}
          options={options}
          //onSubmit={props.onSubmit}
          onSubmit={(submission) => {
              if(props.onSubmit){
                  return props.onSubmit(submission);
              }
            return submitForm (submission);
            }}
        />
    </CardBody>
    </Card>
       }
    </React.Fragment>
  );
}

const mapStateToProps = (state = { form:{}}) => {
  return {
    patient: state.patients.patient,
    form: state.formManager.form,
    formEncounter: state.formManager.formEncounter,
    errors: state.formManager.errors
  }
}


const mapActionToProps = {
  fetchForm: actions.fetchById,
  saveEncounter: actions.saveEncounter
}

export default connect(mapStateToProps, mapActionToProps)(FormRenderer)

