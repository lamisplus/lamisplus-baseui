import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table } from 'reactstrap';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { FiEye } from 'react-icons/fi';
import { MdDetails } from 'react-icons/md';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
  Col,
  Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);
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


export default function Pending(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedG: true,
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
    /* For modal popup */
    const {
      className
    } = props;
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

  return ( 
      <TableContainer component={Paper}>                
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell align="center">Patient Name</TableCell>
              
              <TableCell align="center">Total</TableCell>
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
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">
                  
                    <Tooltip title="View Prescription">
                        <IconButton aria-label="View Prescription">
                        <FiEye size="15" onClick={toggle}/>
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
                        
                        <Table striped>
                        <br/>
                        <br/>
                            <thead>
                              <tr>
                              
                                <th>S/No.</th>
                                <th>Prescription </th>
                                <th>Note/Remarks</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>
                                    <Tooltip title="View Prescription">
                                      <IconButton aria-label="View Prescription">
                                      <MdDetails size="15" onClick={toggle2}/>
                                      </IconButton>
                                  </Tooltip>
                                    {' '}
                                    <FormControlLabel
                                        control={
                                        <GreenCheckbox                                           
                                            onChange={handleChange('checkedG')}
                                            value="checkedG"
                                        />
                                        }
                                        
                                    />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                    
                  </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
              </ModalFooter>
              </Modal>

              <Modal isOpen={modal2} toggle={toggle2} className={className} size='lg'>
              <ModalHeader toggle={toggle2}>View Test Detail</ModalHeader>
              <ModalBody>
                  <Row >
                      <Col xs="12">
                        <br/>
                        <br/>
                        <br/>
                          <p>Precription Details</p>
                      </Col>                    
                  </Row>
              </ModalBody>
              <ModalFooter>
            <Button color="secondary" onClick={toggle2}>Close</Button>
          </ModalFooter>
          </Modal>
      </TableContainer>


     
  );
}