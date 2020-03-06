import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  Form,
  Alert
} from 'reactstrap';
import { 
    Card,
    CardContent,   
}
from '@material-ui/core';
import { FaUserPlus } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
  import { makeStyles } from '@material-ui/core/styles';
  import SearchInput from 'components/SearchBox/SearchInput';
  import Title from 'components/Title/CardTitle';
  import DataTableList from 'components/patient/PatientList'
  import PatientList from 'components/patient/PatientSearch'

  const useStyles = makeStyles(theme => ({
    card: {
      margin: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
    },
    
  }));

const PatientPage = () => {
    const classes = useStyles();
  return (
    <Page title="Patients" >
        <Alert color="primary">
            <TiWarningOutline 
                size="30"
                className=" text-dark"/>  { '  '} 
                Note : All Available Patients in the system can be search here
            </Alert>
        <Card className={classes.cardBottom}>  
            <CardContent>
                <Title>
                <Link to="/patient-registration">
                    <Button
                        variant="contained"
                        color="primary" className=" float-right mr-1"
                        startIcon={<FaUserPlus />}>
                        Add Patient
                    </Button>
                </Link>
                    <br />
                </Title>
                <br/>
                {/* Search Form Input Field */}
    
                <PatientList />
            </CardContent>
        </Card>
</Page>
  );
};

export default PatientPage;
