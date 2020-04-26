import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter ,
Form,
Row,
Col,
FormGroup,
Label,
Input, Card,CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {url} from '../../../api'
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createCollectedSample, fetchFormById } from '../../../actions/laboratory';
import { Spinner } from 'reactstrap';

Moment.locale('en');
momentLocalizer();


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

const ModalSampleTransfer = (props) => {
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
         
          const [data, setData] = useState({data:{}})
          //const [newcomment, setNewcomment] = useState('')
          const [samples, setSamples] = useState({ 
                                            comment: comment,
                                            sample_type:sample_type,                                                                        
                                            user_id: user_id,
                                            patient_id: patient_id,
                                            description: description,
                                            lab_test_id: lab_test_id,
                                           
                                            test_result:test_result,
                                            lab_test_group: lab_test_group,
                                            unit_measurement:unit_measurement,
                                            lab_test_group_id:lab_test_group_id,
                                            lab_test_order_id: lab_test_order_id,
                                            date_result_reported: date_result_reported,
                                            date_sample_collected: new Date(),
                                            lab_test_order_status: lab_test_order_status 
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
      const saveSample = e => {
        setLoading(true);
        console.log(data)
        toast.warn("Processing Sample ", { autoClose: 100, hideProgressBar:false });
        const newDatenow = moment(samples.date_sample_collected).format("DD-MM-YYYY");
        
        samples['lab_test_order_status'] = 2;
        //samples['comment'] = newcomment;
        samples['date_sample_collected'] = newDatenow;
        samples['sample_type'] = sample_type
        samples['user_id'] = user_id
        samples['description'] = description
        samples['patient_id'] =patient_id
        samples['description'] = description
        samples['lab_test_id'] = lab_test_id
        samples['lab_test_group'] = lab_test_group
        samples['unit_measurement'] = unit_measurement
        samples['lab_test_group_id'] = lab_test_group_id
        samples['lab_test_order_id'] = lab_test_order_id
        samples['date_result_reported'] = date_result_reported
        data['data'] = samples;
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
  return (
      
      <div >
    
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Transfer Sample</ModalHeader>
        <ModalBody>
        <Card >
        <CardBody>
        <Row >
        <Col md={12} >

        <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder'}}>
          <p style={{marginTop: '.7rem' }}>Lab Test Group : <span style={{ fontWeight: 'bolder'}}> {' '} {lab_test_group}</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test Ordered : 
          <span style={{ fontWeight: 'bolder'}}>{' '}  {description}</span>
          </p>
          
        </Alert>
        </Col>
        <Col md={6}>
          {/* <p>Sample Type {datasample.data.description}  </p> */}
          <FormGroup>
            
            <Label for='maritalStatus'>Date Transfer</Label>
            
            <DateTimePicker
                        time={false}
                        name="date_sample_collected"
                        id="date_sample_collected"
                        value={samples.date_sample_collected}
                        onChange={value1 =>
                          setSamples({ ...samples, date_sample_collected: value1 })
                        }
                        defaultValue={new Date()}
                        max={new Date()}
                        required
                      /> 
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
            <Label for="exampleSelect">Lab Transfer To</Label>
            <Input type="select" name="lab_test_order_status" id="lab_test_order_status" 
            
            >
              <option value=""></option>
             
            </Input>
          </FormGroup>
          </Col>
          <Col md={8}>
          <FormGroup>
            
            <Label for='maritalStatus'>Note</Label>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              onChange={handleInputChangeSample}
               value = {samples.comment}                                     
            >                        
            </Input>          
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
            Ok
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

export default connect(null, { createCollectedSample, fetchFormById })(ModalSampleTransfer);
