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
  const [newdata, setNewdata] = useState({formdata});
  const [loading, setLoading] = useState(false)
/* Fetch from from the store after clicking the collect sample when the modal triger it will fetch from the store */
  const formdata = useSelector(state => state.laboratory.formdata);
  const dispatch = useDispatch();
  const lab_id = props.datasample.id
  console.log(props.datasample)
  const labId = lab_id;

  useEffect(() => {
    dispatch(fetchFormById(labId));
    setNewdata({...newdata, formdata}) 
  }, [labId]);
        console.log(formdata.data) 
        const comment =  formdata.data ? formdata.data.comment : null
        const description = formdata.data ? formdata.data.description : null
        const patient_id = formdata.data ? formdata.data.patient_id : null
        const user_id = formdata.data ? formdata.data.user_id : null
        const lab_test_id = formdata.data ? formdata.data.lab_test_id : null
        const sample_type = formdata.data ? formdata.data.sample_type : null
        const test_result = formdata.data ? formdata.data.test_result : null
        const lab_test_group = formdata.data ? formdata.data.lab_test_group : null
        const unit_measurement = formdata.data ? formdata.data.unit_measurement : null
        const lab_test_group_id = formdata.data ? formdata.data.lab_test_group_id : null
        const lab_test_order_id = formdata.data ? formdata.data.lab_test_order_id : null
        const date_result_reported = formdata.data ? formdata.data.date_result_reported : null
        const date_sample_collected = formdata.data ? formdata.data.date_sample_collected : null
        const lab_test_order_status = formdata.data ? formdata.data.lab_test_order_status : null
        const encounterId = formdata.encounterId ? formdata.encounterId : null
        const [samplesType, setSamplesType] = useState(0)
        const [data, setData] = useState({data:{}, encounterId:""})
        const [samples, setSamples] = useState({                                                                         
                                          user_id: user_id,
                                          patient_id: patient_id,
                                          description: description,
                                          lab_test_id: lab_test_id,
                                          sample_type: sample_type,
                                          test_result:test_result,
                                          lab_test_group: lab_test_group,
                                          unit_measurement:unit_measurement,
                                          lab_test_group_id:lab_test_group_id,
                                          lab_test_order_id: lab_test_order_id,
                                          date_result_reported: date_result_reported,
                                          date_sample_collected: date_sample_collected,
                                          lab_test_order_status: lab_test_order_status,
                                          date_result_reported:new Date()
                                    })
 
          
        const [optionsample, setOptionsample] = useState([]);
        useEffect(() => {
            async function getCharacters() {
              try {
                const response = await fetch(url+'application-codesets/codesetGroup?codesetGroup=SAMPLE_TYPE');
                const body = await response.json();
                setOptionsample(body.map(({ display, id }) => ({ title: display, value: id })));
              } catch (error) {
                console.log(error);
              }
            }
            getCharacters();
          }, []);
       const handleInputChangeSample = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setSamples({
            ...samples,
            ...fieldValue
        })

    }

  //   const handleInputSampleType = e => {
  //     const fieldValue = e.target.value      
  //     setSamplesType(fieldValue)
  //     console.log(fieldValue)
  //     console.log(samplesType)
  // }
    const saveSample = e => {
      setLoading(true);
      console.log(data)
      toast.warn("Processing Sample ", { autoClose: 100, hideProgressBar:false });
      const newDatenow = moment(samples.date_sample_collected).format("DD-MM-YYYY");
      samples['lab_test_order_status'] = 5;
      samples['date_sample_collected'] = date_sample_collected;
      samples['user_id'] = user_id
      samples['description'] = description
      samples['patient_id'] =patient_id
      samples['description'] = description
      samples['lab_test_id'] = lab_test_id
      samples['lab_test_group'] = lab_test_group
      samples['unit_measurement'] = unit_measurement
      samples['lab_test_group_id'] = lab_test_group_id
      samples['lab_test_order_id'] = lab_test_order_id
      samples['date_sample_collected']= date_sample_collected
      samples['sample_type']= sample_type
      samples['date_result_reported']= newDatenow
      data['data'] = samples;
      data['encounterId'] = encounterId;
      console.log(data)
      e.preventDefault()
      const onSuccess = () => {
        setLoading(false);        
      }
      const onError = () => {
        setLoading(false);        
      }
      props.createCollectedSample(data, lab_id,onSuccess,onError)
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
                            name='comment'
                            id='comment'
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
