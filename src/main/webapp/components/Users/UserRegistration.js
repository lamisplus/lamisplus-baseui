import axios from "axios";
import Page from "components/Page";
import React, { useState, useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
  FormFeedback,
  FormText,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
// import { IoMdFingerPrint } from "react-icons/io";
// import { FaFileImport } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
// React Notification
import Title from "components/Title/CardTitle";
import { url } from "../../api";
import { register } from "../../actions/user";
import { initialfieldState_userRegistration } from "./initialFieldState_UserRegistration";
import useForm from "../Functions/UseForm";
import { Spinner } from "reactstrap";

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
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
}));

const UserRegistration = (props) => {
  // const [currentId, setCurrentId] = useState(0) ;
  const classes = useStyles();

  const { values, handleInputChange, resetForm } = useForm(
    initialfieldState_userRegistration
  );

  const [saving, setSaving] = useState(false);
  const [display, setDisplay] = useState(false);
  const [estimated, setEstimated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);
    const onSuccess = () => {
      setSaving(false);
      resetForm();
    };
    const onError = () => {
      setSaving(false);
    };
    props.create(values, onSuccess, onError);
  };

  return (
    <Page title="User Registration">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Alert color="primary">
        All Information with Asterisks(*) are compulsory
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Col xl={12} lg={12} md={12}>
          <Card className={classes.cardBottom}>
            <CardContent>
              <Title>User Information</Title>
              <br />
              <Col md={4}>
                <FormGroup>
                  <Label for="firstName">First Name *</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                  />
                  <FormFeedback>
                    Oh noes! that name is already taken
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name * </Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleInputChange}
                    value={values.lastName}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={values.email}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password *</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                    value={values.password}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Confirm Password *</Label>
                  <Input
                    type="password"
                    name="confirm"
                    id="confirm"
                    onChange={handleInputChange}
                    value={values.confirm}
                  />
                </FormGroup>
              </Col>

              <Row>
                <Col md={12}></Col>
              </Row>
              {saving ? <Spinner /> : ""}
              <br />
              <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                disabled={saving}
              >
                {!saving ? (
                  <span style={{ textTransform: "capitalize" }}>Save</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Saving...</span>
                )}
              </MatButton>

              <MatButton
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={resetForm}
              >
                <span style={{ textTransform: "capitalize" }}>Cancel</span>
              </MatButton>
            </CardContent>
          </Card>
        </Col>
      </Form>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  status: state.users.status,
});

export default connect(mapStateToProps, { register })(UserRegistration);
