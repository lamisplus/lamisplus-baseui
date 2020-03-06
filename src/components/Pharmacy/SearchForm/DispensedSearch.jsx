import React from 'react';
import { Form, Input } from 'reactstrap';
import {
    Col,
    Row,
    FormGroup,
    Button,
  } from 'reactstrap';
import {
MdSearch
} from 'react-icons/md';
import DateMaterial from 'components/DateTime/Date'

const SearchInput = () => {
  return (
        <Form>
        <Row form >
            <Col md={3} >
                <FormGroup>
                        <DateMaterial />
                </FormGroup>            
            </Col>
            <Col md={3}>
                <FormGroup>
                    <DateMaterial />
                </FormGroup>
            </Col>
            <Col md={4} style={{ marginTop: '33px'}}>
                <Input
                    type="search"
                    placeholder="Search by Patient Name, Hospital No. "
                    className="cr-search-form__input pull-right"
                />                          
            </Col>
            <Col md={2} style={{ marginTop: '33px'}}>
            <FormGroup>
            <Button color="primary" className=" float-right mr-1" >
                    <MdSearch/>  Filter Result
            </Button>
            </FormGroup>
            </Col>
        </Row>
        </Form>

  );
};

export default SearchInput;
