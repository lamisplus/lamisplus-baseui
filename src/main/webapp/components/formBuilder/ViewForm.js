import React, {useRef} from 'react';
import Page from 'components/Page';
import { data } from './HivEnrolment';
import { saveForm, selectError, Errors, Form, FormBuilder } from 'react-formio';
import {Card,CardContent,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root2: {
        width: '100%',
        height: 100,
        overflow: 'auto',
    }
}));


const Create = props => {
    const classes = useStyles();
    let myform;
    const [res, setRes] = React.useState("");
    const textAreaRef = useRef(null);
    const submission = {data: {patientId:566233, firstName:"Deborah", lastName:"Obanisola"}};
    const url = 'https://lp-base-app.herokuapp.com/api/';

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
                    <FormBuilder form={data} {...props} onChange={(schema) => {
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

const mapStateToProps = (state) => {
    return {
        form: {display: 'form'},
        saveText: 'Create Form',
        errors: selectError('form', state),
        response: 'res'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveForm: (form) => {
            const newForm = {
                ...form,
                tags: ['common'],
            };
            dispatch(saveForm('form', newForm, (err, form) => {
                console.log('stroing form');
                console.log(newForm);
            }))
        }
    }
}

export default Create

