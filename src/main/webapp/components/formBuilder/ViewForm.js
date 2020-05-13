import React, {useRef, useEffect, useState} from 'react';
import Page from 'components/Page';
import { data } from './recency-testing';
import { saveForm, selectError, Errors, Form, FormBuilder } from 'react-formio';
import {Card,CardContent,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {url} from '../../api'
import {fetchService, fetchAll, updateForm} from '../../actions/formBuilder'

import {
    FormGroup,
    Input,
    Label,
    Col,
    Row,
    Button
} from 'reactstrap';



const useStyles = makeStyles(theme => ({
    root2: {
        width: '100%',
        height: 100,
        overflow: 'auto',
    }
}));


const Update = props => {
    const datanew = {
        resourceObject: "",
        programCode: "",
        formCode: "",

    }

    const [newdata2] = React.useState(datanew);
    const [res, setRes] = React.useState("");
    const [displayType, setDisplayType] = React.useState("");
    const [programCode, setprogramCode] = React.useState("");
    const [formCode, setformCode] = React.useState();
    const [showLoading, setShowLoading] = useState(false)
    const [message, setMessage] = useState('')
    const classes = useStyles();
    const [currentForm, setCurrentForm] = useState();
    let myform;
    const submission = {data: {patientId:566233, firstName:"Deborah", lastName:"Obanisola"}};
    const textAreaRef = useRef(null);

    useEffect (() => {
        props.fetchService()
    }, [])

    const handleProgramChange = (e) => {
        setprogramCode(e.target.value)
        props.fetchAll(e.target.value)
    }


    const handleSubmit = e => {
        newdata2['programCode']=programCode;
        newdata2['resourceObject']=res;
        newdata2['formCode']=formCode;
        e.preventDefault()
        props.updateForm(newdata2);
    }

    return (
        <Page title="Form Renderer" >
            <Card >
                <CardContent>
                    <h4>View Form</h4>
                    <hr />
                    <Errors errors={props.errors} />
                    <Form
                        form={data}
                        ref={form => myform = form}
                        submission={submission}
                        //src={url}
                        hideComponents={props.hideComponents}
                        //onSubmit={props.onSubmit}
                        onSubmit={(submission) => {
                            console.log(submission);
                            return fetch('https://lp-base-app.herokuapp.com/api/', {
                                body: JSON.stringify(submission),
                                headers: {
                                    'content-type': 'application/json'
                                },
                                method: 'POST',
                                mode: 'cors',
                            }).then(res => {
                                console.log(res);
                                myform.emit('submitDone', submission);
                            })}}
                    />
                    <br></br>
                </CardContent>
            </Card>
            <hr></hr>
            <Card >
                <CardContent>
                    <h4>Edit Form</h4>
                    <Row>
                        <Col md={4}> <FormGroup>
                            <Label class="sr-only">Display Type</Label>
                            <Input type="select"  id="displayType" value={displayType} onChange={e => setDisplayType(e.target.value)}>
                                <option value="form">Form</option>
                                <option value="wizard">Wizard</option></Input>
                        </FormGroup></Col>

                        <Col md={4}> <FormGroup>
                            <Label class="sr-only">Program Area</Label>
                            {props.services.length && props.services.length > 0 ?
                                <Input type="select" class="form-control" id="programCode" required value={programCode} onChange={e => setprogramCode(e.target.value)}>
                                    {props.services.map(service => (<option key={service.name} value={service.code}>{service.name}</option>))}
                                </Input>:  <Input type="select" class="form-control" id="programCode" required value={programCode} onChange={e => setprogramCode(e.target.value)}>
                                    <option>No Services found</option>
                                </Input>}
                        </FormGroup></Col>
                        <Col md={4}> <FormGroup>
                            <Label class="sr-only">Form Name</Label>
                            {props.form.length && props.form.length > 0 ?
                                <Input type="select" class="form-control" id="formCode" required value={formCode}  onChange={e => setformCode(e.target.value)}>
                                    {props.form.map(form => (<option key={form.name} value={form.code}>{form.name}</option>))}
                                </Input>:  <Input type="select" class="form-control" id="formCode" required value={formCode} onChange={e => setformCode(e.target.value)}>
                                    <option>No forms found</option>
                                </Input>}
                        </FormGroup></Col>
                    </Row>
                    <Row>
                        <Col md={2}> <FormGroup>
                            <label class="sr-only"></label>
                            <Button color="primary" className=" mt-4" >Load Form</Button>
                        </FormGroup></Col>

                        <Col md={2}> <FormGroup>
                            <label class="sr-only"></label>
                            <button type="submit"  class="form-control btn btn-primary mt-4">Update Form</button>
                        </FormGroup></Col>
                    </Row>
                    <FormBuilder form={props.form.resourceObject} {...props} onChange={(schema) => {
                        console.log(JSON.stringify(schema));
                        setRes(JSON.stringify(schema));
                    }} />
                    <br></br>
                </CardContent>
            </Card>
            <hr></hr>
            <Card >
                <CardContent>
                    <h4>Json Form</h4>
                    <div >
                    <textarea cols="100"
                              ref={textAreaRef}
                              value={res}/>
                    </div>
                </CardContent>
            </Card>
        </Page>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         form: {display: 'form'},
//         saveText: 'Create Form',
//         errors: selectError('form', state),
//         response: 'res'
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         saveForm: (form) => {
//             const newForm = {
//                 ...form,
//                 tags: ['common'],
//             };
//             dispatch(saveForm('form', newForm, (err, form) => {
//                 console.log('stroing form');
//                 console.log(newForm);
//             }))
//         }
//     }
// }
//
// export default Create

const mapStateToProps =  (state = { form:{}}) => {
    console.log(state.forms)
    return {
        services: state.formReducers.services,
        form: state.formReducers.form,
    }}

const mapActionsToProps = ({
    fetchService: fetchService,
    fetchAll: fetchAll,
    updateForm: updateForm
})

export default connect(mapStateToProps, mapActionsToProps)(Update)

//
