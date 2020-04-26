import React, {useRef, useEffect, useState} from 'react';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { Errors, FormBuilder } from 'react-formio';
import {Card,CardContent,} from '@material-ui/core';
import {fetchModules, fetchService, createForm} from '../../actions/formBuilder'

import {
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  Form
} from 'reactstrap';
const Create = props => {
  const datanew = {
    resourceObject: "",
    programCode: "",
    
  }
  const [newdata2] = React.useState(datanew);
  const [res, setRes] = React.useState("");
  const [displayType, setDisplayType] = React.useState("");
  const [programCode, setprogramCode] = React.useState("");
  const [name, setname] = React.useState();
  const [usageCode, setusageCode] = React.useState("");
  const [version, setversion] = React.useState();

  useEffect (() => {
    props.fetchService()
}, [])

const handleSetModule = (e) => {
  props.fetchService(e.target.value)
}

const handleSubmit = e => {
  
  alert(programCode)
  
  newdata2['programCode']=programCode;
  newdata2['resourceObject']=res;
  newdata2['name']=name;
  newdata2['version']=version;
  newdata2['usageCode']=usageCode;

  e.preventDefault()
  props.createForm(newdata2);
} 
  const textAreaRef = useRef(null);

  return (
    <Page title="Form Builder" >
   <Card >
      <CardContent>
      <h4>Create Form</h4>
      <hr />
      <Errors errors={props.errors} />
      <Form onSubmit={handleSubmit}>
        <Row>
      <Col md={2}> <FormGroup>
      <Label class="sr-only">Display Type</Label>
      <Input type="select"  id="displayType" value={displayType} onChange={e => setDisplayType(e.target.value)}>
      <option value="form">Form</option>
      <option value="wizard">Wizard</option></Input>
       </FormGroup></Col> 
       
      <Col md={3}> <FormGroup>
      <Label class="sr-only">Form Name</Label>
      <Input type="text" class="form-control" id="name" name="name" value={name}   onChange={e => setname(e.target.value)} required/>
       </FormGroup> </Col>  

       <Col md={3}> <FormGroup>
      <Label class="sr-only">Version</Label>
      <Input type="text" class="form-control" id="version" name="version" value={version}   onChange={e => setversion(e.target.value)} required/>
       </FormGroup> </Col>

       <Col md={3}> <FormGroup>
      <Label class="sr-only">Usage Code</Label>
      <Input type="text" class="form-control" id="usageCode" name="usageCode" value={usageCode}   onChange={e => setusageCode(e.target.value)} required/>
       </FormGroup> </Col>  

      <Col md={2}> <FormGroup>
      <Label class="sr-only">Service Name</Label>
      {props.services.length && props.services.length > 0 ? 
      <Input type="select" class="form-control" id="programCode" required value={programCode} onChange={e => setprogramCode(e.target.value)}>
      {props.services.map(service => (<option key={service.name} value={service.code}>{service.name}</option>))}
      </Input>:  <Input type="select" class="form-control" id="programCode" required value={programCode} onChange={e => setprogramCode(e.target.value)}>
      <option>No Services</option>
      </Input>}
      </FormGroup></Col> 

      <Col md={2}> <FormGroup>
      <label class="sr-only"></label>
      <button type="submit"  class="form-control btn btn-primary mt-4">Save Form</button>
      </FormGroup></Col>
      </Row>
      </Form>
      {/* <button type="button" class="btn btn-primary form-control">Save Form</button> */}
      <FormBuilder form={{display: displayType}} saveText={'Create Form'} onChange={(schema) => {
        setRes(JSON.stringify(schema));
       console.log(res)
       }} />
      <br></br>
      <div>
  <h4>Json Form</h4>
  <textarea cols="50"
    ref={textAreaRef}
    value={res}/>
      </div>
    </CardContent>
    </Card>
    </Page>
  );

// const mapStateToProps = (state) => {
//   return {
//     form: {display: 'form'},
//     saveText: 'Create Form',
//     // errors: selectError('form', state),
//     response: 'res'
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveForm: (form) => {
//       const newForm = {
//         ...form,
//         tags: ['common'],
//       };
//       dispatch(saveForm('form', newForm, (err, form) => {
//       }))
//     }
//   }
// }
      
}

const mapStateToProps = (state) => {
  console.log(state.forms)
  return {
  // modules: state.forms.modules,
  services: state.formReducers.services
}}

const mapActionsToProps = ({
   fetchModules: fetchModules,
   fetchService: fetchService,
   createForm: createForm
 })

export default connect(mapStateToProps, mapActionsToProps)(Create)

