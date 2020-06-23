import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/user";
import "./UserList.css";

const UserList = (props) => {
  useEffect(() => {
    props.fetchAllUsers();
  }, []);

  return (
    <div>
      <MaterialTable
        title="Find Users"
        columns={[
          { title: "Name", field: "name" },         
          { title: "Username", field: "userName"},
          { title: "Designation", field: "designation"},
          { title: "Gender", field: "gender"},
          { title: "Action", field: "action", filtering: false },
        ]}
        data={props.userList.map((row) => ({
          id: "",
          name: row.firstName + " " + row.lastName,
          userName: row.userName,
          authorities: row.authorities,
          actions: (
            <div>

            </div>
          ),
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#9F9FA5",
            color: "#000",
          },
          searchFieldStyle: {
            width: "300%",
            margingLeft: "250px",
          },
          filtering: true,
          exportButton: false,
          searchFieldAlignment: "left",
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.list,
  };
};

const mapActionToProps = {
  fetchAllUsers: fetchUsers,
};

export default connect(mapStateToProps, mapActionToProps)(UserList);
