import React, {useState, useEffect} from 'react';
import {  Modal, ModalHeader, ModalBody,
Form,
Row,Alert,
Col,Input,
FormGroup,
Label,Card, CardBody
} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {url} from '../../../api'
import { Spinner } from 'reactstrap';
import { createCollectedSample, fetchFormById } from '../../../actions/laboratory';

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

const ModalSample = (props) => {
  const classes = useStyles()
  const datasample = props.datasample ? props.datasample : {};
  const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
  const description = datasample.data ? datasample.data.description : null ;
  console.log(lab_test_group)
  const labId = datasample.id
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const [samples, setSamples] = useState({}) 

  const [optionsample, setOptionsample] = useState([]);
  //This is to get SAMPLE TYPE from application Codeset
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
      setSamples ({ ...samples, [e.target.name]: e.target.value });
      console.log(samples)
    }
    const saveSample = e => {
      e.preventDefault()
      setLoading(true);
      toast.warn("Processing Sample ", { autoClose: 100, hideProgressBar:false });
      const newDatenow = moment(samples.date_sample_collected).format("DD-MM-YYYY");
      datasample.data.lab_test_order_status = 1;
      datasample.data.date_sample_collected = newDatenow
      datasample.data.comment = samples.comment
      /* processing the sample type to a string   */
      if(samples.sample_type.length>0){
      const arr = [];
      samples.sample_type.forEach(function(value, index, array) {
        arr.push(value['title']);
      });
      const sampletostring= arr.toString()
      datasample.data.sample_type = sampletostring  
      }else{
        datasample.data.sample_type=datasample.data.sample_type
      }
      /* end of the process */
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
  
  function checklanumber (lab_num){
      if(lab_num===""){       
       return (                 
          <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            Please make sure you enter a lab number
          </Alert>
       )
      }
  }
  return (
      
      <div >
       
        <Card >
        <CardBody>
        <ToastContainer autoClose={3000} hideProgressBar />
          <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
            
          <Form onSubmit={saveSample}>
          <ModalHeader toggle={props.togglestatus}>Collect Sample </ModalHeader>
            <ModalBody>
            {checklanumber(props.labnumber['lab_number'])}
            <Card >
            <CardBody>
            <Row >
            <Col md={12} >

            <Alert color="dark" style={{backgroundColor:'#9F9FA5', color:"#000" , fontWeight: 'bolder', fontSize:'14px'}}>
              <p style={{marginTop: '.7rem' }}>Lab Test Group : <span style={{ fontWeight: 'bolder'}}>{lab_test_group }</span> 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lab Test Ordered : &nbsp;&nbsp;
              <span style={{ fontWeight: 'bolder'}}>{description}</span>              
               &nbsp;&nbsp;&nbsp; Lab Number : &nbsp;&nbsp;
              <span style={{ fontWeight: 'bolder'}}>{props.labnumber['lab_number']===""?" ---":props.labnumber['lab_number']}</span>
            
              </p>
              
            </Alert>
      </Col>
        <Col md={6}>
         
          <FormGroup>
            
            <Label for='maritalStatus'>Date Collected</Label>
            
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
          <Label for='maritalStatus'>Sample Type</Label>
              <Autocomplete
                multiple="true"
                id="sample_type"
                size="small"
                options={optionsample}
                getOptionLabel={(option) => option.title}
                onChange={(e, i) =>{ 
                  setSamples({ ...samples, sample_type: i })}}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.title} {...getTagProps({ index })} disabled={index === 0} />
                  ))
                }
                style={{ width: 'auto', marginTop: '-1rem' }}s
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" margin="normal"  />
                )}
                required
              />
            {/* <FixedTags onChange={handleInputChangeSample} value={samples.sample_type} /> */}
         </FormGroup>
        </Col>

        <Col md="12">
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
      {props.labnumber['lab_number']!==""?
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
          :
          <MatButton
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<SaveIcon />}
            disabled='true'
          >   
            Save
          </MatButton>
          }
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
     </CardBody>
     </Card>
    </div>
  );
}

export default connect(null, { createCollectedSample, fetchFormById })(ModalSample);
