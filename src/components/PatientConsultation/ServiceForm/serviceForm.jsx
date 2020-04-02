import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Link} from 'react-router-dom';
import {
    Form,
    Input,
    Alert,
    CardBody,
    Card,
    CardHeader,
    Col,
    Row,
  } from 'reactstrap';
  import DataTable from 'react-data-table-component';
  import Spinner from 'react-bootstrap/Spinner';
  import {connect} from 'react-redux';
  import * as actions from "actions/formManager";

const cardStyle = {
  borderColor: '#fff',
  marginBottom: 10,
  height: 600,
  overflow: 'auto'
}

function ServiceFormPage (props) {
  const [showLoading, setShowLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [serviceForms, setServiceForms] = useState()
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  
  const filteredItems = !serviceForms ? [] : serviceForms.filter(
    item =>
      (item.displayName &&
        item.displayName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.lastName &&
        item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.hospitalNumber &&
        item.hospitalNumber.toLowerCase().includes(filterText.toLowerCase()))
  )

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
  }, [props.patient]);

  React.useEffect(() => {
    setServiceForms(props.formList)
  }, [props.formList]);
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

  const columns = [
    {
      name: 'Service Form',
      selector: 'displayName',
      sortable: false
    },
    {
      cell: (row) => (
        <IconButton color='primary' fontSize='small'>
          <Link to={{ pathname: '/form-renderer', state: { form: {row}} }}>
          <AddCircleOutlineIcon />
          </Link>
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
      columns={columns}
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
                       
                        </CardBody>
                        </Card>
                        </Col>
                        </Row>
)
}

const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
    formList: state.formManager.formList
  }
}

const mapActionToProps = {
  fetchForms: actions.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(ServiceFormPage)
