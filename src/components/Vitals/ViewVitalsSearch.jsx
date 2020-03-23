import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import DataTable from 'react-data-table-component'
import { Alert, Form,  Input } from 'reactstrap'
import AddVitalsPage from 'components/Vitals/AddVitalsPage'
import * as actions from "actions/patients";
import {connect} from 'react-redux';
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 11
  }
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Form className='cr-search-form' onSubmit={e => e.preventDefault()}>
        <Input
          type='search'
          placeholder='Search by Patient Name, Patient ID '
          className='cr-search-form__input pull-right'
          value={filterText}
          onChange={onFilter}
        />
  </Form>
)

const columns = [
  {
    name: 'Date',
    selector: 'dateEncounter',
    sortable: false,
    Display: true
  },
  {
    name: 'Pulse(bpm)',
    selector: 'formData.pulse',
    sortable: false,
  },
  {
    name: 'Respiratory(bpm)',
    selector: 'formData.respiratoryRate',
    sortable: false,
  },
  {
    name: 'Temperature(c)',
    selector: 'formData.temperature',
    sortable: false,
  },,
  {
    name: 'Blood Pressure(mmHg)',
    selector: 'row.formData',
    sortable: false,
    cell: row => (
      <span>
        {row.formData.systolic || ''} {' / '}{row.formData.diastolic || ''}
      </span>
    )
  },,
  {
    name: 'Weight(kg)',
    selector: 'formData.weight',
    sortable: false,
  },
  {
    name: 'Height(cm)',
    selector: 'formData.height',
    sortable: false,
  },
]
function DataTableList (props) {
  const classes = useStyles()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const onDismiss = () => setShowErrorMsg(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setLoading(true)
    const onSuccess = () => {
      console.log('setting data');
      setData(props.vitalSignsList);
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)
    }
    props.fetchPatientVitalSigns(props.patientId, onSuccess, onError)
  }, [props.patientId]);

  React.useEffect(() => {
    setData(props.vitalSignsList);

  }, [props.vitalSignsList]);
  //get the user that need to be checked in
  const getUsermodal = patientrow => {
    // setuservalue(user);
    setModal(!modal)
  }
  return (
    <div>
<Alert color='danger' isOpen={showErrorMsg} toggle={onDismiss}>
            {errorMsg}
        </Alert>
        <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover={true}
            striped={true}
            subHeaderAlign={'left'}
            progressPending={loading}
            // noHeader={false}
            fixedHeader={true}
            persistTableHead
          />
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
  vitalSignsList: state.patients.vitalSignsList
  }
}

const mapActionToProps = {
  fetchPatientVitalSigns: actions.fetchPatientVitalSigns,
}

export default connect(mapStateToProps, mapActionToProps)(DataTableList)