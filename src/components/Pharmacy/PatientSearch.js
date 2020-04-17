import React from 'react';
import MaterialTable from 'material-table';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom'
import "./patientPrescriptions.css";

const PatientSearch = (props) => {
  const prescriptions = useSelector(state => state.pharmacy.allPrescriptions)
 
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
          { title: "Prescription Date", field: "date", type: "date" },
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
        data={prescriptions.map((prescription) => ({
          name: prescription.firstName,
          Id: prescription.patientId,
          date: prescription.dateEncounter,
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

export default PatientSearch;


