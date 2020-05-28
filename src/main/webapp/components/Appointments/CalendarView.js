import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { connect } from "react-redux";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

function CalendarViewPage(props){
    const handleDateClick = (arg) => { // bind with an arrow function
        console.log(arg)
        //setCalendarViewType("listWeek");
      }
      const handleEventClick = ({event}) => { // bind with an arrow function
        console.log(event)
        //setCalendarViewType("listWeek");
      }
    return (
        <React.Fragment>
        <FullCalendar
        defaultView="dayGridMonth"
        header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
         plugins={[ dayGridPlugin,timeGridPlugin, listPlugin, interactionPlugin  ]}
         weekends={true}
         dateClick={handleDateClick}
         eventClick={handleEventClick}
         events={props.events}
         />
                   </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      patient: state.patients.patient
    };
  };
  
  const mapActionToProps = {
  };
  
  export default connect(mapStateToProps, mapActionToProps)(CalendarViewPage);