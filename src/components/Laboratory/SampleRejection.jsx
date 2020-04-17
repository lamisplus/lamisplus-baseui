import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
Form,
Row,
Col,
FormGroup,
Label,
Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { createCollectedSample } from '../../actions/laboratory';




Moment.locale('en');
momentLocalizer();

const ModalSampleResult = (props) => {

        const lab_id = props.datasample
        console.log(lab_id)
        const [samples, setSamples] = useState({
                                      lab_test_id:"",
                                      date_sample_collected: "",
                                      lab_test_order_status: ""
                                    })
 
       const handleInputChangeSample = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setSamples({
            ...samples,
            ...fieldValue
        })

    }
    const saveSample = e => {
      setSamples({
        ...samples,
        lab_test_id: lab_id,
        date_sample_collected: ""
      })
      //console.log(samples)
      toast.warn("Processing Sample ", { autoClose: 1000, hideProgressBar:false });
      e.preventDefault()
      props.createCollectedSample(samples, lab_id)
      //setInterval(window.location.reload(false), 10000);
      //console.log(samples)
    }
    const textstyle = {
        fontSize: '14px',
        fontWeight: 'bolder'
      };

  return (
      
      <div >
       <ToastContainer autoClose={2000} hideProgressBar />
      <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className}>
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={props.togglestatus}>Reject Sample </ModalHeader>
        <ModalBody>
            <Row style={{ marginTop: '20px'}}>
                <Col xs="4">
                    Test 
                    <br/>
                    <p style={textstyle}>Haemoglobin </p>

                
                </Col>
                <Col xs="4">
                    Sample Test
                    <br/>
                    <p style={textstyle}>Blood</p>
                    
                    </Col>
                <Col xs="4">
                    Date Of Result
                    <br/>
                    <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                    defaultValue={new Date()} max={new Date()}
                    />            
                    </Col>
                
            </Row >
                <br/>
                <Form>
                <Row form>
                    <Col md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Reason For Rejection</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Not well collected</option>
                            <option>Mistake on the sample</option>
                            <option>Not needed</option>
                            
                            </Input>
                    </FormGroup>
                    </Col>
                    <Col md={12}>
                    <FormGroup>
                        <Label for="examplePassword">Note</Label>
                        <Input type="text" name="result-received" id="result" placeholder="Result Recieved" />
                    </FormGroup>
                    </Col>
                    
                </Row>       
                </Form>
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

export default connect(null, { createCollectedSample })(ModalSampleResult);
