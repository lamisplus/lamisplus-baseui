import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { MdSave, MdViewList } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import "react-datepicker/dist/react-datepicker.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import MatButton from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Badge } from "reactstrap";
import Page from "components/Page";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(1),
    width: 200
  }
}));
const useStyles2 = makeStyles(theme => ({
  inforoot: {
    width: "100%",
    marging: theme.spacing(5)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));
function createData(name, calories, fat) {
  return { name, calories, fat };
}
const rows = [
  createData("1", "Paracetamol", "Should Take them daily"),
  createData("2", "Vitamin B", "Should Take Monthly"),
  createData("3", "Vitamin B", "Need Hot water ")
];
const textstyle = {
  fontSize: "14px",
  fontWeight: "bolder"
};

export default function ViewPrescription(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const { className } = props;

  return (
    <Page title="View Prescription">
      <Row>
        <Col>
          <div className={classes2.inforoot}>
            <ExpansionPanel
              defaultExpanded
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes2.column}>
                  <Typography className={classes.heading}>
                    Name: Alex Willaims Adeoye
                    <br />
                    Gender: Female
                  </Typography>
                </div>
                <div className={classes2.column}>
                  <Typography className={classes2.heading}>
                    DOB: June, 14 1990 (20 years)
                    <br />
                    Phone Number : +234567890
                  </Typography>
                </div>
                <div className={classes2.column}>
                  <Typography className={classes2.heading}>
                    Email: Alext@gmail.com
                  </Typography>
                </div>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </div>
          <br />
          <Card className="mb-12">
            <CardHeader className="text-primary">
              <Link to="/pending-prescription">
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
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="caption table"
                      >
                        <TableHead style={{ fontWeight: "bolder" }}>
                          <TableRow>
                            <TableCell>S/No</TableCell>
                            <TableCell align="center">Prescription</TableCell>
                            <TableCell align="center">Note/Remark</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {" "}
                                {row.name}{" "}
                              </TableCell>
                              <TableCell align="left">
                                Paracetamol 500mg(tablet)
                                <br />
                                2(3 times daily) 13tablet Start{" "}
                                <span className="text-info">
                                  on 12/21/20202
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                {" "}
                                <Badge href="#" color="light">
                                  Dispense 13 tablets
                                </Badge>
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="View Detail">
                                  <IconButton aria-label="View Detail">
                                    <MdViewList size="25" onClick={toggle2} />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Col>
              </Row>
              <Form>
                <Row form>
                  <Col md={4} style={{ marginTop: "33px" }}></Col>
                  <Col md={4}></Col>
                  <Col md={2} style={{ marginTop: "33px" }}>
                    <MatButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<MdSave />}
                    >
                      Save
                    </MatButton>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* // The modal to view prescription detail */}
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
              Dosa
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
              <p style={textstyle}>Nile</p>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Page>
  );
}
