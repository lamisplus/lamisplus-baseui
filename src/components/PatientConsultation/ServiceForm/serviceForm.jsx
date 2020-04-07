import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
    Form,
    Input,
    Alert,
    CardBody,
    Card,
    CardHeader,
    Col,
    Row,
    Button
  } from 'reactstrap';
  import DataTable from 'react-data-table-component';
  import Spinner from 'react-bootstrap/Spinner';
  import {connect} from 'react-redux';
  import * as actions from "actions/formManager";
  import * as patientActions from "actions/patients";
  import FormRenderer from 'components/FormManager/FormRenderer';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const cardStyle = {
  borderColor: '#fff',
  marginBottom: 10,
  height: 600,
  overflow: 'auto'
}

function ServiceFormPage (props) {
  const [showLoading, setShowLoading] = useState(false)
  const [showEncounterLoading, setShowEncounterLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [encounterMessage, setEncounterMessage] = useState('')
  const [serviceForms, setServiceForms] = useState()
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  const [showFormPage, setShowFormPage] = useState(false);
  const [currentForm, setCurrentForm] = useState();
  const [patientEncounters, setPatientEncouters] = useState()
  const filteredItems = !serviceForms ? [] : serviceForms.filter(
    item =>
      (item.displayName &&
        item.displayName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.lastName &&
        item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.hospitalNumber &&
        item.hospitalNumber.toLowerCase().includes(filterText.toLowerCase()))
  )

  const encounterFilteredItems = !patientEncounters ? [] : patientEncounters.filter(
    item =>
      (item.formName &&
        item.formName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.serviceName &&
        item.serviceName.toLowerCase().includes(filterText.toLowerCase())) 
  )

  const togglePage = () => {
      return setShowFormPage(!showFormPage);
  }

  React.useEffect(() => {
    setShowLoading(true)
    const onSuccess = () => {
        setServiceForms(props.formList)
        setShowLoading(false)
      }
      const onError = () => {
        setMessage('Could not fetch available service forms. Please try again later')
        setShowLoading(false)
        setServiceForms();
      }
    props.fetchForms(onSuccess, onError);
  }, []);

  React.useEffect(() => {
    setServiceForms(props.formList)
  }, [props.formList]);


  const fetchEncounters = () => {
    setShowEncounterLoading(true)
    const onSuccess = () => {
        setPatientEncouters(props.patientEncounterList)
        setShowEncounterLoading(false)
      }
      const onError = () => {
        setMessage('Could not fetch service forms history. Please try again later')
        setShowEncounterLoading(false)
        setPatientEncouters();
      }
    props.fetchPatientEncounters(props.patient.patientId, onSuccess, onError);
  }

  React.useEffect(() => {
    fetchEncounters();
  }, []);

  React.useEffect(() => {
    setPatientEncouters(props.patientEncounterList)
    console.log('setting enc')
  }, [props.patientEncounterList]);

 const loadForm = (value) => {
    setCurrentForm(value);
    togglePage();
  }

  const viewForm = (value) => {
    setCurrentForm(value);
    togglePage();
  }

  const editForm = (value) => {
    setCurrentForm(value);
    togglePage();
  }

  const onSuccess = () => {
    toast.success('Form saved successfully!', { appearance: 'success' });
    fetchEncounters();
    togglePage();
  }

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Form  className="cr-search-form" onSubmit={e => e.preventDefault()} >
          <Card>
              <CardBody>
                    <Input
                      type="search"
                      placeholder="Search by Form Name "
                      className="cr-search-form__input pull-right"
                      value={filterText} onChange={onFilter}
                    />
              </CardBody>
          </Card>
      </Form>
  );

  const EncounterFilterComponent = ({ filterText, onFilter, onClear }) => (
    <Form  className="cr-search-form" onSubmit={e => e.preventDefault()} >
          <Card>
              <CardBody>
                    <Input
                      type="search"
                      placeholder="Search by Form Name "
                      className="cr-search-form__input pull-right"
                      value={filterText} onChange={onFilter}
                    />
              </CardBody>
          </Card>
      </Form>
  );

  const encounterColumns = (viewForm, editForm) => [
    {
      name: 'Service Form',
      selector: 'formName',
      sortable: false
    },
    {
      cell: (row) => (
        <div>
        <IconButton color='primary' fontSize='small'   aria-label='View Form'
        title='View Form' onClick={() => viewForm(row)}>
          <AddCircleOutlineIcon />
        </IconButton>
         <IconButton color='primary' fontSize='small'   aria-label='Edit Form'
         title='Edit Form' onClick={() => editForm(row)}>
           <AddCircleOutlineIcon />
         </IconButton>
         </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]

  const columns = (openForm) => [
    {
      name: 'Service Form',
      selector: 'displayName',
      sortable: false
    },
    {
      cell: (row) => (
        <IconButton color='primary' fontSize='small'   aria-label='Fill Form'
        title='Fill Form' onClick={() => openForm(row)}>
          <AddCircleOutlineIcon />
        
        </IconButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

return (
  <div>
    { !showFormPage ?
  <Row>
                <Col lg={5} >
                  <Card  style={cardStyle} className=" p-3">
                    <CardHeader>Available Service Forms</CardHeader>
                    <CardBody>
                        {message ? 
                        <Alert color="primary">
                          {message}
                        </Alert> : ""
                         }
                        {
                          showLoading ? 
                          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <span>  Fetching Service Forms &nbsp; </span> <Spinner animation="border" role="status" >
                          <span className="sr-only"></span>
                          </Spinner></div>
                          : ""
                        }
{ (serviceForms && serviceForms.length) > 0 ? 
<div>
    <DataTable
      columns={columns(loadForm)}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} 
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      highlightOnHover={true}
      subHeaderAlign={'left'}
      noTableHead={true}
      noHeader={true}
    />

      </div> : ""}

                        </CardBody>
                        </Card>
                        </Col>

                        <Col lg={7}>
                        <Card  style={cardStyle} className=" p-3">
                          <CardHeader>Service Forms History</CardHeader>
                    <CardBody>
                    {encounterMessage ? 
                        <Alert color="primary">
                          {encounterMessage}
                        </Alert> : ""
                         }
                        {
                          showEncounterLoading ? 
                          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <span>  Fetching Service Form History &nbsp; </span> <Spinner animation="border" role="status" >
                          <span className="sr-only"></span>
                          </Spinner></div>
                          : ""
                        }
{ (patientEncounters && patientEncounters.length) > 0 ? 
<div>
    <DataTable
      columns={encounterColumns(viewForm, editForm)}
      data={encounterFilteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle} 
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      highlightOnHover={true}
      subHeaderAlign={'left'}
      noTableHead={true}
      noHeader={true}
    />

      </div> : ""}
                        </CardBody>
                        </Card>
                        </Col>
                        </Row>
:
<Row>
  <Col>
  <div>
            <Button color="primary" className=" float-right mr-1" onClick={togglePage} >
                Go Back
                </Button>
                { currentForm ?
            <FormRenderer patientId={props.patient.patientId} formId={currentForm.id} serviceName={currentForm.serviceName} visitId={props.patient.visitId} onSuccess={onSuccess}/>
            : ""}
        </div>
  </Col>
</Row>
}
<ToastContainer />
                        </div>
)
}

const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
    formList: state.formManager.formList,
    patientEncounterList: state.patients.encounters
  }
}

const mapActionToProps = {
  fetchForms: actions.fetchAll,
  fetchPatientEncounters: patientActions.fetchPatientEncounters
}

export default connect(mapStateToProps, mapActionToProps)(ServiceFormPage)
