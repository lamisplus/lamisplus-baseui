import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  Row,
  Col,
    FormGroup,
    Input,
    Label,
    Alert,
    Card,
    CardBody,
    CardHeader
  } from 'reactstrap';

  import {url} from 'api/index';
  import axios from 'axios'; 
  import { toast } from "react-toastify";
  import Spinner from 'react-bootstrap/Spinner';
  import moment from 'moment';
  import Select from 'react-select';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
      },
      paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
      },
      button: {
        margin: theme.spacing(0.5, 0),
      },
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
      
      }));
   

export default function ConsultationPage(props) {   
   const PatientID = props.patientId;
   const visitId = props.visitId;
   const saveTestUrl = url+"encounters"; 

    const classes = useStyles();

    const [testGroups, setTestGroup] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [showLoading, setShowLoading] = useState(false);  
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    async function fetchTestGroup() {
      console.log('fetching test group');
        try{
      const response = await fetch(url+'labTestGroup');
      const body = await response.json();
      console.log(body);         
     setTestGroup(body.map(({ category, id }) => ({ label: category, value: id })));
      }catch(error){
          console.log(error);
      }
    }
    fetchTestGroup();
  }, []);

  const getTestByTestGroup = (e) => {
    const testGroupId = e.target.value;
    async function fetchTests() {
      setErrorMessage("")
      try{
        const response = await fetch(url+"labTest?labTestGroupId="+testGroupId);
        const testLists = await response.json();
        const total = testLists.length;
        console.log(total);
        if(total){
          setLeft(testLists);
        } else{
          setErrorMessage("Could not fetch test list, please try again later");
        }
       
      }catch(error){
        setErrorMessage("Could not fetch test list, please try again later");
        setLeft([])
      }
      }
      fetchTests();
}
const saveTestOrder = (e) => { 
  e.preventDefault(); 
  if (!right || right.length < 1) {
      setErrorMessage("You must pick a test before you can submit");
      return;
  }
  setShowLoading(true);
  setSuccessMessage('');
  const data = {
          formData :right,
          patientId: PatientID, 
          visitId: visitId,
          formName: 'LABTEST_ORDER_FORM',
          serviceName: 'GENERAL_SERVICE',
          dateEncounter: moment(new Date()).format('DD-MM-YYYY'),
          
  }; 
  axios.post(saveTestUrl, data)
      .then(() => {          
          setShowLoading(false);
          setRight([]);
          setLeft([]);
          setSuccessMessage("Test Order Successfully Saved!");
          toast.success(" Successful!");
      }).catch((error) => {
          console.log(error);
          setErrorMessage("An error occurred, could not save request!");
      setShowLoading(false)
      }
      ); 
  };

  const handleChange = (newValue: any) => {
    setRight(newValue ? newValue : []);    
  };

return (
<form className={classes.form} onSubmit={saveTestOrder} >
    {/* The input search field  */}

            <Card className={classes.cardroot} >
              <CardHeader> Test Order</CardHeader>
                    <CardBody>
                        {successMessage ? 
                        <Alert color="success">
                    {successMessage}
            </Alert> : ""
            }
             {errorMessage ? 
                        <Alert color="danger">
                    {errorMessage}
            </Alert> : ""
            }
                        <br/>
                        <Row>
                        <Col md={5}>
                            <FormGroup>
                                    <Label for="testGroup">Select Test Order</Label>
                                    <Input type="select" name="testGroup" onChange={getTestByTestGroup}>
                                        <option value="">Select Test Group</option>
                                        {testGroups.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                {label}
                                                </option>
                                                ))}
                                    </Input>
                                </FormGroup> 
</Col>
<Col md={5}>
                            <FormGroup>
                                    <Label for="testGroup">Select Test</Label>
                                    <Select
        isMulti={true}
        onChange={handleChange}
        options={left.map(x => ({...x, label:x.description, value:x.id}))}
      />
                                    </FormGroup>
                                    </Col>

                                    <Col md={2}>
<Button class="btn btn-primary mt-4" type="button" onClick={saveTestOrder} >Save Test Order
&nbsp;
                                        { showLoading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : ""}
</Button>
                                      </Col>
                        </Row>
                        {/* <Row>
                            <Grid item>{customList(left)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
                                </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customList(right)}</Grid>
                            </Row>
                            <br/>
                            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                      
                    
            
                                <MatButton  
                                        type="submit" 
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        >
                                        Save &nbsp;
                                        { showLoading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner> : ""}
                                </MatButton> 
                            </Grid>                       */}
                    </CardBody>                      
                </Card>

    <br/>
        </form>    
)
}
