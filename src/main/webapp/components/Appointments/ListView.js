import React, { useState } from "react";
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Tooltip from '@material-ui/core/Tooltip';
import * as _ from 'lodash';
import { connect } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {fetchAllAppointments} from "actions/appointments"

function ListViewPage(props){
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true)
    const onSuccess = () => {
     // setData(props.previousMedications);
      setLoading(false)
    }
    const onError = () => {
      setLoading(false)
     // setErrorMsg("Could not fetch previous medications, try again later");
    }
    props.fetchAllAppointments(onSuccess, onError);
  }, []);
    return (
        <React.Fragment>
         <MaterialTable
        title="Find Appointments"
        columns={[
          {title: "Patient ID",
          field: "id", filtering: true},
          {
            title: "Patient Name",
            field: "name",
             filtering: true
          },
          {title: "Phone Number",
          field: "phoneNumber", filtering: true},
          
          { title: "Appointment Date", field: "appointmentDate", type: 'date', filterComponent: FilterDateBetween },
          { title: "Service", field: "service", filtering: true },
          {
            title: "Action",
            field: "actions",
            filtering: false,
          },
        ]}
        isLoading={loading}
        data={props.appointments.map((row) => ({
          name: row.firstName +  ' ' + row.lastName,
          id: row.hospitalNumber,
          phoneNumber: row.phoneNumber,
          service: row.service || '',
          appointmentDate: row.formDataObj[0].data.appointmentDate,
          actions: 
          <div>
          <IconButton
          color="primary"
          aria-label="View Appointment"
          title="View Appointment"
        >
           <IconButton
          color="primary"
          aria-label="Edit Appointment"
          title="Edit Appointment"
        ></IconButton>
          
        </IconButton></div>
          
        }))}
        
        options={{
          headerStyle: {
            backgroundColor: "#9F9FA5",
            color: "#000",
          },
          searchFieldStyle: {
            width : '300%',
            margingLeft: '250px',
          },
          filtering: true,
          exportButton: false,
          searchFieldAlignment: 'left',

        }}
      />
                   </React.Fragment>
    )
}

 function FilterDateBetween({ columnDef, onFilterChanged }) {
  return (
    <>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="dense"
         // id="date-picker-inline"
          label="Appointments From:"
          value={_.get(columnDef, ['tableData', 'filterValue', 'greaterThan']) || null }
          onChange={(event) => {
            const value = {...columnDef.tableData.filterValue};
            value.greaterThan = event;
            onFilterChanged(columnDef.tableData.id, value);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="dense"
         // id="date-picker-inline"
          label="Appointments To:"
          value={_.get(columnDef, ['tableData', 'filterValue', 'lessThan']) || null }
          onChange={(event) => {
            const value = {...columnDef.tableData.filterValue};
            value.lessThan = event;
            onFilterChanged(columnDef.tableData.id, value);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
    </>
  );
}
const mapStateToProps = (state) => {
    return {
      patient: state.patients.patient,
      appointments: state.appointments.list
    };
  };
  
  const mapActionToProps = {
    fetchAllAppointments: fetchAllAppointments
  };
  
  export default connect(mapStateToProps, mapActionToProps)(ListViewPage);