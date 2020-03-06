import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';  
// import {
//     MdCheckCircle,
// } from 'react-icons/md';
import {
    IoMdEye
} from 'react-icons/io';
import {
    MdAddBox
} from 'react-icons/md';
import {
    FaUserCheck
} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { Modal, ModalBody,  ModalHeader} from 'reactstrap';
import AddVitalsPage from 'components/Vitals/AddVitalsPage';
import AssignClinician from 'components/Vitals/AssignClinician';
import {url} from 'axios/url';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.

    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height:45,
        width: 350,
    },

    input: {
        display: 'none',
    },
    
});

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 11,
    },
  }))(TableCell);
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);




export default function VitalsSigns(props) {
    const classes = useStyles();

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);
    //Get list of Visit/checkin patients API 
    const [data, setData] = useState([]); 
    const apipatient = url+"visits/datevisit";
    useEffect(() => {    
            const GetData = async () => {    
            const result = await axios(apipatient);    
            setData(result.data);    
            }  
            GetData();     

    }, []); 
    //get the user that need to be checked in 
    const [patientrow, setpatientValue] = useState({checkInId:'', patientId:''});

    const getUsermodal = (patientrow)=> {
    // setuservalue(user);
    setModal(!modal);

    }
    const getUsermodal2 = (patientrow)=> {
        // setuservalue(user);
        setModal2(!modal2);
    
        }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Hosiptal Num</StyledTableCell>
                        <StyledTableCell align="center">Patient Name</StyledTableCell>
                        <StyledTableCell align="center">Vital Signs</StyledTableCell>
                        <StyledTableCell align="center">Clinician</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <StyledTableRow key={row.checkInId}>
                            <TableCell component="th" scope="row">
                            {row.hospitalNumber}
                            </TableCell>
                            <TableCell align="center">{row.firstName} {' '} {row.lastName}</TableCell>
                            <TableCell align="center">
                                {/* <Tooltip title="View Patient">
                                    <Link to="/view-vitals">
                                        <IconButton aria-label="Collect Sample">
                                            <MdCheckCircle size={20}/>
                                        </IconButton>
                                    </Link>
                                    
                                </Tooltip> */}
                                ---
                            </TableCell>
                            <TableCell align="center">
                                {/* <Tooltip title="View Patient">
                                    <Link to="/patient-registration">
                                    <IconButton aria-label="Collect Sample">
                                        <MdCheckCircle size={20}/>
                                    </IconButton>
                                    </Link>
                                
                            </Tooltip> */}
                            ---
                            </TableCell>
                            <TableCell align="center">
                                {/* <Tooltip title="View Patient Vitals">
                                    <Link to="/view-vitals">
                                        <IconButton aria-label="Collect Sample">
                                            <IoMdEye size={20}/>
                                        </IconButton>
                                    </Link>
                                </Tooltip> */}
                                <Tooltip title="Add Vitals">
                                        <IconButton aria-label="Collect Sample">
                                            <MdAddBox size={20} 
                                            onClick={() => {
                                                getUsermodal(setpatientValue(row));

                                                }} 
                                            />
                                        </IconButton>
                                </Tooltip>
                                <Tooltip title="Assign Clinician">
                                        <IconButton aria-label="Collect Sample">
                                            <FaUserCheck size={20} 
                                                onClick={() => {
                                                    getUsermodal2(setpatientValue(row));

                                                }}/>
                                        </IconButton>
                                </Tooltip>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                    <Modal isOpen={modal} toggle={toggle} size='lg'>
                        <ModalHeader toggle={toggle}>Add New Vitals</ModalHeader>
                        <ModalBody>
                           <AddVitalsPage patient={patientrow}/>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2} >
                        <ModalHeader toggle={toggle2}>Assign Clinician</ModalHeader>
                        <ModalBody>
                                <AssignClinician patientdetail={patientrow}/>
                        </ModalBody>
                        
                    </Modal>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
