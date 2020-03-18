import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {Card, CardContent} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {AssignmentTurnedIn} from '@material-ui/icons';
import 'react-widgets/dist/css/react-widgets.css';
import './PatientSearch.css';
import {
    Input,
    Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, FormGroup, Label
} from 'reactstrap';

import {DateTimePicker} from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import * as actions from "../../store/actions/patients/patients";
import {connect} from 'react-redux';
Moment.locale('en');
momentLocalizer();

/**Find table documentations at
 import TablePagination from '@material-ui/core/TablePagination'; * 1.https://www.npmjs.com/package/react-data-table-component#storybook-dependencies----rootdirstoriespackagejson
 import TableRow from '@material-ui/core/TableRow'; * 2. https://jbetancur.github.io/react-data-table-component/?path=/story/conditional-styling--conditional-cells */
const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Form  className="cr-search-form" onSubmit={e => e.preventDefault()} >
        <Card>
            <CardContent>
                <Input
                    type="search"
                    placeholder="Search by Patient Name, Patient ID "
                    className="cr-search-form__input pull-right"
                    value={filterText} onChange={onFilter}/>
            </CardContent>
        </Card>
    </Form>
);

const SampleExpandedComponent = ({ data }) => (
    <div>
    <span>
   <b>  Date Of Registration:</b> {data.dateRegistration} </span> <br></br> <span><b>Date Of Birth:</b> {data.dob} </span>
    </div>
);


const calculate_age = (dob) => {
    if (!dob){
        return 'Nil';
    }
    var today = new Date();
    var dateParts = dob.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var birthDate = new Date(dateObject);  // create a date object directly from `dob1` argument
    console.log(dateObject);
    console.log(birthDate);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age_now--;
    }

    if(age_now === 0){
        return m + ' month(s)';
    }
    console.log(age_now);
    return age_now + ' year(s)';
}

const columns = (modalClickHandler => [
    {
        name: 'Patient ID',
        selector: 'hospitalNumber',
        sortable: false,
        Display: true,
    },
    {
        name: 'Patient Name',
        selector: 'name',
        sortable: false,
        cell: row => <span>{row.firstName} {row.lastName}</span>
    },
    {
        name: 'Age',
        selector: 'dob',
        sortable: false,
        cell: row => <span>{calculate_age(row.dob)}</span>
    },
    {
        name: 'Action',
        cell: () =>
            <div>
                <IconButton color="primary" onClick={modalClickHandler} aria-label="CheckIn Patient" title="CheckIn Patient">
                    <AssignmentTurnedIn title="Edit Patient"  aria-label="Edit Patient"/>
                </IconButton>
            </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
]);

const customStyles = {
    headCells: {
        style: {
            color: '#202124',
            fontSize: '14px',
            fontWeight: 'bold',
        },
    }
};

const CheckiInListTable = (props) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    // const [data, setData] = useState([])
    const filteredItems = (!filterText && props.patientsList) ? [] : props.patientsList.filter(item => (item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())) || (item.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase())) || (item.hospitalNumber && item.hospitalNumber.toLowerCase().includes(filterText.toLowerCase())));
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        props.fetchAllPatients();
        //setData(props.patientsList);
    
    }, [])//componentDidMount

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    return (
        <div>
            <card>
                <cardContent>
            <DataTable
                columns={columns(toggle)}
                data={filteredItems}
                customStyles={customStyles}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                highlightOnHover={true}
                striped={true}
                subHeaderAlign={'left'}
                // noHeader={false}
                fixedHeader={true}
                expandableRows
                persistTableHead
                expandableRowsComponent={<SampleExpandedComponent />}/>
        </cardContent>
        </card>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>CheckIn Patient</ModalHeader>
                <ModalBody>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="qualification">Visit Type</Label>
                                <Input type="select" name="visitTypeId">
                                    <option value="2">Booked</option>
                                    <option value="3">Unbooked</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Date Of Visit</Label>
                                <DateTimePicker time={false} name="dateVisitStart"/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="middleName">Time of Visit</Label>
                                <DateTimePicker date={false} name="timeVisitStart"  id="timeVisitStart"/>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>CheckIn</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
  
  patientsList: state.patients.list
})

const mapActionToProps = {
  fetchAllPatients: actions.fetchAll,
  //deletePatient: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(CheckiInListTable);
