import React, {useState} from 'react';
import { Modal, ModalHeader, ModalBody,
Row,
Col,
FormGroup,
Label,Input,Card,CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
// import "../../Patient/node_modules/react-toastify/dist/ReactToastify.css";
// import "../../Patient/node_modules/react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import {url} from '../../../api'
import { useSelector, useDispatch } from 'react-redux';
import { createCollectedSample, fetchFormById } from '../../../actions/laboratory'
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    } 
}))
Moment.locale('en');
momentLocalizer();


const ModalViewResult = (props) => {
    const classes = useStyles()
    const datasample = props.datasample ? props.datasample : {};
    const lab_test_group = datasample.data ? datasample.data.lab_test_group : null ;
    const description = datasample.data ? datasample.data.description : null ;
    const unit_measurement = datasample.data ? datasample.data.unit_measurement : null ;
    const date_result_reported = datasample.data ? datasample.data.date_result_reported : null ;
    const test_result = datasample.data ? datasample.data.test_result : null ;
    console.log(datasample)  
    const [samples, setSamples] = useState({}) 

    const handleInputChangeSample = e => {
        setSamples ({ ...samples, [e.target.name]: e.target.value });
        console.log(samples)
    }

    const textstyle = {
        fontSize: '14px',
        fontWeight: 'bolder'
    };
      
  return (      
      <div >
          <ToastContainer autoClose={2000} hideProgressBar />
              <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
                  <ModalHeader toggle={props.togglestatus}>Lab test order detail</ModalHeader>
                      <ModalBody>
                          <Card>
                            <CardBody>
                                <Row style={{ marginTop: '20px'}}>
                                    <Col xs="6">
                                        <span style={{ fontWeight: 'bold'}}>Lab Test Group</span> : {lab_test_group}
                                        <br/>
                                    </Col>
                                    <br/>
                                    <Col xs="6">
                                        <span style={{ fontWeight: 'bold'}}>Lab Test Ordered</span> : {description} 
                                            &nbsp;&nbsp;&nbsp;Unit: {unit_measurement} 
                                        <br/>
                                                      
                                    </Col>
                                    <br/>
                                    <Col xs="6">
                                        <span style={{ fontWeight: 'bold'}}>Date Assayed </span>: {date_result_reported}
                                        <br/>
                                    </Col>
                                    <br/>
                                    <Col xs="6">
                                        <span style={{ fontWeight: 'bold'}}>Date Reported </span>: {date_result_reported}
                                        <br/>    
                                    </Col>
                                    <br/>
                                    <Col xs="4">
                                        <FormGroup>
                                          <br/>
                                            <Label for="examplePassword"><span style={{ fontWeight: 'bold'}}> Result </span>: {test_result} </Label>
                                      
                                        </FormGroup>
                                    </Col>
                    
                                </Row>
                            <br/>
              
                          <MatButton
                              variant='contained'
                              color='default'
                              onClick={props.togglestatus}
                              className={classes.button}
                              startIcon={<CancelIcon />}
                          >
                              Cancel
                          </MatButton>
                      </CardBody>
                </Card>
          </ModalBody>
      </Modal>
    </div>
  );
}

export default connect(null, { createCollectedSample })(ModalViewResult);
