
import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { fetchAllLabTestOrder } from "./../../../actions/laboratory";
import "./../laboratory.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Badge } from 'reactstrap';
import Button from "@material-ui/core/Button";


const PatientSearch = (props) => {
  const [loading, setLoading] = useState('')
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
    // function totalSampleConllected (test){
    //   const  maxVal = []
     
    //   for(var i=0; i<test.length; i++){
    //     for (var key in test[i]) {
    //       if (test[i][key].lab_test_order_status >=1)
    //         maxVal.push(test[i][key])
    //     }
       
    //   }
    //   return maxVal.length;
    // }
    const labTestType = [];

    props.testOrder.forEach(function(value, index, array) {
          const getList = value['formDataObj'].find(x => { 
            if(x.data.lab_test_order_status == 2){
              labTestType.push(x.data);
            }})
          
     });
     console.log(labTestType) 
     
     function removeData (evt, data){
      alert('You want to delete ' + evt + data)
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
      <Link to="/patient-registration">
            <Button
              variant="contained"
              color="primary"
              className=" float-right mr-1"
              
            >
              <span style={{textTransform: 'capitalize'}}>Dispatched  </span>
              &nbsp;&nbsp;
              <span style={{textTransform: 'lowercase'}}>samples list </span>
              
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
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        isLoading={loading}
        data={labTestType.map((row) => ({
          LabTest: row.description,
          SampleType: row.sample_type,
          
          dateSampleCollected: row.date_sample_collected,
          samplestatus: sampleStatus(row.lab_test_order_status),
          actions: <Link to ={{ 
                          pathname: "/collect-sample",  
                          state: row
                          
                        }} 
                        style={{ cursor: "pointer", color: "blue", 
                        fontStyle: "bold" }}>
                          {/* <Tooltip title="Collect Sample">
                            <IconButton aria-label="Collect Sample" >
                              <VisibilityIcon color="primary"/>
                            </IconButton>
                          </Tooltip> */}
                        </Link>

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
            onClick: (evt, data) => alert('You want to dispatch ' + evt + data)
          }
        ]}
      />
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