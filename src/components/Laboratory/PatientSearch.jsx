import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {Edit} from '@material-ui/icons';
import './PatientSearch.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader,
  Input,
  Form
} from 'reactstrap';
import {Link} from 'react-router-dom';
import * as actions from "actions/encounter";
import {connect} from 'react-redux';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Form  className="cr-search-form" onSubmit={e => e.preventDefault()} >
      
          <Input
              type="search"
              placeholder="Search by Patient Name, Patient ID "
              className="cr-search-form__input pull-right"
              value={filterText} onChange={onFilter}
          />
       
    </Form>
);

const SampleExpandedComponent = ({ data }) => (
    <div>
    <span>
   <b>  Date Of Registration:</b> {data.dateRegistration} </span> <br></br> <span><b>Date Of Birth:</b> {data.dob} </span>
    </div>
);


const calculate_age = (dob) => {
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



const columns = [
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
    cell: row =>
        <div>
          <Link to={{ pathname: '/collect-sample', state: { getpatientlists: {row}} }}>
          <Button type="button" outline color="info">Collect Sample</Button>{' '}
            </Link>
         
        </div>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    grow: 2,
  },

];

const customStyles = {
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  }
};

const PatientTable = (props) => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const [data, setData] = useState([])
  const filteredItems =  props.patientsList.filter(item => (item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())) || (item.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase())) || (item.hospitalNumber && item.hospitalNumber.toLowerCase().includes(filterText.toLowerCase())));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    props.fetchAllPatients('GENERAL_SERVICE', 'LABTEST_ORDER_FORM');
  
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
      <div class="searchTable">
        <card>
          <cardContent>
        <DataTable
            columns={columns}
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
       </div>


  );

};

const mapStateToProps = state => {
  console.log('logging state');
  console.log(state);
  return {
  patientsList: state.laboratory.encounters
  }
}

const mapActionToProps = {
  fetchAllPatients: actions.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(PatientTable);
