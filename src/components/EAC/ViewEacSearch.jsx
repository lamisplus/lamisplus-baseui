import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Title from 'components/Title/CardTitle';
import {
    FaPencilAlt
} from 'react-icons/fa';
import {Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {Card, CardContent} from '@material-ui/core';
import MatButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('111', 159, 6.0, 24, 4.0),
    createData('111', 237, 9.0, 37, 4.3),
    createData('111', 262, 16.0, 24, 6.0),
];

export default function DataTableList(props) {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>Patient ID</TableCell>
                        <TableCell align="center">Patient Name</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Date of 1st EAC</TableCell>
                        <TableCell align="center">Date of 2nd EAC</TableCell>
                        <TableCell align="center">Date of 3rd EAC</TableCell>
                        <TableCell align="center">Date of Repeact VL</TableCell>
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
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="Edit Client Status">
                                    <IconButton aria-label="Collect Sample">
                                        <FaPencilAlt size={20} onClick={toggle}/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                    <Modal isOpen={modal} toggle={toggle}  size='lg'>
                        <ModalHeader toggle={toggle}>Patient EAC</ModalHeader>
                        <ModalBody>
                            <Form >
                                {/* First  row form entry  for Demographics*/}
                                <Row>
                                    <Col xl={12} lg={12} md={12}>
                                        <Card className={classes.cardBottom}>
                                            <CardContent>
                                                <Title >Patient EAC<br/>
                                                </Title>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="hospitalNumber">Date Of 1st EAC</Label>
                                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="First EAC" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="hospitalNumber">Date Of 2nd EAC</Label>
                                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Second EAC" />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="hospitalNumber">Date Of 3rd EAC</Label>
                                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Third EAC" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="hospitalNumber">Date Of Repeact VL</Label>
                                                            <Input type="text" name="hospitalNumber" id="hospitalNumber" placeholder="Repeat VL" />
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
                        </ModalBody>
                    </Modal>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
