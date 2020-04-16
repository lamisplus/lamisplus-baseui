import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
Form,
Row,
Col,
FormGroup,
Label
} from 'reactstrap';
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
import {url} from '../../api'

import { useSelector, useDispatch } from 'react-redux';
import { createCollectedSample, fetchFormById } from '../../actions/laboratory';


Moment.locale('en');
momentLocalizer();


const ModalSample = (props) => {
/* Fetch from from the store after clicking the collect sample when the modal triger it will fetch from the store */
  const formdata = useSelector(state => state.laboratory.formdata);
  const dispatch = useDispatch();
  const lab_id = props.datasample.id
  console.log(lab_id)
  const labId = lab_id;
  useEffect(() => {
    dispatch(fetchFormById(labId));
  }, [labId]);
        console.log(formdata.data)
        const [data, setData] = useState(formdata)
        //setData({...data, data:{datas}})      
        console.log(data)      
        const [samples, setSamples] = useState({                                     
                                      sample_type: "",
                                      date_sample_collected: new Date(),
                                      lab_test_order_status: ""
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
     

      toast.warn("Processing Sample ", { autoClose: 1000, hideProgressBar:false });
      const newDatenow = moment(samples.date_sample_collected).format("DD-MM-YYYY");
      samples['lab_test_order_status'] = 1;
      samples['date_sample_collected'] = newDatenow;
      data['data'] = samples;
      //console.log(data)
      e.preventDefault()
      props.createCollectedSample(data, lab_id)
    }
  return (
      
      <div >
       <ToastContainer autoClose={3000} hideProgressBar />
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className}>
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Collect Sample</ModalHeader>
        <ModalBody>
        <Row >
        <Col md={12}>
          <p>Sample Type  </p>
          
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
          <FormGroup>
            <Label for=''>Sample Type  </Label>
              <Autocomplete
                multiple
                id="sample_type"
                options={optionsample}
                getOptionLabel={(option) => option.title}
                onChange={(e, i) => setSamples({ ...samples, sample_type: i })}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option.title} {...getTagProps({ index })} disabled={index === 0} />
                  ))
                }
                style={{ width: 'auto' }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" margin="normal" label="Sample Type "  />
                )}
                // onChange={(e, value) =>
                //   setSamples({ ...samples, sample_type: value })
                // }
                
                // value={samples.sample_type}
              />
            {/* <FixedTags onChange={handleInputChangeSample} value={samples.sample_type} /> */}
         </FormGroup>
        </Col>
    </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" >Save Sample</Button>{' '}
          <Button color="secondary" onClick={props.togglestatus}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default connect(null, { createCollectedSample, fetchFormById })(ModalSample);
