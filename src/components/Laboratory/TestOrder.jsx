import Page from 'components/Page';
import React from 'react';
import { useState, useEffect } from 'react';
import {
    Card,
    Col,
    Row,
    Alert,
    CardBody,
} from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TiWarningOutline } from "react-icons/ti";
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {url} from 'api/index';
import PatientList from 'components/Laboratory/PatientSearch';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
})
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 11
  }
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

export default function TestOrderMain (props) {
  const classes = useStyles()
  const [data, setData] = useState([])
  const apistate = url + 'encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM/'
  
  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apistate)
      setData(result.data)
      console.log(result.data)
    }
    GetData()
  }, [])

    return (
        <Page title="Test Order" >
            <Row>
                <Col xl={12} lg={12} md={12}>
                    <Alert color="primary">
                        <TiWarningOutline
                            size="30"
                            className=" text-dark"/>  { '  '}
                        Note : Only  Patients With test order can be search here
                    </Alert>
                </Col>
            </Row>
            <Row>
            <Col xl={12} lg={12} md={12}>
<Card>
    <CardBody>
    <PatientList />
    </CardBody>
</Card>
</Col>
            </Row>
          
        </Page>
    );
        }