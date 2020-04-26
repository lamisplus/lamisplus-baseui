import React, { useState, useEffect } from "react";
import Page from "components/Page";
import { MdSave } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import MatButton from '@material-ui/core/Button';
import { Table } from 'reactstrap'
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import { FaPlusSquare } from "react-icons/fa";
import { TiArrowForward } from "react-icons/ti";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Spinner } from "reactstrap";
import PatientDetailCard from "components/Functions/PatientDetailCard";
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const saveColllectSample = (e) => {
  e.preventDefault();
};

const handleLabNumber = (e) => {
  e.preventDefault()
}

const Prescriptions = (props) => {
  const [loading, setLoading] = useState(true)
  const forms = props.location.forms;
    const classes = useStyles();
  return (
    <Page title="Collect Sample">
      <ToastContainer autoClose={2000} />
      <Row>
        <Col>
          <div>
            {props.location.forms ? (
              <PatientDetailCard getpatientdetails={props.location.state} />
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
              Test Order Details 
              <Link to="/laboratory">
                <Button color="primary" className=" float-right mr-1">
                  <TiArrowBack />
                  Go Back
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <br />
              <Row>
                <Col>
                  <Card body>
                    <Row form>
                      <Col md={3}></Col>
                    </Row>
                    <Form onSubmit={saveColllectSample}>
                      <Table
                        style={{ fontWeight: "bolder", borderColor: "#000" }}
                        striped
                      >
                        <thead
                          style={{ backgroundColor: "#3E51B5", color: "#fff" }}
                        >
                          <tr>
                            <th>Test</th>
                            <th>Sample Type</th>
                            <th>Date Requested</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!loading ? (
                            forms.map((row) => <tr key={row.id}></tr>)
                          ) : (
                            <p>
                              {" "}
                              <Spinner color="primary" /> Loading Please Wait
                            </p>
                          )}
                        </tbody>
                      </Table>

                      <br />

                      <Row form>
                        <Col md={3} style={{ marginTop: "20px" }}>
                          <Input
                            type="text"
                            placeholder="Lab. Number "
                            className="cr-search-form__input "
                            name="lab_number"
                            id="lab_number"
                            value={45}
                            onChange={handleLabNumber}
                          />
                        </Col>
                        <Col md={2}>
                          <p style={{ paddingLeft: "30px", marginTop: "30px" }}>
                            {" "}
                            OR Generate{" "}
                          </p>
                        </Col>
                        <Col md={2} style={{ marginTop: "20px" }}>
                          {/* <DateTimePicker
                            time={false}
                            name="date_sample_collected"
                            id="date_sample_collected"
                            defaultValue={new Date()}
                            max={new Date()}
                          /> */}
                        </Col>

                        <Col md={2} style={{ marginTop: "20px" }}>
                          <FormGroup>
                            <MatButton
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<MdSave />}
                            >
                              Save
                            </MatButton>
                          </FormGroup>
                        </Col>
                      </Row>
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
