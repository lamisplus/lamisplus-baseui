import React, { useState, Fragment, useEffect } from "react";
import "./patientPrescriptions.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
} from "../../actions/pharmacy";
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const PatientPrescriptions = props => {
 
  const forms = props.location.forms;
  const patientName = props.location.patientName;
  
   const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const { className } = props;


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDispense = (formData, formId) => {
    formData.prescription_status = 1
    props.updatePrescriptionStatus(formId, formData);
    console.log(formId)
    setOpen(false);
  };

  useEffect(() => {
   
  })
  

  return (
    <div className="patpres">
      <h2>Pharmacy</h2>
      <Divider variant="middle" />
      <br />
      <span>Pharmacy > 012345678</span>
      <br />
      <br />
      <h5>View prescription - 012345678</h5>
      <div className="info_box">
        <p> {patientName} ( 012345678) | 23 years</p>
        <p> Female </p>
      </div>
      <div className="pres_table">
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Prescription</th>
              <th>Note/Remarks</th>
              <th>View Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.prescriptions ? (
              forms.map((form) => (
                <Fragment>
                  {" "}
                  <tr style={{ marginBottom: "10 rem" }}>
                    <td>
                      <span>
                        <b>{form.data.generic_name}</b>
                      </span>
                      <br />
                      <span>{form.data.comment}</span>
                    </td>
                    <td>
                      <span>{form.data.comment}</span>
                    </td>
                    <td>
                      <VisibilityIcon
                        onClick={toggle2}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      {form.data.prescription_status == 0 ? (
                        <button
                          style={{
                            marginTop: "5px",
                            borderRadius: "3px",
                            outline: "none",
                            backgroundColor: "#40b02c",
                            color: "#ffffff",
                          }}
                          onClick={handleClickOpen}
                        >
                          dispense
                        </button>
                      ) : (
                        <button
                          style={{
                            marginTop: "5px",
                            borderRadius: "3px",
                            outline: "none",
                          }}
                          disabled
                        >
                          dispense
                        </button>
                      )}
                    </td>
                    <td></td>
                  </tr>
                  <Modal
                    isOpen={modal2}
                    toggle={toggle2}
                    className={className}
                    size="lg"
                  >
                    <ModalHeader toggle={toggle2}>
                      Precription Details
                    </ModalHeader>
                    <ModalBody>
                      <Row style={{ marginTop: "20px" }}>
                        <Col xs="12">
                          Drug Name
                          <br />
                          <p style={textstyle}>{form.data.generic_name} </p>
                        </Col>
                        <Col xs="4">
                          Dosage
                          <br />
                          <p style={textstyle}>{form.data.dosage}</p>
                        </Col>
                        <Col xs="4">
                          Unit
                          <br />
                          <p style={textstyle}>{form.data.duration_unit}</p>
                        </Col>
                        <Col xs="4">
                          Frequency
                          <br />
                          <p style={textstyle}>
                            {form.data.dosage_frequency} time(s) daily
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "20px" }}>
                        <Col xs="4">
                          Start Date
                          <br />
                          <p style={textstyle}>{form.data.start_date}</p>
                        </Col>
                        <Col xs="12">Additional Information</Col>
                        <hr />
                        <Col xs="4">
                          Instruction
                          <br />
                          <p style={textstyle}>{form.data.comment}</p>
                        </Col>
                        <Col xs="4">
                          Additional Instruction
                          <br />
                          <p style={textstyle}>
                            {form.data.comment ? form.data.comment : "None"}
                          </p>
                        </Col>
                      </Row>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Mark {form.data.generic_name} as dispensed?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="danger">
                        No
                      </Button>
                      <Button
                        onClick={() => handleDispense(form.data, form.id)}
                        color="green"
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Fragment>
              ))
            ) : (
              <h2>No Prescriptions Found</h2>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prescriptions: state.pharmacy.patientPrescriptions,
  }
}

export default connect(mapStateToProps, {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
})(PatientPrescriptions);
