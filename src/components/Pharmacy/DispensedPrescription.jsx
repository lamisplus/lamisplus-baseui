import Page from 'components/Page';
import React from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Alert,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { TiWarningOutline } from "react-icons/ti";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FaEye} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import ResultSearch from 'components/Laboratory/SearchForm/ResultSearch';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
    width:200,
  },
  body1: {
    fontWeight: 500,
  },

}));

function createData(name, calories, fat, carbs, protein, newdata) {
  return { name, calories, fat, carbs, protein, newdata };
}

const rows = [
  createData(1,'1598', 'Alex Williams', 3, 6, '22/03/2020'),
  createData(2, '1234', 'Ahmed Musa', 2, 4, '22/03/2020'),
  createData(3, '5555', 'Isaac Johnson',2, 7, '22/03/2020'),
];

const DispensedPrescription = (props) => {
 
    const classes = useStyles();
  return (
    <Page title="Dispensed Prescription" >     
        <Row>        
        <Col xl={12} lg={12} md={12}>
          <Alert color="primary">
                <TiWarningOutline 
                    size="30"
                    className=" text-dark"/>  { '  '} 
                    Note : Only  Patients can be search here
            </Alert>
          </Col>
        </Row>

              <Row>          
                <Col sm="12">
                  <Card body>
                    <Form>
                      <ResultSearch />
                      </Form>          
                        
                      <br/>
                        <TableContainer component={Paper}>                
                            <Table className={classes.table} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                <TableCell>S/No</TableCell>
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
                                    <TableCell component="th" scope="row"> {row.name}</TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>
                                    <TableCell align="center">{row.carbs}</TableCell>
                                    <TableCell align="center">{row.protein}</TableCell>
                                    <TableCell align="center">{row.newdata}</TableCell>
                                    <TableCell align="center">
                                        <Link to="/view-prescription">
                                            <Tooltip title="view prescription">
                                                <IconButton aria-label="Vview prescription">
                                                <FaEye size="15"/>
                                                </IconButton>
                                            </Tooltip>
                                        </Link>
                                        
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>  
                  </Card>
                </Col>
                
              </Row>
       
</Page>

  
  );
};

export default DispensedPrescription;
