import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PatientAlert(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
            <Card className={classes.cardroot} style={props.height}>
                        <CardContent>
                            <Typography className={classes.title} color="warning" gutterBottom>
                              Alerts 
                            </Typography>
                                <Grid container spacing={12}>
                                    <Grid item xs='12'>
                                        <Typography className={classes.pos} color="textSecondary" >
                                        <div >
                                        <Alert severity="error" style={{ marginTop: 2}}>This Patient is due for viral load assement!</Alert>
                                        <Alert severity="warning" style={{ marginTop: 2}}>Patient of differentiated care</Alert>
                                        <Alert severity="info" style={{ marginTop: 2}}>This is an info alert — check it out!</Alert>
                                        
                                    </div>
                                    <br/>
                                    <CheckBoxOutlineBlankIcon style={{ color: '#FE7235' }}/>   
                                    <CheckBoxOutlineBlankIcon style={{ color: '#FE7235' }}/> 
                                    <CheckBoxOutlineBlankIcon style={{ color: '#FE7235' }}/> 
                                        </Typography>
                                    </Grid>
                                          
                        </Grid>                               
                </CardContent>                      
            </Card>              
    </div>
  );
}