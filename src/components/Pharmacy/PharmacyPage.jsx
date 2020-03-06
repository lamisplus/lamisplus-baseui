import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
    Alert
} from 'reactstrap';
import {
    Card,
    CardContent,
}
    from '@material-ui/core';
import { TiWarningOutline } from "react-icons/ti";
import { makeStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import SearchInput from 'components/SearchBox/SearchInput';
import Title from 'components/Title/CardTitle';
import DataTableList from 'components/DataTable/DataTable';


const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

const PharmacyPage = () => {
    const classes = useStyles();
    return (
        <Page title="Pharmacy" >
            <Alert color="primary">
                <TiWarningOutline
                    size="30"
                    className=" text-dark"/>  { '  '}
                Note : Only checked in Patients can be search here
            </Alert>
            <Card className={classes.cardBottom}>
                <CardContent>
                    <Title >Pending Prescription

                        <Link to="/patient-registration">
                            <Button color="primary" className=" float-right mr-1" >
                                Dispensed Prescription
                            </Button>
                        </Link>
                    </Title>
                    <br/>
                    {/* Search Form Input Field */}
                    <Form>

                        <SearchInput />
                    </Form>
                    <br/>
                    <DataTableList />

                </CardContent>
            </Card>

        </Page>
    );
};

export default PharmacyPage;
