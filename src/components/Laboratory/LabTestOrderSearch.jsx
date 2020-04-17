import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { fetchAllLabTestOrder } from "actions/laboratory";
import { connect } from "react-redux";
import "./PatientSearch.css";

const PatientSearch = (props) => {
    useEffect(() => {
        props.fetchAllLabTestOrderToday();
      }, []); //componentDidMount
  return (
    <div>
      <MaterialTable
        title="Patients Prescriptions Table"
        columns={[
          {
            title: "Patient Name",
            field: "name",
          },
          { title: "Patient ID", field: "Id" },
          { title: "Test Order date", field: "date", type: "date" },
          { title: "Total Test Order", field: "number", type: "number" },
          { title: "Total Test Order", field: "number", type: "number" },
          {
            title: "Status",
            field: "status",
            lookup: {
              0: <span className="note">dispensed</span>,
              1: "pending",
            },
          },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        data={props.patientsTestOrderList.map((prescription) => ({
          name: prescription.firstName +" "+ prescription.lastName,
          Id: prescription.patientId,
          date: prescription.dateEncounter +" "+ prescription.timeCreated,
          status: 0,
          actions: <Link to ={{ pathname: "/patientPrescriptions", name: prescription.firstName +" "+ prescription.lastName, patientId : prescription.patientId}}  style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}>View</Link>
      
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#1D4380",
            color: "#FFF",
          },
          filtering: true,
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


