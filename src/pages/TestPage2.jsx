import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  
  const [modal, setModal] = useState(false);
   const [user, setuservalue] = useState(null);


  const toggle = (user) => {
        setModal(!modal);
  
  }
  
  const getUsermodal = (user)=> {
    // setuservalue(user);
    setModal(!modal);

  }
 

  return (
    <div>
      <Button color="danger" onClick={() => {
        getUsermodal(setuservalue('mathew'));

      }}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
    n culpa qui officia deserunt mollit anim id est laborum.
          
          <br />
          {user}
          
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
}

export default ModalExample;