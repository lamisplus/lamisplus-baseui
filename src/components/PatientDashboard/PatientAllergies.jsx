import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Col,
  FormGroup,
  Row,
} from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import CreatableSelect from 'react-select/creatable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
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
}));

export const allergies = [
  { value: 'penicilin', label: 'Penicilin' },
  { value: 'egg', label: 'Egg' },
  { value: 'milk', label: 'Milk' },
  { value: 'peanut', label: 'Peanut'},
];

export default function PatientAlert(props ) {
  const classes = useStyles(props);
  const handleChange = (newValue: any, actionMeta: any) => {
    props.setNewAllergy(newValue.map(it => it.value));
  };
  return (

    <div className={classes.root}>
            <Card className={classes.cardroot} style={props.height}>
                    <CardContent>
                        <Typography className={classes.title} color="primary" gutterBottom>
                            Allergies
                        </Typography>
                            <Grid container spacing={12}>
                                <Grid item xs='12'>
                                    <Typography className={classes.pos} color="textSecondary" >
                                            
                                      <div className={classes.allergiesroot}>
                                    
                                      {props.patientAllergies ? props.patientAllergies.map((allergy, index) => (
                                    <Chip
                                          label={allergy}
                                          color="secondary"
                                          variant="outlined"
                                      />
                                      )) : <Chip
                                      label="No Allergy"
                                      color="secondary"
                                      variant="outlined"
                                  />}
                                      </div>
                                    </Typography>
                                </Grid>      
                            </Grid> 
                            <br></br>
                            {props.addstatus && 
                                        <Row form>
                                            <Col md={12}>
                                            <FormGroup>
                                            <CreatableSelect
        isMulti
        onChange={handleChange}
        options={allergies}
        placeholder="Add New Allergy"
      />
                                        
                                            </FormGroup>
                                            </Col>
                                           
                                        </Row>

                            
                            }                            
                    </CardContent>                      
            </Card>
    </div>
  );
}