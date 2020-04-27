
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import { updatePrescriptionStatus } from "../../actions/pharmacy";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import { Spinner } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import "./modal.css";

Moment.locale("en");
momentLocalizer();
const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const textstyle = {
  fontSize: "14px",
  fontWeight: "bolder",
};

const ViewModal = (props) => {
  const { buttonLabel, className } = props;
  const toggle = props.toggle;
  const modal = props.isOpen;
  const closeBtn = props.close;
  const classes = useStyles();
  const form= props.formData ? props.formData : {};
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

    console.log(formValues);
  };



  return (
    <div>
      <Card>
        <CardBody>
          <ToastContainer autoClose={3000} hideProgressBar />
          <Modal
            isOpen={modal}
            toggle={toggle}
            className={className}
            size="lg"
          >
            <ModalHeader toggle={toggle}>Prescription Details</ModalHeader>
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
              <Button color="secondary" onClick={toggle}>
                Close
              </Button>
            </ModalBody>
          </Modal>
          ;
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewModal;

