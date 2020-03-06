import React from 'react';
import {
    Col,
    FormGroup,
    Input,
    Label,
    Row,
  } from 'reactstrap';

//Date Picker
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
//Dtate Picker package
Moment.locale('en');
momentLocalizer();

export default function MaterialUIPickers(visitstart, visittime, saveCheckedin) {
    // The first commit of Material-UI


    return (
        
        <Row form>
        <Col md={4}>

            <FormGroup>
                <Label for="qualification">Visit Type</Label>
                <Input type="select" name="educationId" >
                    <option value="1">Booked</option>
                    <option value="2">Unbooked</option>

                </Input>
            </FormGroup>

        </Col>
        
        <Col md={4}>
        <FormGroup>
            <Label for="middleName">Date Of Registration</Label>
            
            <DateTimePicker time={false} name="dateRegistration"  id="dateRegistration"   />
        </FormGroup>
        </Col>
        
    </Row>
    );
}