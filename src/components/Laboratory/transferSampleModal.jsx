import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input
  } from 'reactstrap';

const ModalSampleTransfer = (props) => {
  const {
          className,
          modalstatus,
          togglestatus,
          datasample,
          testorder,
          userInfo,
          useData
        } = props;
        const [samples, setsamples] = useState(testorder)
        //console.log(samples)
        const defaultSample = useData.find(x => x.description === datasample)
        //console.log(defaultSample)
    const handleInputChangeSample = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setsamples({
            ...samples,
            ...fieldValue
        })

    }
    const saveSampleTransfer = e => {
      //setsamples({...samples, comment:samples.comment})
      setsamples({...samples, labtest_order_status:0})
      console.log(samples)
      // toast.warn("Processing Sample ");
      e.preventDefault()
      //props.createCollectedSample(collectsample)
      //console.log(samples)
    }
  return (
    <div>
      
      <Modal isOpen={modalstatus} toggle={togglestatus} className={className}>
      <Form onSubmit={saveSampleTransfer}>
        <ModalHeader toggle={togglestatus}>Transfer Sample</ModalHeader>
        <ModalBody>
        <Row >
        <Col md={12}>
          <p>Sample Type {datasample} ? </p>
         
          <FormGroup>
            <Label for='lastName'>Reason for Transfer  </Label>
            <Input
              type='text'
              name='comment'
              id='comment'
              placeholder='Reason for Transfer'
              value={samples.comment}
              onChange={handleInputChangeSample}
              // onChange={value1 =>
              //   setsamples({ ...values, comment: value1 })
              // }                        
              required
            />
              </FormGroup>
        </Col>
    </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={togglestatus}>Transfer Sample</Button>{' '}
          <Button color="secondary" onClick={togglestatus}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalSampleTransfer;
