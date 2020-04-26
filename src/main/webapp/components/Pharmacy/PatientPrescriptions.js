import React, { useState, Fragment, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import "./patientPrescriptions.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
} from "../../actions/pharmacy";
import { connect } from "react-redux";
import { Divider } from "@material-ui/core";
 import Modal from "./Modal"

import {
  Col,
  Row,
  // Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MatButton from '@material-ui/core/Button'
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: "5rem",
    width: "88%",
  }
}));

const color = "#1D4380";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: color,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const textstyle = {
  fontSize: "14px",
  fontWeight: "bolder",
};

const PatientPrescriptions = (props) => {
  const forms = props.location.forms;
  const patientName = props.location.patientName;
  const classes = useStyles();

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const [values, setValues] = useState({
    weight: "",
    text:""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  const { className } = props;

  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDispense = (formData, formId) => {
    formData.prescription_status = 1;
    const updatedData = {
      data: { ...formData },
    };
    props.updatePrescriptionStatus(formId, updatedData);
    console.log(formId);
    setOpen(false);
  };

  useEffect(() => {});

  return (
    <div className="patpres">
      <h2>Pharmacy</h2>
      <Divider variant="middle" />
      <br />
      <br />
      {props.location.forms ? (
        <Fragment>
          <h5>View prescription - 012345678</h5>
          <div className="info_box">
            <p> {patientName} ( 012345678) | 23 years</p>
            <p> Female </p>
          </div>

          <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Dosage</StyledTableCell>
                  <StyledTableCell align="right">
                    Date Prescribed
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Date dispensed
                  </StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                  <StyledTableCell align="right">View Details</StyledTableCell>
                </TableRow>
              </TableHead>
              {forms.map((form, index) => (
                <TableBody key={index}>
                  {console.log(form)}
                  <TableRow key={form.id}>
                    <TableCell>{form.data.generic_name}</TableCell>
                    <TableCell align="right">{form.data.dosage}</TableCell>
                    <TableCell align="right">
                      {form.data.date_prescribed}
                    </TableCell>
                    <TableCell align="right">
                      {form.data.date_dispensed}
                    </TableCell>
                    <TableCell align="right">
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
                    </TableCell>
                    <TableCell align="right">
                      <VisibilityIcon onClick={toggle2} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Fragment>
      ) : (
        <h2 style={{ margin: "auto" }}>No Prescriptions</h2>
        )}
      <Modal />
    </div>
  
  );
};

const mapStateToProps = (state) => {
  return {
    prescriptions: state.pharmacy.patientPrescriptions,
  };
};

export default connect(mapStateToProps, {
  fetchPatientPrescriptions,
  updatePrescriptionStatus,
})(PatientPrescriptions);
