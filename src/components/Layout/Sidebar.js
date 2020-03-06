import logo200Image from 'assets/img/logo/lamislogo.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdExtension,
  MdKeyboardArrowDown,
  MdPages,
  MdAirlineSeatFlat,
} from 'react-icons/md';
import { GiTreeBeehive} from 'react-icons/gi';
import { FaUserPlus, FaVials, FaXRay, FaUserMd, FaUsers} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/test-order', name: 'Test Order', exact: false, Icon: FaVials },
  {
    to: '/collected-sample',
    name: 'Test Result',
    exact: false,
    Icon: FaVials,
  },
  
];

const pageContents = [
  { to: '/pending-prescription', name: 'Pending Prescription', exact: false, Icon: FaUserPlus },
  {
    to: '/dispensed-prescription',
    name: 'Dispensed Precription',
    exact: false,
    Icon: FaUserPlus,
  },
];
const PageGeneralClinic = [
  { to: '/vital-signs', name: 'Vital Signs', exact: false, Icon: MdAirlineSeatFlat },
  { to: '/consultation', name: 'Consultation', exact: false, Icon: FaUserMd },
];
const PagesAnc = [
  { to: '/index-Search', name: 'Index Contract Tracking', exact: false, Icon: GiTreeBeehive },
  { to: '/hts-list', name: 'Risk Assesment', exact: false, Icon: GiTreeBeehive },
];
const PagesHiv = [
  { to: '/enrollment-list', name: 'Enrollment', exact: false, Icon: GiTreeBeehive },
  
  
  // { to: '/case-management', name: 'Case Management', exact: false, Icon: GiTreeBeehive },
  // { to: '/pmtct', name: 'PMTCT', exact: false, Icon: GiTreeBeehive },

  { to: '/client-status', name: 'Client Status Update', exact: false, Icon: GiTreeBeehive },
  { to: '/eac-search', name: 'EAC', exact: false, Icon: GiTreeBeehive },
  { to: '/democ-Search', name: 'Differentiated Care', exact: false, Icon: GiTreeBeehive },
];

const navItems = [
  { to: '/dashboard', name: 'Dashboard', exact: true, Icon: MdDashboard },
  { to: '/patients', name: 'Registration', exact: false, Icon: FaUsers },
  { to: '/checkin', name: 'Check In', exact: false, Icon: FaXRay },
  // { to: '/testpage', name: 'Test Page', exact: false, Icon: FaXRay },
  // { to: '/testpage2', name: 'Test Page 2', exact: false, Icon: FaXRay },
];
const PagesHts = [
  { to: '/index-Search', name: 'Risk Assessment ', exact: false, Icon: GiTreeBeehive },

  
];
//Make it a main menu { to: '/hts-list', name: 'HTS', exact: false, Icon: GiTreeBeehive },
// { to: '/index-Search', name: 'Index Contract Tracking', exact: false, Icon: GiTreeBeehive },
const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenPageGeneralClinic: false,
    isOpenContents: false,
    isOpenPages: false,
    isOpenPagesHiv: false,
    isOpenPagesAnc:false,
   
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                LamisPlus 
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
    {/* The General Clinic Menu  */}
          <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('PageGeneralClinic')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">General Clinic</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPagesHiv
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPageGeneralClinic}>
              {PageGeneralClinic.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
      {/* The Laboratory Menu  */}
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Laboratory</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
       {/* The Pharmacy Menu  */}         
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pharmacy</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>   
      {/* The  Menu  Divider for Services*/}          
            <Divider variant="middle" style={{backgroundColor: '#fff'}}/>
              <Typography gutterBottom variant="body1" style={{marginLeft:30, padding: 5, }}>
                Services
              </Typography>
            <Divider variant="middle" style={{backgroundColor: '#fff'}}/>
      {/* The HIV Menu  */}  
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('PagesHiv')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">HIV</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPagesHiv
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem> 
            <Collapse isOpen={this.state.isOpenPagesHiv}>
              {PagesHiv.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
        {/* The HIV Menu  */}  
          <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('PagesAnc')}>
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <MdPages className={bem.e('nav-item-icon')} />
                    <span className="">HTS</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPagesAnc
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem> 
              <Collapse isOpen={this.state.isOpenPagesAnc}>
                {PagesAnc.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}>
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;