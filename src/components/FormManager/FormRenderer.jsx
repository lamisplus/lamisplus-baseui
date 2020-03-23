import React from 'react';
import Page from 'components/Page';
import { Errors, Form } from 'react-formio';
import * as actions from "actions/formManager";
import {connect} from 'react-redux';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { toast } from 'react-toastify'
import { Card, Alert, CardBody } from 'reactstrap'


Moment.locale('en')
momentLocalizer()

const FormRenderer = props => {
  const [form, setForm] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const onDismiss = () => setShowErrorMsg(false)

  React.useEffect(() => {
    const onSuccess = () => {
        setShowLoading(false)
        setForm(props.form);
      }
      const onError = errstatus => {
        setErrorMsg('Error loading form, something went wrong')
        setShowErrorMsg(true)
        setShowLoading(false)
      }
    props.fetchForm(props.formId, props.serviceName, onSuccess, onError);
  }, [props.formId]);

  const submission = props.submission;

  const submitForm = ( submission) => {
   // e.preventDefault()
      const onSuccess = () => {
        setShowLoading(false)
        toast.success('Successfully', { appearance: 'success' })
      }
      const onError = errstatus => {
        setErrorMsg('Something went wrong')
        setShowErrorMsg(true)
        setShowLoading(false)
      }
      const encounterDate = submission['dateEncounter'] ? submission['dateEncounter'] : new Date();
      const formatedDate = Moment(encounterDate).format('DD-MM-YYYY')
      const data = {
          formData: submission,
          patientId: props.patientId,
          formName: props.form.formName,
          serviceName: props.form.serviceName,
          dateEncounter: formatedDate,
          visitId: props.visitId
      }
      props.saveEncounter(data, onSuccess, onError);
  }
  return (
    <Page title="" >
   <Card >
      <CardBody>
  <h4 class="text-capitalize">{props.title || props.form.displayName}</h4>
      <hr />
      {/* <Errors errors={props.errors} /> */}
      <Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
          </Alert>
      <Form
          form={props.form.resourceObject}
          submission={submission}
          hideComponents={props.hideComponents}
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
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
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

