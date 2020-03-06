import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardContent,   
}
from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Title from 'components/Title/CardTitle';
import {   Alert } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DateFnsUtils from '@date-io/date-fns';
import { IoMdFingerPrint } from "react-icons/io";
import { FaFileImport } from "react-icons/fa";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Page from 'components/Page';


const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  }, 
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20
  },
  Select: {
    height:45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  
  
}));


export default function SignUp() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
    };
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Page title="Patient Regsitration" >

        <Alert color="primary">
        All Information with Asterisks(*) are compulsory 
        </Alert>
   
       <form className={classes.form} Validate>

       <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Basic Information
                    <Button
                        variant="contained"
                        color="primary" className=" float-right mr-1"
                        startIcon={<FaFileImport />}>
                        Import image
                    </Button>
                    <Button
                        variant="contained"
                        color="primary" className=" float-right mr-1"  startIcon={<IoMdFingerPrint />}>
                        Finger print
                    </Button>  
                </Title>   
               
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            size="small"
                            helperText="First Name"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="mname"
                            name="middleName"
                            variant="outlined"
                            fullWidth
                            id="middleName"
                            label="Middle Name"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="lname"
                            name="lasttName"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            size="small"
                        />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                    Occupation
                                </InputLabel>
                                <Select
                                native
                                value={state.age}
                                onChange={handleChange('age')}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'occupation',
                                }}
                                className={classes.Select}
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                Hightest Qualification
                                </InputLabel>
                                <Select
                                native
                                value={state.age}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'qualification',                                 
                                }}
                                className={classes.Select}
                                >
                                <option value="" />
                                <option value={10}>PHD</option>
                                <option value={20}>MSC</option>
                                <option value={30}>BSC</option>
                                <option value={30}>OTHERS</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                Marital Status
                                </InputLabel>
                                <Select
                                native
                                value={state.age}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'maritalStatus',
                                  
                                }}
                                className={classes.Select}
                                >
                                <option value="" />
                                <option value={10}>Signled</option>
                                <option value={20}>Married</option>
                                <option value={30}>Divoice</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* For Date of Birth */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={4}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Please Date of Birth"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                style={{marginTop: -5 }}
                                />      
                        </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={4}>                       
                        <FormControlLabel                            
                            control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                value="checkedI"                               
                            />
                            }
                            label="Custom size"
                        />
                        
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4}> <TextField id="outlined-basic" label="Years" variant="outlined" size="small"/></Grid>
                                <Grid item xs={4} sm={4}> <TextField id="outlined-basic" label="Months" variant="outlined" size="small"/></Grid>
                                <Grid item xs={4} sm={4}> <TextField id="outlined-basic" label="Days" variant="outlined" size="small"/></Grid>
                            </Grid>
                            
                       
                        </Grid>
                        {/* End of Date of Birth */}
                    
                </Grid>
                
               
            </CardContent>

       </Card>
       <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Contact Detail</Title>   
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="phone"
                            name="phoneNumber"
                            variant="outlined"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            size="small"
                            helperText="Phone Number"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="altphone"
                            name="altPhoneNumber"
                            variant="outlined"
                            fullWidth
                            id="altPhoneNumber"
                            label="Alternative Phone Number"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="email"
                            name="emaill"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            size="small"
                        />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            size="small"
                        />
                        </Grid>
                     
                </Grid> 
                <br/>  
            <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Address</Title>   
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            country
                        </InputLabel>
                            <Select
                            native
                            value={state.age}
                            onChange={handleChange('age')}
                            labelWidth={labelWidth}
                            inputProps={{
                                name: 'country',
                                id: 'outlined-age-native-simple',
                            }}
                            className={classes.Select}
                            >
                            <option value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                State
                                </InputLabel>
                                <Select
                                native
                                value={state.age}
                                onChange={handleChange('age')}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'state',
                                    id: 'outlined-age-native-simple',
                                }}
                                className={classes.Select}
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                    Province/District/LGA
                                </InputLabel>
                                <Select
                                native
                                value={state.age}
                                onChange={handleChange('age')}
                                labelWidth={labelWidth}
                                inputProps={{
                                    name: 'Province/District/LGA',
                                    id: 'outlined-age-native-simple',
                                }}
                                className={classes.Select}
                                >
                                <option value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="city"
                            name="c"
                            variant="outlined"
                            fullWidth
                            id="firstName"
                            label="City"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="landMark"
                            label="Land Mark"
                            name="landMark"
                            autoComplete="landMark"
                            size="small"
                        />
                        </Grid>
                    
                 
                </Grid>
                
            </CardContent>

            </Card>
        </CardContent>
        
       </Card>
       <Card className={classes.cardBottom}>  
            <CardContent>
                <Title >Relative Information
                <Button
                        variant="contained"
                        color="primary" className=" float-right mr-1"
                >
                        Add Relationship
                    </Button>
                </Title>   
               <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            size="small"
                            helperText="First Name"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="mname"
                            name="middleName"
                            variant="outlined"
                            fullWidth
                            id="middleName"
                            label="Middle Name"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <TextField
                            autoComplete="lname"
                            name="lasttName"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            size="small"
                        />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            size="small"
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            size="small"
                        />
                        </Grid>  
                </Grid>
                <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                    >
                        Cancel
                    </Button>
               
            </CardContent>
       </Card>
       </form>
    
</Page>
  );
}