
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "./../../../actions/laboratory";
import "./../laboratory.css";
import {GiFiles} from 'react-icons/gi'; 
import { Badge } from 'reactstrap';
import Button from "@material-ui/core/Button";
import DispatchedModal from './DispatchedModal';


const PatientSearch = (props) => {
  const [loading, setLoading] = useState('')
  const [modal3, setModal3] = useState(false)//modal to View Result
  const togglemodal3 = () => setModal3(!modal3)
  
  const [collectmodal, setcollectmodal] = useState([])//to collect array of datas into the modal and pass it as props
            
useEffect(() => {
    setLoading('true');
  const onSuccess = () => {
     setLoading(false)
  }
  const onError = () => {
      setLoading(false)     
  }
      props.fetchAllLabTestOrderToday(onSuccess, onError);
    }, []); //componentDidMount
   
    const labTestType = [];
    props.testOrder.forEach(function(value, index, array) {
          const getList = value['formDataObj'].find(x => { 
            if(x.data.lab_test_order_status == 2){
              labTestType.push(x.data);
            }})         
     });
    
     function removeData (evt, data){
        alert('You want to delete ' + evt + data)
     }

     function getDispatch (evt, data){
        console.log( data)
        setcollectmodal({...collectmodal, ...data});
        setModal3(!modal3) 
     }
     
         //This is function to check for the status of each collection to display on the tablist below 
    const sampleStatus = e =>{
      console.log(e)
      if(e===1){
          return (<p><Badge  color="light">Sample Collected</Badge></p>)
      }else if(e===2){
          return (<p><Badge  color="light">Sample Transfered</Badge></p>)
      }else if(e==="3"){
          return (<p><Badge  color="light">Sample Verified</Badge></p>)
      }else if(e==="4"){
          return (<p><Badge  color="light">Sample Rejected</Badge></p>)
      }else if(e===5){
          return (<p><Badge  color="light">Result Available</Badge></p>)
      }else{
          return (<p>{" "}</p>)
      }
  }


  return (
    <div>
      <br/>
      
        {/* <Button
          variant="contained"
          color="primary"
          className=" float-left mr-1"
        >
          {<GiFiles />} { " "}
          <span style={{textTransform: 'capitalize'}}>Dispatched  </span>
                          
        </Button> */}

      <Link to="/dispatched-sample">
            <Button
              variant="contained"
              className=" float-right mr-1"
              size="large"
            >
              {<GiFiles />} &nbsp;&nbsp;
              <span style={{textTransform: 'capitalize'}}>Dispatched  </span>
                  &nbsp;&nbsp;
              <span style={{textTransform: 'lowercase'}}>samples </span>              
            </Button>
      </Link>
        <br/>
        <br/>
        <br/>
      <MaterialTable
        title="List of Dispatching Samples  "
        columns={[
          { title: "Lab  Test", field: "LabTest" },
          {
              title: "Sample Type",
              field: "SampleType",
          },
          { title: "Date Sample Collected", field: "dateSampleCollected", type: "date" , filtering: false},                  
          {
              title: "Sample Status ",
              field: "samplestatus",
              filtering: false
          },
          
        ]}
        isLoading={loading}
        data={labTestType.map((row) => ({
            LabTest: row.description,
            SampleType: row.sample_type,
            
            dateSampleCollected: row.date_sample_collected,
            samplestatus: sampleStatus(row.lab_test_order_status),
            }))}
        options={{
            search: false,
            selection: true,
            headerStyle: {
                backgroundColor: "#9F9FA5",
                color: "#000",
                margin: "auto"
            },
         
        }}
        actions={[         
            {
              tooltip: 'Dispatch All Selected Sample',
              icon: 'add',
              onClick: (evt, data) =>
                //alert('You want to dispatch ' + evt + data),
                getDispatch(evt, data)
                
            
            }
        ]}
      />
      <DispatchedModal modalstatus={modal3} togglestatus={togglemodal3} datasample={collectmodal} />

    </div>
    
  );
}



const mapStateToProps = state => {
    return {
        testOrder: state.laboratory.list
    };
  };
  
  const mapActionToProps = {
      fetchAllLabTestOrderToday: fetchAllLabTestOrder
  };
  
export default connect(mapStateToProps, mapActionToProps)(PatientSearch);