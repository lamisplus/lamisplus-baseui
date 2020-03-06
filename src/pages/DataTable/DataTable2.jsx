import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel='Modal 1',
    buttonLabel2='Modal 2',
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <br/>
      <Button color="danger" onClick={toggle2}>{buttonLabel2}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2} className={className}>
        <ModalHeader toggle={toggle2}>Modal title 3</ModalHeader>
        <ModalBody>
          Second ModalLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle2}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
    </div>
 

  );
}

export default ModalExample;