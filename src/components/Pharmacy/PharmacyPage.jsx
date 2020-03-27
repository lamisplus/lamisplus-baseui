/**
 * @imports external
 */
import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import { FaListAlt, FaVials } from "react-icons/fa";
import classnames from "classnames";

/**
 * @imports Local
 */
import Dispensed from "./PendingPrescription";
import TableSearch from "./TableSearch";
import Page from "components/Page";
import { fetchPrescriptions } from "../../actions/pharmacy";

/**
 * ====================================
 * @Main
 * @param {*} props
 */
const Laboratory = props => {
  useEffect(() => {
    props.fetchPrescriptions();
  }, []);
  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // {
  //   props.prescriptions &&
  //     props.prescriptions.map(prescription => {
  //       console.log(prescription.firstName);
  //       if (prescription.formData.drug_order !== undefined) {
  //         prescription.formData.drug_order.map(drug => {
  //           console.log(drug);
  //         });
  //       }
  //     });
  // }

  console.log(props.prescriptions);

  return (
    <Page>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
            style={{ color: "#000" }}
          >
            <FaVials data-tip="Sample Collection" />{" "}
            <div>&nbsp;&nbsp;&nbsp;</div>Pending Prescriptions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
            style={{ color: "#000" }}
          >
            <FaVials data-tip="Sample Collection" />{" "}
            <div>&nbsp;&nbsp;&nbsp;</div>Dispensed Prescriptions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
            style={{ color: "#000" }}
          >
            <FaVials data-tip="Sample Collection" />{" "}
            <div>&nbsp;&nbsp;&nbsp;</div>Dispatched
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
            style={{ color: "#000" }}
          >
            <FaListAlt data-tip="Result" />
            {"  "}
            <div>&nbsp;&nbsp;&nbsp;</div>Result
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TableSearch />
        </TabPane>
        <TabPane tabId="2">
          <Dispensed />
        </TabPane>
      </TabContent>
    </Page>
  );
};

const mapStateToProps = state => ({
  prescriptions: state.pharmacy.formData
});

export default connect(mapStateToProps, { fetchPrescriptions })(Laboratory);
