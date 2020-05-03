import React, {useState, useEffect} from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter ,
Form,
Row,
Col,
FormGroup,
Label,Input,Card,CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {url} from '../../../api'
import { useSelector, useDispatch } from 'react-redux';
import { createCollectedSample, fetchFormById } from '../../../actions/laboratory';
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


const ModalSample = (props) => {
  const classes = useStyles()

  const datasample = props.datasample ? props.datasample : {};
  const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
  const description = datasample.data ? datasample.data.description : null ;
  const date_sample_collected = datasample.data ? datasample.data.date_sample_collected : null ;
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
      toast.warn("Processing Sample ", { autoClose: 100, hideProgressBar:false });
      const newDatenow = moment(samples.date_sample_collected).format("DD-MM-YYYY");
      datasample.data.lab_test_order_status = samples.lab_test_order_status;
      datasample.data.date_sample_collected = newDatenow
      datasample.data.comment = samples.comment
      
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
  return (
      
      <div >
       <ToastContainer autoClose={3000} hideProgressBar />
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Sample Verification </ModalHeader>
        <ModalBody>
        <Card >
        <CardBody>
        <Row >
        <Col md={12} >

        <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder', }}>
          <p style={{marginTop: '.7rem' }}>Test Group : <span style={{ fontWeight: 'bolder'}}>{lab_test_group}</span> 
              &nbsp;&nbsp;&nbsp;&nbsp;Test Ordered : 
              <span style={{ fontWeight: 'bolder'}}>{" "}{description}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp; Date Ordered :        
              <span style={{ fontWeight: 'bolder'}}>{" "}{date_sample_collected}</span>
          </p>
          
        </Alert>
      </Col>
      <Col md={6}>
          
          <FormGroup>
            
            <Label for='maritalStatus'>Date Verified</Label>
            
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
            <Label for="exampleSelect">Confirm Sample</Label>
            <Input type="select" name="lab_test_order_status" id="lab_test_order_status" 
            value={samples.lab_test_order_status}
            onChange={handleInputChangeSample}>
              <option value=""></option>
              <option value="3">Sample Valid </option>
              <option value="4">Sample Rejected</option>
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

export default connect(null, { createCollectedSample, fetchFormById })(ModalSample);
