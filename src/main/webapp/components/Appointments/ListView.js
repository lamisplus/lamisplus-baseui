import React, { useState } from "react";

import { connect } from "react-redux";
function ListViewPage(props){

    return (
        <React.Fragment>
        
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
  
  export default connect(mapStateToProps, mapActionToProps)(ListViewPage);