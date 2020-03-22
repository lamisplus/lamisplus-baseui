import Page from "components/Page";
import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { FaListAlt, FaVials } from "react-icons/fa";
import classnames from "classnames";
import TableList from "./TableList";
import TableSearch from "./TableSearch";

const Laboratory = props => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
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
            <div>&nbsp;&nbsp;&nbsp;</div>Pending Subscription
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
            <div>&nbsp;&nbsp;&nbsp;</div>Dispensed Subscription
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
          <TableSearch />
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default Laboratory;
