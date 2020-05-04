import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody,
Form,
Row,
Col,
FormGroup,
Label,Input,Card,CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {url} from '../../../api'
import { useSelector, useDispatch } from 'react-redux';
import { createCollectedSample, fetchFormById } from '../../../actions/laboratory'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  cardBottom: {
    marginBottom: 20
  },
  Select: {
    height: 45,
    width: 350
  },
  button: {
    margin: theme.spacing(1)
  },

  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}))
Moment.locale('en');
momentLocalizer();


const ModalSampleResult = (props) => {
  const classes = useStyles()
  const datasample = props.datasample ? props.datasample : {};
  const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
  const description = datasample.data ? datasample.data.description : null ;
  const unit_measurement = datasample.data ? datasample.data.unit_measurement : null ;
  console.log(lab_test_group)
  const labId = datasample.id
  const [loading, setLoading] = useState(false)
  const [samples, setSamples] = useState({}) 

    const handleInputChangeSample = e => {
      setSamples ({ ...samples, [e.target.name]: e.target.value });
      console.log(samples)
    }
    const saveSample = e => {
      e.preventDefault()
      setLoading(true);
     
      const newDatenow = moment(samples.date_result_reported).format("DD-MM-YYYY");
      datasample.data.date_result_reported = newDatenow
      datasample.data.lab_test_order_status = 5;
      datasample.data.test_result = samples.test_result

      
      const onSuccess = () => {
        setLoading(false);
        props.togglestatus()       
      }
      const onError = () => {
        setLoading(false); 
        props.togglestatus()       
      }
      props.createCollectedSample(datasample, labId,onSuccess,onError)
    }
    //console.log(formdata)
    const textstyle = {
        fontSize: '14px',
        fontWeight: 'bolder'
      };
      
  return (
      
      <div >
       <ToastContainer autoClose={2000} hideProgressBar />
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Result Reporting</ModalHeader>
        <ModalBody>
        <Card>
          <CardBody>
              <Row style={{ marginTop: '20px'}}>
                <Col md={12} >
                    <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder'}}>
                      <p style={{marginTop: '.7rem' }}>Lab Test Group : <span style={{ fontWeight: 'bolder'}}> {' '} {lab_test_group}</span> 
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test Ordered : 
                      <span style={{ fontWeight: 'bolder'}}>{' '}  {description}</span>
                      </p>
                      
                    </Alert>
                  </Col>
                 
                  <Col xs="4">
                    Date Assayed
                    <br/>
                    <DateTimePicker time={false} name="date_asseyed"  id="date_asseyed"  
                      
                      value={samples.date_asseyed}
                      onChange={value1 =>
                        setSamples({ ...samples, date_asseyed: value1 })
                      }
                    /> 
                    </Col>
                    <Col xs="4">
                    Date Of Reported
                    <br/>
                    <DateTimePicker time={false} name="date_result_reported"  id="date_result_reported"  
                      
                      value={samples.date_result_reported}
                      onChange={value1 =>
                        setSamples({ ...samples, date_result_reported: value1 })
                      }
                    />            
                    </Col>
                  
                  <Col xs="4">
                    </Col>
                  
                    
                    <Col xs="4">
                    
                    <FormGroup>
                    <br/>
                          <Label for="examplePassword">Enter Result  </Label>
                          <Input
                            type='text'
                            name='test_result'
                            id='test_result'
                            onChange={handleInputChangeSample}
                            value = {samples.test_result}
                            style={{marginTop: '0rem' }}                                    
                          >
                        </Input>
                      </FormGroup>
                      </Col>
                    <Col xs="4">
                    <br/>
                    <FormGroup>
                     
                      <p style={{marginTop: '2rem' }} >{unit_measurement}</p>   
                      </FormGroup>                 
                    </Col>
             
            </Row>
            <br/>
            {loading ? <Spinner /> : ""}
            <br/>
              <MatButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  Save 
                </MatButton>
                <MatButton
                  variant='contained'
                  color='default'
                  onClick={props.togglestatus}
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </MatButton>
                </CardBody>
                </Card>
          </ModalBody>
        
        </Form>

      </Modal>
    </div>
  );
}

export default connect(null, { createCollectedSample })(ModalSampleResult);
