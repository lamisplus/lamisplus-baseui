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
        <ModalHeader toggle={props.togglestatus}>Enter Sample Result</ModalHeader>
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
                        <Row style={{ marginTop: '20px'}}>
                            <Col xs="4">
                            
                              <FormGroup>
                                    <Label for="exampleEmail">Result</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </FormGroup>
                            </Col>
                            <Col xs="4">
                              Unit
                              <br/>
                              <p style={textstyle}>mm/hl</p>
                              
                              </Col>
                            <Col xs="4">
                              Sample collected
                              <br/>
                              <p style={textstyle}>020/03/03<small className="text-muted">By Evans</small></p>
                              </Col>
                          
                        </Row>
                        <Row style={{ marginTop: '20px'}}>
                            <Col xs="4">
                            
                              <FormGroup>
                                    <Label for="examplePassword">File</Label>
                                    <Input type="file" name="file"  placeholder="file upload" />
                                </FormGroup>
                            
                            </Col>
                            <Col xs="4">
                              Date Asseyed
                              <br/>
                              <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"  
                                defaultValue={new Date()} max={new Date()}
                                /> 
                              
                              </Col>
                            
                          
                        </Row>
                        <Row style={{ marginTop: '20px'}}>
                            <Col xs="12">
                            
                              <FormGroup>
                                    <Label for="examplePassword">Enter Note here</Label>
                                    <Input type="text" name="password"  placeholder="Note" />
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

export default connect(null, { createCollectedSample })(ModalSampleResult);
