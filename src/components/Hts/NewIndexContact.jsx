import Page from 'components/Page';
import React from 'react';
import {
    Button,
    Form,
    Alert, Row, Col, FormGroup, Label, Input
} from 'reactstrap';
import {
    Card,
    CardContent,
    Typography,
}
    from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from 'components/Title/CardTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {DateTimePicker} from 'react-widgets';
import Spinner from 'react-bootstrap/Spinner';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';

const useStyles = makeStyles(theme => ({

    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

const PatientPage = () => {
    const classes = useStyles();
    const classes2 = useStyles();
    return (
        <Page title="New Index Contact" >
            <div className={classes2.inforoot} >
                <ExpansionPanel defaultExpanded style={{ backgroundColor: '#F5F5F5'}}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header">
                        <div className={classes2.column}>
                            <Typography className={classes.heading}>
                                Name: Dorcas Essien
                                <br/>
                                Gender : Female
                            </Typography>
                        </div>
                        <div className={classes2.column}>
                            <Typography className={classes2.secondaryHeading}>
                                Birthday : June, 14 1990 (20 years)
                                <br/>
                                phone Number : +234567890
                            </Typography>
                        </div>
                        <div className={classes2.column}>
                            <Typography className={classes2.secondaryHeading}>
                                Email Address : essiendorcas530@gmail.com
                            </Typography>
                        </div>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
            <br />
            <Card className={classes.cardBottom}>
                <CardContent>
                    <Form >
                        {/* First  row form entry  for Demographics*/}
                        <Row>
                            <Col xl={12} lg={12} md={12}>
                                <Card className={classes.cardBottom}>
                                    <CardContent>
                                        <Title >New Index Contact<br/>
                                        </Title>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="hospitalNumber">First Name</Label>
                                                    <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="New Status"  />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="middleName">Other Names</Label>
                                                    <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Date of New Status"  />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="middleName">Gender</Label>
                                                    <Input type="select" name="genderId" id="genderId"  >
                                                        <option value="1">Male</option>
                                                        <option value="2">Female</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="middleName">Date Agreed To Return</Label>
                                                    <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Date Agreed To Return"  />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="causeofdeath">Cause of Death</Label>
                                                    <Input type="select" name="genderId" id="genderId"  >
                                                        <option value="1">acident</option>
                                                        <option value="2">aids</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="reasonforinterruption">Reason for Interruption</Label>
                                                    <Input type="select" name="genderId" id="genderId"  >
                                                        <option value="1">sick</option>
                                                        <option value="2">not inetrested</option>
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
                    </Form>
                </CardContent>
            </Card>
        </Page>
    );
};

export default PatientPage;
