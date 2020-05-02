import React, { useState, useEffect, Fragment} from "react";
import Page from "components/Page";
import { TiArrowBack } from "react-icons/ti";
import MatButton from '@material-ui/core/Button';
import { Table } from 'reactstrap'
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import momentLocalizer from "react-widgets-moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { TiArrowForward } from "react-icons/ti";
import Tooltip from "@material-ui/core/Tooltip";
import Moment from "moment";
import PatientDetailCard from "./PatientDetailCard";
import { Link } from "react-router-dom";
import DispenseModal from './DispenseModal'
import ViewModal from './ViewModal'
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";

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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAction = () => setDropdownOpen((prevState) => !prevState);

  const toggle = (form) => {
    setDrugDetails({ ...drugDetails, ...form });
    setModal(!modal);
  } 
  const toggle1 = (form) => {
    setDrugDetails({ ...drugDetails, ...form });
    setModal1(!modal1)
  }

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

 const Actions = (form) => {
   return (
     <Menu>
       <MenuButton
         style={{
           backgroundColor: "#3F51B5",
           color: "#fff",
           border: "2px solid #3F51B5",
           borderRadius: "4px",
         }}
       >
         Action <span aria-hidden>▾</span>
       </MenuButton>
       <MenuList style={{ hover: "#eee" }}>
         {form.data.prescription_status === 0 ? (
           <MenuItem onSelect={() => toggle(form)}>
             <i
               className="fa fa-pencil"
               aria-hidden="true"
               size="15"
               style={{ cursor: "pointer", color: "#000" }}
             >
               &nbsp; {""} Dispense drugs
             </i>
           </MenuItem>
         ) : (
           <MenuItem onSelect={() => toggle(form)}>
             <i
               className="fa fa-pencil"
               aria-hidden="true"
               size="15"
               style={{ cursor: "pointer", color: "#000" }}
             >
               &nbsp; {""} Update details
             </i>
           </MenuItem>
         )}
         <MenuItem onSelect={() => toggle1(form)}>
           {/* <VisibilityIcon
             size="10"
             style={{ color: "#000", cursor: "pointer" }}
           />{" "} */}
           <i
             className="fa fa-eye"
             aria-hidden="true"
             size="15"
             style={{ cursor: "pointer", color: "#000" }}
           >
             &nbsp; {""}View details
           </i>
         </MenuItem>
       </MenuList>
     </Menu>
   );
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
                        <TiArrowBack /> &nbsp; back
                      </MatButton>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <br />
                    <Row>
                      <Col>
                        <Card body>
                            <Table
                              style={{
                                fontWeight: "bolder",
                                borderColor: "#000",
                              }}
                              responsive
                            >
                              <thead
                                style={{
                                  backgroundColor: "#9F9FA5",
                                  color: "#000",
                                }}
                              >
                                <tr>
<<<<<<< HEAD
                                  <th>{form.data.generic_name}</th>
                                  <th>{form.data.dosage}</th>
                                  <th>{form.data.date_prescribed}</th>
                                  <th>{form.data.date_dispensed}</th>
                                  <th>
                                    {/* <Dropdown
                                    color="primary"
                                      isOpen={dropdownOpen}
                                      toggle={toggleAction}
                                    >
                                      <DropdownToggle caret>
                                        Actions 
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem
                                          onClick={() => toggle(form)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <i
                                            class="fa fa-medkit"
                                            aria-hidden="true"
                                          ></i>
                                          &nbsp; Dispense
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() => toggle1(form)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <VisibilityIcon />
                                          &nbsp; View
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </Dropdown> */}
                                    {form.data.prescription_status == 0 ? (
                                      <Fragment>
                                      
                                        <i
                                          class="fa fa-pencil"
                                          aria-hidden="true"
                                          onClick={() => toggle(form)}
                                          style={{ cursor: "pointer" }}
                                        ></i>
                                        &nbsp; &nbsp;
                                        <VisibilityIcon
                                          onClick={() => toggle1(form)}
                                          style={{ cursor: "pointer" }}
                                        />
                                      </Fragment>
                                    ) : (
                                      <VisibilityIcon
                                        onClick={() => toggle1(form)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    )}
                                  </th>
=======
                                  <th>Name</th>
                                  <th>Dosage</th>
                                  <th>Date Prescribed</th>
                                  <th>Date Dispensed</th>
                                  <th></th>
>>>>>>> 78e4ba5cdf593ba5a9b8e9dd17b2f1eeafd6482a
                                </tr>
                              </thead>

                              {formData.map((form) => (
                                <tbody key={form.id}>
                                  <tr>
                                    <td>
                                      <b>{form.data.generic_name}</b>
                                    </td>
                                    <td>{form.data.dosage}</td>
                                    <td>{form.data.date_prescribed}</td>
                                    <td>{form.data.date_dispensed}</td>
                                    <td>{Actions(form)}</td>
                                  </tr>
                                </tbody>
                              ))}
                            </Table>
                            <br />
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
        <DispenseModal
          isOpen={modal}
          toggle={toggle}
          close={closeBtn}
          formData={drugDetails}
        ></DispenseModal>
      ) : (
        <div></div>
      )}

      {modal1 ? (
        <ViewModal
          isOpen={modal1}
          toggle={toggle1}
          close={closeBtn1}
          formData={drugDetails}
        ></ViewModal>
      ) : (
        <div></div>
      )}
    </Page>
  );
}

export default Prescriptions
