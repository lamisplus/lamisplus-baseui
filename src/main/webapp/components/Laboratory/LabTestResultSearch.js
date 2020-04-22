
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "actions/laboratory";
import "./laboratory.css";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const PatientSearch = (props) => {
  const [loading, setLoading] = useState('')
  useEffect(() => {
    setLoading('true');
    const onSuccess = () => {
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)     
    }
        props.fetchAllLabTestOrderToday(onSuccess, onError);
      }, []); //componentDidMount
 
  return (
    <div>
      <MaterialTable
        title="Laboratry Test Results"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Test Order Date", field: "date", type: "date" },
          {
            title: "Total Sample ",
            field: "count",
            filtering: false
          },
          {
            title: "Total Result",
            field: "samplecount",
            filtering: false
          },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        isLoading={loading}
        data={props.patientsTestOrderList.map((row) => ({
          name: row.firstName +  ' ' + row.lastName,
          Id: row.patientId,
          date: row.dateEncounter,
          count: row.formDataObj.length,
          samplecount: 0,
          actions: <Link to ={{ 
                                pathname: "/collect-result",  
                                state: { getpatientlists:{row}}, 
                                patientName: row.firstName + ' ' + row.lastName}}  
                                style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}>
                                <Tooltip title="Enter Result">
                                    <IconButton aria-label="ENTER RESULT" >
                                      <NoteAddIcon color="primary"/>
                                  </IconButton>
                                  </Tooltip>
                    </Link>
          
        }))}
        options={{
          filtering:false,
          headerStyle: {
            backgroundColor: "#9F9FA5",
            color: "#000",
          },
          searchFieldStyle: {
            width : '300%',
            margingLeft: '250px',
          },
          
          exportButton: true,
          searchFieldAlignment: 'left',
          icon: 'refresh',
           tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
        }}
        
      />
    </div>
  );
}

const mapStateToProps = state => {

    return {
      patientsTestOrderList: state.laboratory.list
    };
  };
  
  const mapActionToProps = {
    fetchAllLabTestOrderToday: fetchAllLabTestOrder
  };
  
export default connect(mapStateToProps, mapActionToProps)(PatientSearch);


