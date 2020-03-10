import Page from 'components/Page';
import React, {useState} from 'react';
import {
    Card,
    Col,
    Form,
    Row,
    Alert,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchInput from 'components/SearchBox/SearchInput';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
        width:200,
    },
    body1: {
        fontWeight: 500,
    },

}));

function createData(name, calories, fat, carbs, protein, gender) {
    return { name, calories, fat, carbs, protein, gender };
}

const rows = [
    createData('1598', 'Alex Williams', 234567677, 3, 'Male'),
    createData('1234', 'Ahmed Musa', +23456666443, 9, 'Male'),
    createData('5555', 'Isaac Johnson',+2345567765, 6 , 'Female'),

];

const PendingPrescription = (props) => {
    const classes = useStyles();
    const [modal2, setModal2] = useState(false);


    const toggle2 = () => setModal2(!modal2);
    return (
        <Page title="Index Contact Tracking" >
            <Row>
                <Col sm="12">
                    <Card body>
                        <Form>
                            <SearchInput />
                        </Form>
                        <br/>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient ID</TableCell>
                                        <TableCell align="center">Client ID</TableCell>
                                        <TableCell align="center">Client Nmae</TableCell>
                                        <TableCell align="center">Gender</TableCell>
                                        <TableCell align="center">Date Enrolled</TableCell>
                                        <TableCell align="center">Total Index Contact</TableCell>
                                        <TableCell align="center">Total Contacted</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                            <TableCell align="center">{row.gender}</TableCell>
                                            <TableCell align="center">{row.gender}</TableCell>
                                            <TableCell align="center">{row.gender}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Enroll Patient">
                                                    <Link to="/new-index">
                                                    <IconButton aria-label="Collect Sample">
                                                        <AddCircleOutlineIcon size={20} />
                                                    </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="View Patient">
                                                        <IconButton aria-label="Collect Sample">
                                                            <ViewListIcon size={20}/>
                                                        </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <Modal isOpen={modal2} toggle={toggle2}>
                                        <ModalHeader toggle={toggle2}>Enroll Client Into HIV Program</ModalHeader>
                                        <ModalBody>
                                            <Alert color="primary">
                                                To Enroll client, enter client's patient ID. To get a Patient ID, go to patient registration.
                                            </Alert>
                                            <Row>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="hospitalNumber">Patient Id</Label>
                                                        <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Patient ID " />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Link to="/enroll-patient">
                                                <Button color="primary" onClick={toggle2}>Enroll</Button>
                                            </Link>
                                            <Button color="secondary" onClick={toggle2}>Close</Button>
                                        </ModalFooter>
                                    </Modal>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Col>

            </Row>

        </Page>


    );
};

export default PendingPrescription;
