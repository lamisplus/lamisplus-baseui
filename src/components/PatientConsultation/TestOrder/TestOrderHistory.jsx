import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Alert } from 'reactstrap'
import * as actions from "actions/patients";
import {connect} from 'react-redux';

const columns = [
  {
    name: 'Date',
    selector: 'dateEncounter',
    sortable: false,
    Display: true
  },
  {
    name: 'Test',
    selector: 'description',
    sortable: false,
  },
  {
    name: 'Test Status',
    selector: 'lab_test_order_status',
    sortable: false,
  },
  {
    name: 'Date Sample Collected',
    selector: 'date_sample_collected',
    sortable: false,
  },
  {
    name: 'Test Result',
    selector: 'test_result',
    sortable: false,
    cell: row => (
      <span>
        {row.test_result || ''} {' '}{row.unit_measurement || ''}
      </span>
    )
  }
]
function PreviousTestOrder (props) {
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const onDismiss = () => setShowErrorMsg(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setLoading(true)
    const onSuccess = () => {
      setData(props.previousMedications);
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)
      setErrorMsg("Could not fetch previous medications, try again later");
    }
    props.fetchPatientMedicationOrder(props.patientId, onSuccess, onError)
  }, [props.patientId]);

  React.useEffect(() => {
    setData(props.previousMedications);

  }, [props.previousMedications]);
  
 
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
  return {
    previousMedications: state.patients.previousMedications
  }
}

const mapActionToProps = {
  fetchPatientMedicationOrder: actions.fetchPatientLatestMedicationOrder,
}

export default connect(mapStateToProps, mapActionToProps)(PreviousTestOrder)