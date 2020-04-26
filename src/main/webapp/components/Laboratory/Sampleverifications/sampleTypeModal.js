import React from 'react';
import {  Modal, ModalHeader, ModalBody,
Row,
Col,
Card, CardBody
} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


const ModalSample = (props) => {

const newdata = props.samptypelist;
  return (
      
      <div >
        <Card >
        <CardBody>
                <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className}>
                
                    <ModalHeader toggle={props.togglestatus}>Sample Type</ModalHeader>
                    <ModalBody>
                        <Row >
                            <Col md={12}>
                           
                            <ListGroup horizontal>
                            {newdata.map((values) => (
                                <div key={values.title}>
                                    <ListGroupItem tag="a" href="#">{values.title}</ListGroupItem>
                                    
                                </div>
                            ))}  
                            </ListGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
        </CardBody>
     </Card>
    </div>
  );
}

export default ModalSample;
