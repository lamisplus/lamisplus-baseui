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
import {url} from '../../api'
import { transferSample } from '../../actions/laboratory';
// import FixedTags from './autocomplete';
// import { now } from 'moment';



const ModalSampleTransfer = (props) => {
  
  const {
          className,
          modalstatus,
          togglestatus,
          datasample
        } = props;
        const lab_id = datasample.id
        console.log(lab_id)
        const [samples, setSamples] = useState({
                                      comment: "",
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
        date_sample_collected: "djjdsjd",
        lab_test_order_status: "2"
      })
      samples['lab_test_order_status']=2
      toast.warn("Processing Sample Transfer", { autoClose: 1000, hideProgressBar:false });
      e.preventDefault()
      props.transferSample(samples, lab_id)
      //setInterval(window.location.reload(false), 10000);
      console.log(samples)
    }
  return (
      
      <div >
       <ToastContainer autoClose={3000} hideProgressBar />
      <Modal isOpen={modalstatus} toggle={togglestatus} className={className}>
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={togglestatus}>Transfer Sample</ModalHeader>
        <ModalBody>
        <Row >
        <Col md={12}>
          {/* <p>Sample Type {datasample.data.description}  </p> */}
          
          <FormGroup>
            
            <Label for='maritalStatus'>Note</Label>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              onChange={handleInputChangeSample}
              value={samples.comment} 
                                     
            >
                                     
            </Input>
          
          </FormGroup>
          
        </Col>
    </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" >Save Sample</Button>{' '}
          <Button color="secondary" onClick={togglestatus}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default connect(null, { transferSample })(ModalSampleTransfer);
