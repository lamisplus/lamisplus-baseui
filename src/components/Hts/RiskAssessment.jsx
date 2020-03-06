
import Page from 'components/Page';
import React, { useState } from 'react';
import axios from 'axios';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
// React Notification
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from 'components/Title/CardTitle';
import {url} from 'axios/url';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert, ModalHeader, ModalBody, Modal, ModalFooter, Button,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import {  Card,CardContent, }
    from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MatButton from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

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
    const apiUrl = url+"patients";
    const apicountries = url+"countries";
    const apistate = url+"state/country/";
    //Getting List of Countries and State
    const [countries, setCountries] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);

    React.useEffect(() => {
        async function getCharacters() {
            const response = await fetch(apicountries);
            const body = await response.json();
            setCountries(body.map(({ name, id }) => ({ label: name, value: id })));
        }
        getCharacters();
    }, []);
    const [patient, setPatient] = useState({
        hospitalNumber:'',
        firstName: '',
        lastName: '',
        email:'',
        dateRegistration: '',
        facilityId: '1',
        dob:'',
        dobEstimated:'',
        educationId:'',
        genderId:'',
        maritalStatusId:'',
        occupationId:'',
        alternatePhoneNumber:'',
        address1:'',
        city:'',
        countryId:'',
        landmark:'',
        provinceId:'',
        zipCode:'',
        stateId:'',
        street:'',
    });

    const [showLoading, setShowLoading] = useState(false);
    //Saving of Patient Registration
    const savePatient = (e) => {
        //toast.warn("Processing Registration");
        setShowLoading(true);
        e.preventDefault();
        const data = {
            hospitalNumber: patient.hospitalNumber,
            dateRegistration: "01:11:2020",
            facilityId: '1',

            "person": {
                firstName: patient.firstName,
                lastName:  patient.lastName,
                email:patient.email,
                dob:patient.dob,
                maritalStatusId:patient.maritalStatusId,
                occupationId:patient.occupationId,
                genderId:patient.genderId,
                educationId:patient.educationId,
                "personContact": {
                    address1:patient.address1,
                    city:'1',
                    countryId:'1',
                    zipCode:patient.zipCode,
                    stateId:'1',
                    street:patient.street,
                    provinceId: 1
                },
                "personRelatives": [
                    {
                        dobEstimated:patient.dobEstimated,
                        alternatePhoneNumber:patient.alternatePhoneNumber,
                        landmark:patient.landmark,
                        provinceId:patient.provinceId,

                    }
                ],
                "titleId":1
            }
        };

        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/patient')
                toast.success("Patient Registration Successful!");
            }).catch((error) => {
                setShowLoading(false)
                // console.log("Error in CreateBook!");
                //toast.error("Something went wrong!");
            }
        );
    };
    //End of the Saving the Patient Registration
    const onChange = (e) => {
        e.persist();
        setPatient({...patient, [e.target.name]: e.target.value});
    }
    //Get States from selected country
    const getStates = (event) => {
        const getCountryId = event.target.value;

        React.useEffect(() => {
            async function getCharacters() {
                const response = await fetch(apistate+getCountryId);

                const stateList = await response.json();
                setStates(stateList.map(({ name, id }) => ({ label: name, value: id })));
            }
            getCharacters();
        }, []);
        //setStates({})
        //console.log(stateList);
    }

    return (
        <Page title="HIV Risk Assessment Stratification" >
            <ToastContainer autoClose={2000} />
            <Form onSubmit={savePatient}>
                {/* First  row form entry  for Demographics*/}
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card className={classes.cardBottom}>
                            <CardContent>
                                <Title >New Risk Stratification <br/>
                                </Title>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="hospitalNumber">Client Code</Label>
                                            <Input type="text" name="hospitalNumber" id="Client code" placeholder="Clent Code"  />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">Date Of Assessment</Label>
                                            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                    <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName">When was your most recent HIV Test</Label>
                                            <Input type="select" name="genderId" id="genderId"   >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">What was the Result</Label>
                                            <Input type="select" name="genderId" id="genderId"   >
                                                <option value="1"></option>
                                                <option value="1">Positive</option>
                                                <option value="2">Negative</option>
                                                <option value="2">Unknown</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                    <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Have you had unprotected/condumless penetrative sex(vaginal.anal,(oral) in the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Have you had more than one sexual partners known or unknown HIV positive status in the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Have you been forced to have sex against your will(sexual abuse or rape) in the last 6months or since your last HIV test</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                    <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="qualification">Do you currently have or have you been treated for any STI/STD in the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Gonorrhea
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Chlamydia
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Syphilis
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Herpes
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Anal/Genitals Warts of HPV
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Viral Hepatitis
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Tuberculosis(TB)
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup check>
                                            <Label></Label>
                                            <Input type="checkbox" />Others
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <div>
                                    <Typography>
                                        Have you had the following symptoms in the last 6months
                                    </Typography>
                                    </div>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Have you been forced to have sex against your will(sexual abuse or rape) in the last 6months or since your last HIV test</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                    <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="qualification">Do you currently have or have you been treated for any STI/STD in the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Have you been forced to have sex against your will(sexual abuse or rape) in the last 6months or since your last HIV test</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId" value={patient.genderId}  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                <MatButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button} onClick={toggle}
                                    >Proceed
                                </MatButton>
                                <MatButton
                                    className={classes.button}
                                    startIcon={<CancelIcon/>}>
                                    Cancel
                                </MatButton>
                                </Row>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Assessment Result</ModalHeader>
                    <ModalBody>
                        The client has a risk of being HIV-Positive
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/hts-services">
                        <Button color="primary" onClick={toggle}>HTS Services...</Button>{' '}
                        </Link>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
                {/* Second row form entry  for contact details*/}
            </Form>
        </Page>
    );
};

export default PatientRegistration;
