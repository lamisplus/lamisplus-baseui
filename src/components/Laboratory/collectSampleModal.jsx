import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input
  } from 'reactstrap';
  import { connect } from 'react-redux';
  import { createCollectedSample } from '../../actions/laboratory';
  import FixedTags from './autocomplete';



const ModalSample = (props) => {

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
    const saveSample = e => {
      //setsamples({...samples, comment:samples.comment})
      setsamples({...samples, labtest_order_status:0})
      console.log(samples)
      // toast.warn("Processing Sample ");
      e.preventDefault()
      //props.createCollectedSample(samples)
      //console.log(samples)
    }
  return (
      
      <div >
       
      <Modal isOpen={modalstatus} toggle={togglestatus} className={className}>
        
      <Form onSubmit={saveSample}>
        <ModalHeader toggle={togglestatus}>Collect Sample</ModalHeader>
        <ModalBody>
        <Row >
        <Col md={12}>
          <p>Sample Type {datasample} ? </p>
          
          <FormGroup>
            <Label for='maritalStatus'>Sample Collected</Label>
            <Input
              type='select'
              name='labtest_order_status'
              id='labtest_order_status'
              onChange={handleInputChangeSample}
              value={samples.labtest_order_status} 
              required                       
            >
              <option value=''>Please Slect </option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>                       
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='lastName'>Note  </Label>
            {/* <Input
              type='text'
              name='comment'
              id='comment'
              placeholder='Sample Collection Comment'
              value={samples.comment}
              onChange={handleInputChangeSample}
              // onChange={value1 =>
              //   setsamples({ ...values, comment: value1 })
              // }                        
              required
            /> */}
            <FixedTags/>
         </FormGroup>
        </Col>
    </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={togglestatus}>Save Sample</Button>{' '}
          <Button color="secondary" onClick={togglestatus}>Cancel</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default connect(null, { createCollectedSample })(ModalSample);

const top100Films = [
  { title: 'Urine', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 }
];