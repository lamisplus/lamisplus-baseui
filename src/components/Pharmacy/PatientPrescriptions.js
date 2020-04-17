import React, { useState, useEffect, Fragment } from "react";
import "./patientPrescriptions.css";
import { Checkbox } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {fetchPatientPrescriptions} from '../../actions/pharmacy'
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
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

const PatientPrescriptions = props => {
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const { className } = props;

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const patientId = props.location.patientId;
  const patientName = props.location.name;

    useEffect(() => {
      props.fetchPatientPrescriptions(patientId);
    }, []);

    console.log(props.prescriptions)

  const datas = [{
    drugName: "Paracetamol 500 mg (tablets)",
    drugId: "56",
    comment: " 2 (3times daily) 13 tablets Start on 12/01/2020 for 2 weeks"
  },
    {
    gender: "Male",
    drugName: "Paracetamol 500 mg (tablets)",
    drugId: "56",
    comment: " 2 (3times daily) 13 tablets Start on 12/01/2020 for 2 weeks"
    },
    {
    drugName: "Paracetamol 500 mg (tablets)",
    drugId: "56",
    comment: " 2 (3times daily) 13 tablets Start on 12/01/2020 for 2 weeks"
  }]

  

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
              <th>S/N</th>
              <th>Prescription</th>
              <th>Note/Remarks</th>
              <th>Action</th>
              <th>Dispensed</th>
            </tr>
          </thead>
          <tbody>
            {props.prescriptions ? (
              datas.map((data) => (
                <Fragment>
                  {" "}
                  <tr style={{marginBottom: "10 rem"}}>
                    <td>1</td>
                    <td>
                      <span>
                        <b>{data.drugName}</b>
                      </span>
                      <br />
                      <span>{data.comment}</span>
                    </td>
                    <td>
                      <span>Administer adequately</span>
                    </td>
                    <td>
                      <VisibilityIcon
                        onClick={toggle2}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      {" "}
                      <Switch
                        checked={state.checkedB}
                        onChange={handleChange}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </td>
                  </tr>
                  <hr  width= "80%" />
                </Fragment>
              ))
            ) : (
              <h2>No Prescriptions Found</h2>
            )}
          </tbody>
        </table>
      </div>
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
};

const mapStateToProps = (state) => {
  return {
    prescriptions: state.pharmacy.patientPrescriptions
  }
}

export default connect(mapStateToProps, {fetchPatientPrescriptions})(PatientPrescriptions);
