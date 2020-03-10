import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Form,
} from 'reactstrap';
import {
    Card,
    CardContent,
    Typography,
}
    from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import SearchInput from 'components/SearchBox/SearchInput';
import Title from 'components/Title/CardTitle';
import ViewStatusSearch from 'components/ClientStatusUpdate/ViewStatusSearch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


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
    const classes2 = useStyles();
    return (
        <Page title="Client Status Update" >
            <div className={classes2.inforoot} >
                <ExpansionPanel defaultExpanded style={{ backgroundColor: '#F5F5F5'}}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header">
                        <div className={classes2.column}>
                            <Typography className={classes.heading}>
                                Name: Dorcas Essien
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
                                Email Address : essiendorcas530@gmail.com
                            </Typography>
                        </div>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
            <br />
            <Card className={classes.cardBottom}>
                <CardContent>
                    <Title>
                        <Link to="/new-status">
                            <Button
                                variant="contained"
                                color="primary" className=" float-right mr-1">
                                New Client Status Update
                            </Button>
                        </Link>
                        <br />
                    </Title>
                    <br/>
                    {/* Search Form Input Field */}
                    <Form>
                        <SearchInput />
                    </Form>
                    <br/>
                    <ViewStatusSearch />
                </CardContent>
            </Card>
        </Page>
    );
};

export default PatientPage;
