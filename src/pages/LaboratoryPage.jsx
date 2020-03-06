import Page from 'components/Page';
import React,  { useState } from 'react';
import {
  Card,
  Col,
  Form,
  Row,
  Alert,
  TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText, 
} from 'reactstrap';

import { TiWarningOutline } from "react-icons/ti";
import {
FaListAlt,FaVials
} from 'react-icons/fa';
import SearchTestOrder from 'components/Laboratory/SearchForm/SearchTestOrder';
import classnames from 'classnames';
import TestOrder from 'components/Laboratory/TestOrder';
import Results from 'components/Laboratory/Results';
import ResultSearch from 'components/Laboratory/SearchForm/ResultSearch';


const CheckInPage = (props) => {
  const [activeTab, setActiveTab] = useState('1');

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
            <FaVials data-tip="Sample Collection"/>
            {' '} 
            <div>&nbsp;&nbsp;&nbsp;</div>Test Order
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink  
                className={classnames({ active: activeTab === '3' })}              
                onClick={() => { toggle('3'); }}
                style={{ color : '#000'}}
            >
            <FaVials data-tip="Sample Collection"/>
            {' '} 
            <div>&nbsp;&nbsp;&nbsp;</div>Manifest
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink  
                className={classnames({ active: activeTab === '2' })}              
                onClick={() => { toggle('2'); }}
                style={{ color : '#000'}}
            >
            <FaVials data-tip="Sample Collection"/>
            {' '} 
            <div>&nbsp;&nbsp;&nbsp;</div>Dispatched
            </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
            style={{ color : '#000'}}
          >
            <FaListAlt data-tip="Result" />
                {'  '} 
                <div>&nbsp;&nbsp;&nbsp;</div>Result
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
              <Row>          
                  <Col sm="12">
                    <Card body>
                      <Form>
                        <ResultSearch />
                      </Form>          
                        <br/>
                      <Results />               
                    </Card>
                  </Col>                
              </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card body>
                <CardTitle>Dispatched Module</CardTitle>
                <CardText>This module is coming soon</CardText>
                
              </Card>
            </Col>
            
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <Card body>
                <CardTitle>Manifest Module</CardTitle>
                <CardText>This module is coming soon </CardText>
                
              </Card>
            </Col>
            
          </Row>
        </TabPane>
        <TabPane tabId="4">
              <Row>          
                <Col sm="12">
                  <Card body>
                    <Form>
                      <SearchTestOrder />
                    </Form>          
                      <br/>
                    <TestOrder />               
                  </Card>
                </Col>
                
              </Row>
        </TabPane>
      </TabContent>

</Page>

  
  );
};

export default CheckInPage;
