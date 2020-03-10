import Page from 'components/Page';
import React, { useState } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
//Date Picker
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

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
    ModalHeader, ModalBody, Modal, ModalFooter, Button,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import {  Card,CardContent, }
    from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MatButton from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom';
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
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);




    //Get States from selected country


    return (
        <Page title="HIV Risk Assessment Stratification" >
            <ToastContainer autoClose={2000} />
            <Form>
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
                                            <Input type="select" name="genderId" id="genderId"   >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="careentrypoint">Have you had more than one sexual partners known or unknown HIV positive status in the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
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
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId"   >
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
                                            <Input type="select" name="genderId" id="genderId"   >
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
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
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
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus">Have you been forced to have sex against your will(sexual abuse or rape) in the last 6months or since your last HIV test</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
                                                <option value="1"></option>
                                                <option value="1">Yes</option>
                                                <option value="2">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation">Have you paid for or recieved gratification/sold sex within the last 6months</Label>
                                            <Input type="select" name="genderId" id="genderId"  >
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
