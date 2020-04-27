import React, { useState, useEffect } from "react";
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

import {
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
} from "reactstrap";

Moment.locale("en");
momentLocalizer();

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });

const Prescriptions = (props) => {

  console.log(props.location.form)

  console.log(props.location.form.formDataObj)


 const formData = props.location.form.formDataObj
  const saveColllectSample = (e) => {
    e.preventDefault();
  };

  const handleLabNumber = (e) => {
    e.preventDefault();
  };

  const [labTestType, setLabTestType] = useState([]);

  //Make the list contain unique list of Data
  const uniqueValues = [...new Set(labTestType)];
  const [loading, setLoading] = useState(true)
  const forms = props.location.form;
    const classes = useStyles();
  return (
    <Page title="Dispense Drugs">
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div>
            {props.location.form ? (
              <PatientDetailCard getpatientdetails={props.location.form} />
            ) : (
              <p>
                {" "}
                <Spinner color="primary" /> Loading Please Wait..
              </p>
            )}
          </div>
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
                        style={{ fontWeight: "bolder", borderColor: "#000" }}
                        striped
                      >
                        <thead
                          style={{ backgroundColor: "#9F9FA5", color: "#000" }}
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
                                <i class="fa fa-medkit" aria-hidden="true"></i>&nbsp;&nbsp;<VisibilityIcon />
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
        </Col>
      </Row>
    </Page>
  );
}

export default Prescriptions
