import React from 'react';
import Page from 'components/Page';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
// React Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from 'components/Title/CardTitle';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import {  Card,CardContent, }
    from '@material-ui/core';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';



// import CountryStates from './CountryStates';
//Dtate Picker package
Moment.locale('en');
momentLocalizer();

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height:45,
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },

}));


const PatientRegistration = (props) => {
    const classes = useStyles();

    React.useEffect(() => {
        async function getCharacters() {
        }
        getCharacters();
    }, []);

    return (
        <Page title="Enroll Patient" >
            <ToastContainer autoClose={2000} />
            <Alert color="primary">
                All Information with Asterisks(*) are compulsory
            </Alert>
            <Form>
                {/* First  row form entry  for Demographics*/}
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card className={classes.cardBottom}>
                            <CardContent>
                                <Title >Enrollment Details <br/>
                                </Title>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="hospitalNumber">Patient Id</Label>
                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Patient ID "  />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">Date Of Reg/TransferIn</Label>
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">Date Of Confirmed HIV Test</Label>
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Care Entry Point</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1">Facility </option>
                                                <option value="2">Community</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Source of Referal</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1">ANC</option>
                                                <option value="2">DOTS</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Enrollment Setting</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1"></option>
                                                <option value="2"></option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">HIV Status at Registration</Label>
                                            <Input type="select" name="genderId" id="genderId"   >
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">TB Satus</Label>
                                            <Input type="select" name="occupationId" id="occupationId" >
                                               
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="qualification">Pregnancy Satus</Label>
                                            <Input type="select" name="educationId" >
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Gender</Label>
                                            <Input type="select" name="maritalStatusId" id="maritalStatusId"  >
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">KP Target Group</Label>
                                            <Input type="select" name="maritalStatusId" id="maritalStatusId"  >
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <MatButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}>Save
                                </MatButton>
                                <MatButton
                                    className={classes.button}
                                    startIcon={<CancelIcon />}>
                                    Cancel
                                </MatButton>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                {/* Second row form entry  for contact details*/}
            </Form>
        </Page>
    );
};

export default PatientRegistration;
