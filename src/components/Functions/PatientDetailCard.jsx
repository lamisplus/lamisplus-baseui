import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import   { Age } from 'components/Functions/GetAge';

const useStyles = makeStyles(theme => ({
    root2: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      margin:theme.spacing(7),
      bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 12,
            
        },
        pos: {
          fontSize: 11,
        },
      cardContent:{
          padding: 2,
      },
      cardroot:{
          margin:theme.spacing(1),
          height: 250 + 'px !important' ,
      }
      
      },
      alertmsge:{
          marginTop: theme.spacing(2),
      },
      rootaccordia: {
          width: '100%',
      },
      accordiaheading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
      },
      allergiesroot: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > *': {
          margin: theme.spacing(0.5),
          },
      },
      chiproot: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: theme.spacing(0.5),
      },
      chip: {
          margin: theme.spacing(0.5),
      },
      checkboxroot: {
          display: 'flex',
      },
      formControl: {
          margin: theme.spacing(3),
      },
      
      root: {
          '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
          },
          
      },
  
      formroot: {
          '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
          },
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
      inforoot: {
          width: '95%',
          margin: 20,
          backgroundColor: '#eee',
      },
      }));



export default function PatientDetailCard (props){
 const classes = useStyles();
 const {getpatient} =props.getpatientdetails ;
 // console.log(props.getpatientdetails)
const currentAge = getpatient.row.dob;
const Year = Age(currentAge);
return (
        <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                >
                <div className={classes.column}>
                    <Typography className={classes.heading}> 
                        
                        Name: {getpatient.row.firstName} {''} {getpatient.row.lastName}
                        <br/>
                        Gender : {getpatient.row.genderId ===1 ? 'Female' : 'Male'}
                    </Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}> 
                        Birthday : {getpatient.row.dob} ({Year} years)
                        <br/>
                        phone Number : +234567890
                    </Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>
                        Email Address : Mathew Adegbite
                        
                    </Typography>
                </div>
                </ExpansionPanelSummary>
               
            </ExpansionPanel>
)

}