import React, { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import VisibilityIcon from "@material-ui/icons/Visibility";
import { fetchPatientPrescriptions } from "../../actions/pharmacy";
import { Checkbox } from "@material-ui/core";
import { useSelector, useDispatch, connect} from 'react-redux';
import { Link } from 'react-router-dom'
import "./patientPrescriptions.css";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const textstyle = {
  fontSize: "14px",
  fontWeight: "bolder"
};



const PatientSearch = (props) => {
   const dispatch = useDispatch();
  const { className } = props;
  const prescriptions = useSelector(state => state.pharmacy.allPrescriptions)
  const patientPrescriptions = useSelector(state => state.pharmacy.patientPrescriptions)
  const [modal2, setModal2] = useState(false);
  const toggle2 = (patientId) => {
    props.fetchPatientPrescriptions(patientId);
    console.log(patientId)
    setModal2(!modal2);
  };
 
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
          actions: <Link to ={{ pathname: "/patientPrescriptions", name: prescription.firstName +" "+ prescription.lastName, patientId : prescription.patientId}} onClick={toggle2} style={{ cursor: "pointer", color: "blue", fontStyle: "bold" }}>View</Link>
       
            //(
          //   <VisibilityIcon onClick={()=>toggle2(prescription.patientId)} style={{ cursor: "pointer" }} />
          // ),
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#1D4380",
            color: "#FFF",
          },
          filtering: true,
        }}
      />
      <Modal isOpen={modal2} toggle={toggle2} className={className} size="lg">
        <ModalHeader toggle={toggle2}>Precription Detail</ModalHeader>
        <ModalBody>
          <Row style={{ marginTop: "20px" }}>
            <Col xs="12">
              Drug Name
              <br />
              <p style={textstyle}>Paracetamol 55mg </p>
            </Col>
            <Col xs="4">
              Dose
              <br />
              <p style={textstyle}>3</p>
            </Col>
            <Col xs="4">
              Unit
              <br />
              <p style={textstyle}>Tablet</p>
            </Col>
            <Col xs="4">
              Frequency
              <br />
              <p style={textstyle}>Three times daily</p>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col xs="4">
              Start Date
              <br />
              <p style={textstyle}>2020/03/12</p>
            </Col>
            <Col xs="12">Additional Information</Col>
            <Col xs="4">
              Instruction
              <br />
              <p style={textstyle}>020/03/03</p>
            </Col>
            <Col xs="4">
              Additional Instruction
              <br />
              <p style={textstyle}>Nil</p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default connect(null, { fetchPatientPrescriptions })(PatientSearch);


