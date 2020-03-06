import Page from 'components/Page';
import React,  { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
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
import SearchInput from 'components/SearchBox/SearchInput';
import classnames from 'classnames';
import DataTableList from 'components/DataTable/DataTable';


const CheckInPage = () => {
    const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);

  }
  return (
    <Page >
       
         <Row>
         
         <Col xl={6} lg={6} md={6}></Col>
         <Col xl={6} lg={6} md={6}>
            <div>
                
            </div>
        </Col>
        <Col xl={12} lg={12} md={12}>
         <Alert color="primary">
                <TiWarningOutline 
                    size="30"
                    className=" text-dark"/>  { '  '} 
                    Note : Only checked in Patients can be search here
            </Alert>
        </Col>
        </Row>

      <Nav tabs>
        
        <NavItem>
            <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
                style={{ color : '#000'}}
            >
            <FaVials data-tip="Sample Collection"/>
            {' '} 
            <div>&nbsp;&nbsp;&nbsp;</div>Test Order
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
            <Row >
                <Col>
                    <Card className="mb-12">
                    
                    <CardHeader>List of Patient
                        
                    </CardHeader>
                    
                    <CardBody>
                        <Form>
                        <SearchInput />
                        </Form>
                    
                    <br/>
                        <Row>
                        <Col>
                            <Card body>

                                <DataTableList />
                            </Card>
                        </Col>

                        
                        </Row>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card body>
                <CardTitle>Sample Collection</CardTitle>
                <CardText>The collection form will be here</CardText>
                
              </Card>
            </Col>
            
          </Row>
        </TabPane>
      </TabContent>

</Page>

  
  );
};

export default CheckInPage;
