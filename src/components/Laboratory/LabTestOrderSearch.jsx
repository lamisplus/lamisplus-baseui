
import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "actions/laboratory";
import "./laboratory.css";

const PatientSearch = (props) => {
      useEffect(() => {
        props.fetchAllLabTestOrderToday();
      }, []); //componentDidMount
 
  return (
    <div>
      <MaterialTable
        title="Laboratry Test Order Table"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Test Order Date", field: "date", type: "date" },
          {
            title: "Test  Count",
            field: "count",
            filtering: false
          },
          {
            title: "Total Sample Collected",
            field: "samplecount",
            filtering: false
          },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        ///isLoading={props.patientsTestOrderList.isLoading}
        data={props.patientsTestOrderList.map((row) => ({
          name: row.firstName +  ' ' + row.lastName,
          Id: row.patientId,
          date: row.dateEncounter,
          count: row.formDataObj.length,
          samplecount: 0,
          actions: <Link to ={{ 
                                pathname: "/collect-sample",  
                                state: { getpatientlists:{row}}, 
                                patientName: row.firstName + ' ' + row.lastName}} 
                                style={{ cursor: "pointer", color: "blue", 
                                fontStyle: "bold" }}>
                                Collect Sample
                                </Link>
          
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#1D4380",
            color: "#FFF",
          },
          
          searchFieldStyle: {
            width : '300%',
            margingLeft: '250px',
          },
          filtering: true,
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


