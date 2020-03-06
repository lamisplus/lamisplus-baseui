import Page from 'components/Page';
import React,  { useState } from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Alert,
  TabContent, TabPane, Nav, NavItem, NavLink, 
} from 'reactstrap';
import { TiWarningOutline } from "react-icons/ti";
import {
    GiMedicines, GiMedicinePills
    } from 'react-icons/gi';
import PendingSearch from 'components/Pharmacy/SearchForm/PendingSearch';
import classnames from 'classnames';
import DispensedSearch from 'components/Pharmacy/SearchForm/DispensedSearch';
import Dispensed from 'components/Pharmacy/Dispensed';
import Pending from 'components/Pharmacy/Pending';

const CheckInPage = () => {
    const [activeTab, setActiveTab] = useState('4');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);

  }
  return (
    <Page >     
        <Row>        
        <Col xl={12} lg={12} md={12}>
          <Alert color="primary">
                <TiWarningOutline 
                    size="30"
                    className=" text-dark"/>  { '  '} 
                    Note : Only  Patients can be search here
            </Alert>
          </Col>
        </Row>
      <Nav tabs>        
        <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { toggle('4'); }}
                style={{ color : '#000'}}
            >
            <GiMedicines data-tip="Pending Prescription"/>
            {' '} 
            <div>&nbsp;&nbsp;&nbsp;</div>Pending Prescription
            </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
             className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            style={{ color : '#000'}}
          >
            <GiMedicinePills data-tip="Dispensed Precription" />
                {'  '} 
                <div>&nbsp;&nbsp;&nbsp;</div>Dispensed Precription
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
              <Row>          
                  <Col sm="12">
                    <Card body>
                      <Form>
                        <DispensedSearch />
                      </Form>          
                        <br/>
                      <Dispensed />               
                    </Card>
                  </Col>                
              </Row>
        </TabPane>
        <TabPane tabId="4">
              <Row>          
                <Col sm="12">
                  <Card body>
                    <Form>
                      <PendingSearch />
                    </Form>          
                      <br/>
                    <Pending />               
                  </Card>
                </Col>
                
              </Row>
        </TabPane>
      </TabContent>
</Page>

  
  );
};

export default CheckInPage;
