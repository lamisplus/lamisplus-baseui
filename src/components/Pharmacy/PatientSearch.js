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
            title: "Total Count",
            field: "count",
            filtering: false,
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
          count: prescription.formDataObj.length,
          actions: (
            <Link
              to={{
                pathname: "/patientPrescriptions",
                forms: prescription.formDataObj,
                patientName:
                  prescription.firstName + " " + prescription.lastName,
              }}
              style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}
            >
              <button
                style={{
                  borderRadius: "5px",
                  padding: "0.2rem 0.5rem",
                  backgroundColor: "1f4380",
                  outline: "none",
                }}
              >
                view
              </button>
            </Link>
          ),
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#1D4380",
            color: "#FFF",
          },
          filtering: true,
          searchFieldStyle: {
            margin: "auto"
          
          },
        }}
      />
    </div>
  );
}

export default PatientSearch;


