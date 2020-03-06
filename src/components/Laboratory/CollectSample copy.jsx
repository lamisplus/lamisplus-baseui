import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Row,
  FormGroup,
  Button,
  Input
} from 'reactstrap';
import {
  MdRadioButtonChecked,
  MdSearch
} from 'react-icons/md';
import "react-datepicker/dist/react-datepicker.css";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateMaterial from 'components/DateTime/Date'
import Page from 'components/Page';



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
    createData('Haemoglobin', 159, 6.0, 24, 4.0),
    createData('Blood', 237, 9.0, 37, 4.3),
    createData('HIV', 262, 16.0, 24, 6.0),
  ];
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);
  

export default function CollectedSample(){
    const classes = useStyles();
    const classes2 = useStyles2();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedG: true,
      });
      const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };
  return (
    <Page title="Collect Sample">
        <Row >
          <Col>
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
            <Card className="mb-12">
              <CardHeader>Test Order -- 03846657558
              <Link to="/laboratory">
                <Button color="primary" className=" float-right mr-1" >
                        <MdRadioButtonChecked/>Go Back
                </Button>
                </Link>
              </CardHeader>
              <CardBody>
                    <Form>
                        <Row form >
                            <Col md={3} style={{ marginTop: '33px'}}>
                                    <Input
                                        type="search"
                                        placeholder="Lab. Number "
                                        className="cr-search-form__input "
                                    />  
                               
                            </Col>
                            <Col md={3}>
                                <FormGroup>

                                    <DateMaterial />
                                </FormGroup>
                            </Col>
                             <Col md={4} style={{ marginTop: '33px'}}>
                                <Input
                                    type="search"
                                    placeholder="Search by Patient Name, Hospital No. "
                                    className="cr-search-form__input pull-right"
                                />                          
                            </Col>
                            <Col md={2} style={{ marginTop: '33px'}}>
                            <FormGroup>
                            <Button color="primary" className=" float-right mr-1" >
                                    <MdSearch/>  Filter Result
                            </Button>
                            </FormGroup>
                            </Col>
                        </Row>
                     </Form>
                      <br/>
                        <Row>
                          <Col>
                            <Card body>
                              <TableContainer component={Paper}>                
                                    <Table className={classes.table} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Patient ID</TableCell>
                                        <TableCell align="center">Test</TableCell>
                                        <TableCell align="center">Sample Type</TableCell>
                                        <TableCell align="center">Date Requested</TableCell>
                                        <TableCell align="center">Collected</TableCell>
                                        <TableCell align="center">Refer</TableCell>
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
                                            <TableCell align="center">
                                                <FormControlLabel
                                                    control={
                                                    <GreenCheckbox
                                                        checked={state.checkedG}
                                                        onChange={handleChange('checkedG')}
                                                        value="checkedG"
                                                    />
                                                    }
                                                    
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormControlLabel
                                                        control={
                                                        <GreenCheckbox
                                                            
                                                            onChange={handleChange('checkedG')}
                                                            value="checkedG"
                                                        />
                                                        }
                                                        
                                                    />
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
    </Page>
  )
}

