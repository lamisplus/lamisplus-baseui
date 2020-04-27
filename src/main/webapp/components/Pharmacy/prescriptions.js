import React, { useState, useEffect, Fragment} from "react";
import Page from "components/Page";
import { MdSave } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import MatButton from '@material-ui/core/Button';
import { Table } from 'reactstrap'
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import momentLocalizer from "react-widgets-moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FaPlusSquare } from "react-icons/fa";
import { TiArrowForward } from "react-icons/ti";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Moment from "moment";
import { Spinner } from "reactstrap";
import PatientDetailCard from "./PatientDetailCard";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import { DateTimePicker } from "react-widgets";
import Modal from './Modal'

import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

Moment.locale("en");
momentLocalizer();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
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

const Prescriptions = (props) => {

  const classes = useStyles();
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [drugDetails, setDrugDetails] = useState({})

  const toggle = (form) => {
    setDrugDetails({...drugDetails,  ...form})
    setModal(!modal);
  } 
  const toggle1 = () => setModal1(!modal1)

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

   const closeBtn1 = (
     <button className="close" onClick={toggle1}>
       &times;
     </button>
   );


  const formData = props.location.form ? props.location.form.formDataObj : null 
  const saveColllectSample = (e) => {
    e.preventDefault();
  };

  const handleLabNumber = (e) => {
    e.preventDefault();
  };


  return (
    <Page title="Dispense Drugs">
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div>
            {formData ? (
              <Fragment>
                <PatientDetailCard getpatientdetails={props.location.form} />
                <br />
                <Card className="mb-12">
                  <CardHeader>
                    DRUG ORDER DETAILS
                    <Link to="/pharmacy">
                      <MatButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        className=" float-right mr-1"
                      >
                        <TiArrowBack /> Back
                      </MatButton>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <br />
                    <Row>
                      <Col>
                        <Card body>
                          <Form onSubmit={saveColllectSample}>
                            <Table
                              style={{
                                fontWeight: "bolder",
                                borderColor: "#000",
                              }}
                              striped
                            >
                              <thead
                                style={{
                                  backgroundColor: "#9F9FA5",
                                  color: "#000",
                                }}
                              >
                                <tr>
                                  <th>Name</th>
                                  <th>Dosage</th>
                                  <th>Date Prescribed</th>
                                  <th>Date Dispensed</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {formData.map((form) => (
                                <tbody>
                                  <tr>
                                    <th>{form.data.generic_name}</th>
                                    <th>{form.data.dosage}</th>
                                    <th>{form.data.date_prescribed}</th>
                                    <th>{form.data.dispensed}</th>
                                    <th>
                                      <i
                                        class="fa fa-medkit"
                                        aria-hidden="true"
                                        onClick={() => toggle(form)}
                                      ></i>
                                      &nbsp;&nbsp;
                                      <VisibilityIcon onClick={toggle1} />
                                    </th>
                                  </tr>
                                </tbody>
                              ))}
                            </Table>

                            <br />
                          </Form>
                        </Card>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Fragment>
            ) : (
              <p>
                {" "}
                {/* <Spinner color="primary" /> Loading Please Wait.. */}
                <h3>No Prescription details</h3>
              </p>
            )}
          </div>
        </Col>
      </Row>
      {modal ? (
        <Modal isOpen={modal} toggle={toggle} close={closeBtn} formData={drugDetails}></Modal>
      ) : (<div></div>)}
      {/* <Modal isOpen={modal1} toggle={toggle1} className={className}>
        <ModalHeader toggle={toggle1} close={closeBtn1}>
          Modal title
        </ModalHeader>
        <ModalBody>Undisputed Champion of Notre Dame</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle1}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle1}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </Page>
  );
}

export default Prescriptions
