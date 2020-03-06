import React ,  { useState } from 'react';
import { Table } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import {
    FaEye
} from 'react-icons/fa';
import {

  Col,
  Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    width:200,
  },
}));
const useStyles2 = makeStyles(theme => ({
  inforoot: {
    width: '100%',
    marging: theme.spacing(5),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1598', 159, 6.0, 24, 4.0),
  createData('1234', 237, 9.0, 37, 4.3),
  createData('5555', 262, 16.0, 24, 6.0),
];


export default function Dispensed(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  /* For modal popup */
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return ( 
      <TableContainer component={Paper}>                
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Lab Number</TableCell>
              <TableCell align="center">Patient ID</TableCell>
              <TableCell align="center">Phone Name</TableCell>
              <TableCell align="center">Prescribed</TableCell>
              <TableCell align="center">Dispensed </TableCell>
              <TableCell align="center">Date Dispensed</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">6</TableCell>
                  <TableCell align="center">12</TableCell>
                  <TableCell align="center">
                    
                        <Tooltip title="View Dispensed Drugs">
                            <IconButton aria-label="View Dispensed Drugs">
                            <FaEye size="15" onClick={toggle}/>
                            </IconButton>
                        </Tooltip>
                  
                    
                </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
          <Modal isOpen={modal} toggle={toggle} className={className} size='lg'>
            <ModalHeader toggle={toggle}>View Test Detail</ModalHeader>
            <ModalBody>
                <Row >
                    <Col xs="12">
                      <div className={classes2.inforoot} >
                          <ExpansionPanel defaultExpanded style={{ backgroundColor: '#F5F5F5'}}>
                              <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1c-content"
                              id="panel1c-header"
                              >
                              <div className={classes2.column}>
                                  <Typography className={classes.heading}>
                                      Name: Mathew Adeoye
                                      <br/>
                                      Gender : Female
                                  </Typography>
                              </div>
                              <div className={classes2.column}>
                                  <Typography className={classes2.secondaryHeading}>
                                      Birthday : June, 14 1990 (20 years)
                                      <br/>
                                      phone Number : +234567890
                                  </Typography>
                              </div>
                              <div className={classes2.column}>
                                  <Typography className={classes2.secondaryHeading}>
                                      Email Address : Mathew Adegbite
                                      
                                  </Typography>
                              </div>
                              </ExpansionPanelSummary>
                            
                          </ExpansionPanel>
                          </div>
                          <br/>
                          <br/>
                          </Col>
                      
                      <Table striped > 
                      <br/>
                      <br/>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>S/No.</th>
                              <th>Prescription Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">3</th>
                              <td>Larry</td>
                              <td>the Bird</td>
                              <td>@twitter</td>
                            </tr>
                          </tbody>
                        </Table>
                  
                </Row>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
            </Modal>
      </TableContainer>

      
     
  );
}