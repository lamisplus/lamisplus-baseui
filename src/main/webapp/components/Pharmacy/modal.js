import React, {useState, useEffect} from 'react';
import {  Modal, ModalHeader, ModalBody,
Form,
Row,
Col,Input,
FormGroup,
Label,Card, CardBody
} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import moment from "moment";
import { Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'reactstrap';

Moment.locale('en');
momentLocalizer();
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

const ModalSample = (props) => {
  const classes = useStyles()
  const [newdata, setNewdata] = useState({formdata});
  const [loading, setLoading] = useState(false)
/* Fetch from from the store after clicking the collect sample when the modal triger it will fetch from the store */
    console.log(props)
  const formdata = useSelector(state => state.laboratory.formdata);
  const dispatch = useDispatch();


  useEffect(() => {
  

  }, []);

 
          
        const [optionsample, setOptionsample] = useState([]);
        const [samples, setSamples] = useState({})
       const handleInputChangeSample = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setSamples({
            ...samples,
            ...fieldValue
        })

    }
    const saveSample = e => {
      e.preventDefault()
      const onSuccess = () => {
        setLoading(false);
        // props.history.push("/collect-sample")        
      }
      const onError = () => {
        setLoading(false);        
      }

    }
  return (
    <div>
      <Card>
        <CardBody>
          <ToastContainer autoClose={3000} hideProgressBar />
          <Modal
            isOpen={props.modalstatus}
            toggle={props.togglestatus}
            className={props.className}
            size="lg"
          >
            <Form onSubmit={saveSample}>
              <ModalHeader toggle={props.togglestatus}>
                Dispense Drugs
              </ModalHeader>
              <ModalBody>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                        <Alert
                          color="dark"
                          style={{
                            backgroundColor: "#9F9FA5",
                            color: "#000",
                            fontWeight: "bolder",
                          }}
                        >
                          <p style={{ marginTop: ".7rem" }}>
                            Drug Prescribed:{" "}
                            <span style={{ fontWeight: "bolder" }}>
                              Paracetamol
                            </span>
                            &nbsp;&nbsp;&nbsp; Quantity Prescribed :
                            <span style={{ fontWeight: "bolder" }}>{20}</span>
                            &nbsp;&nbsp;&nbsp; Stock Balance :
                            <span style={{ fontWeight: "bolder" }}>{500}</span>
                          </p>
                        </Alert>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="maritalStatus">Date Collected</Label>

                          <DateTimePicker
                            time={false}
                            name="date_sample_collected"
                            id="date_sample_collected"
                            value={samples.date_sample_collected}
                            onChange={(value1) =>
                              setSamples({
                                ...samples,
                                date_sample_collected: value1,
                              })
                            }
                            defaultValue={new Date()}
                            max={new Date()}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="maritalStatus">Sample Type</Label>
                          <Autocomplete
                            multiple
                            id="sample_type"
                            size="small"
                            options={optionsample}
                            getOptionLabel={(option) => option.title}
                            onChange={(e, i) =>
                              setSamples({ ...samples, sample_type: i })
                            }
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  label={option.title}
                                  {...getTagProps({ index })}
                                  disabled={index === 0}
                                />
                              ))
                            }
                            style={{ width: "auto", marginTop: "-1rem" }}
                            s
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                margin="normal"
                              />
                            )}
                          />
                          {/* <FixedTags onChange={handleInputChangeSample} value={samples.sample_type} /> */}
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <Label for="maritalStatus">Note</Label>
                          <Input
                            type="textarea"
                            name="comment"
                            id="comment"
                            onChange={handleInputChangeSample}
                            value={samples.comment}
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                    {loading ? <Spinner /> : ""}
                    <br />
                    <MatButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      disabled={loading}
                    >
                      Ok
                    </MatButton>

                    <MatButton
                      variant="contained"
                      color="default"
                      onClick={props.togglestatus}
                      className={classes.button}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </MatButton>
                  </CardBody>
                </Card>
              </ModalBody>
            </Form>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default ModalSample;
