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
import { createCollectedSample } from '../../actions/laboratory';
import { url } from "../../api";

const ModalSample = (props) => {
  
  const {
          className,
          modalstatus,
          togglestatus,
          datasample
        } = props;
        const lab_id = datasample
        console.log(lab_id);
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
  return (
      
      <div >
       <ToastContainer autoClose={3000} hideProgressBar />
      <Modal isOpen={modalstatus} toggle={togglestatus} className={className}>
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={togglestatus}>Verify Sample</ModalHeader>
        <ModalBody>
        <Row >
        <Col md={12}>
            <p>Are you Sure the sample is valid </p>
          
          <FormGroup>
            
            <Label for='maritalStatus'>Sample Collected</Label>
            <Input
              type='select'
              name='labtest_order_status'
              id='labtest_order_status'
              onChange={handleInputChangeSample}
              value={samples.lab_test_id}                                     
            >
              <option value=''>Please Slect </option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>                       
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

export default connect(null, { createCollectedSample })(ModalSample);
