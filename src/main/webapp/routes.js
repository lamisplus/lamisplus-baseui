import { EmptyLayout, LayoutRoute, MainLayout } from "components/Layout";
import PageSpinner from "components/PageSpinner";

// import AuthPage from 'pages/AuthPage';
import React, {Component} from "react";
// React Toast Notification 
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./styles/reduction.scss";
import SignIn from "pages/SignPage";
import { history } from "./history";
import { authentication } from "./actions/authentication";

const DashboardPage = React.lazy(() => import("pages/DashboardPage"));

/* New Page loading using easy loading */
const PateintRegistationPage = React.lazy(() =>
  import("components/patient/PateintRegistationPage")
);
const CheckInPage = React.lazy(() => import("components/CheckIn/CheckInPage"));
const VitalSignsPage = React.lazy(() =>
  import("components/Vitals/VitalSignsPage")
);

/* Consultation page loading */
const ConsultationPage = React.lazy(() => import("pages/ConsultationPage"));
const ConsultationDashboardPage = React.lazy(() =>
  import("components/Consultation/Dashboard")
);

/* Laboratory page loading */
const LaboratoryPage = React.lazy(() =>
  import("components/Laboratory/LaboratoryPageDashboard")
);
const CollectSample = React.lazy(() =>import("components/Laboratory/Testorders/CollectSample"));
const LaboratorySampleResultPage = React.lazy(() =>import("components/Laboratory/TestResult/CollectResult"));
const SampleVerification = React.lazy(() => import("components/Laboratory/Sampleverifications/SampleVerification"));
const PatientsPage = React.lazy(() =>
  import("components/patient/PatientsPage")
);
const formDashboard = React.lazy(() => import('components/formBuilder/formDashboard'));
const FormBuilder = React.lazy(() => import('components/formBuilder/FormBuilder'));
const ViewForm = React.lazy(() => import('components/formBuilder/ViewForm'));

/* Pharmacy page loading */
const PharmacyDashboard = React.lazy(() => import("./components/Pharmacy/PharmacyDashboard"))

const AppointmentPage = React.lazy(() => import("pages/AppointmentPage"));
const CheckInPatientPage = React.lazy(() =>
  import("components/CheckIn/CheckedInPatientPage")
);
const ViewVitalsPage = React.lazy(() =>
  import("components/Vitals/ViewVitalsPage")
);
const AddVitalsPage = React.lazy(() =>
  import("components/Vitals/AddVitalsPage")
);
// const CheckInModal = React.lazy(() => import('components/CheckIn/CheckInModal'));
const EnrolledPatientsDashboard = React.lazy(() =>
  import("components/PatientConsultation/HomePage")
);

/* Sample table i design */
const TestPage = React.lazy(() => import("pages/TestPage"));
const FormRendererPage = React.lazy(() => import("components/FormManager/FormRendererPage"));
//Reporting components
const ReportPage = React.lazy(() => import("components/Reports/ReportingPage"));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

const Prescription = React.lazy(() => import("components/Pharmacy/prescriptions"))
const currentUser = authentication.currentUserValue;;
class Routes extends Component {
  render() {
    console.log('User', currentUser);
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return (
      <BrowserRouter basename={getBasename()} history={history}>
        <Switch>
          <LayoutRoute exact path="/login" layout={EmptyLayout} component={SignIn} />
          <Redirect to="/login" />
        </Switch>       
      </BrowserRouter>
    );
    }
    return (
      <BrowserRouter basename={getBasename()} history={history}>
        <Switch>

        <LayoutRoute exact path="/login" layout={EmptyLayout} component={SignIn} />

          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              {/* The new routes are here  */}
              <Route exact path="/" component={DashboardPage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route
                exact
                path="/patient-registration"
                component={PateintRegistationPage}
              />
              <Route exact path="/checkin" component={CheckInPage} />
              <Route exact path="/vital-signs" component={VitalSignsPage} />
              {/* Consultation Links */}
              <Route exact path="/consultation" component={ConsultationPage} />
              
              <Route
                exact
                path="/consultation-dashbaord"
                component={ConsultationDashboardPage}
              />
             <Route exact path="/collect-result" component={LaboratorySampleResultPage} />
              <Route exact path="/laboratory" component={LaboratoryPage} />
              <Route exact path="/sample-verification" component={SampleVerification} />
              <Route exact path="/collect-sample" component={CollectSample} />
              <Route exact path="/patients" component={PatientsPage} />

              {/* Pharmacy Links */}
              <Route exact path="/pharmacy" component={PharmacyDashboard} />
              
              <Route exact path="/prescriptions" component={Prescription}/>
              <Route exact path="/appointment" component={AppointmentPage} />
              <Route
                exact
                path="/checkedin-patients"
                component={CheckInPatientPage}
              />
              <Route exact path="/view-vitals" component={ViewVitalsPage} />
              <Route exact path="/add-vitals" component={AddVitalsPage} />
              {/* <Route exact path="/checkin-modal" component={CheckInModal} /> */}

              {/* The rout to Hiv Module */}
              <Route
                exact
                path="/patient-dashboard"
                component={EnrolledPatientsDashboard}
              />
              <Route exact path="/form-dashboard" component={formDashboard} />
              <Route exact path="/form-builder" component={FormBuilder} />
              <Route exact path="/view-form" component={ViewForm} />
              
              {/* The rout to that DataTabel */}
              <Route exact path="/testpage" component={TestPage} />
              <Route exact path="/form-renderer" component={FormRendererPage} />
              {/* The rout to Report*/}
              <Route exact path="/report" component={ReportPage} />
              
            </React.Suspense>
          </MainLayout>
          
          <Redirect to="/" />
        </Switch>       
      </BrowserRouter>
    );
  }
}

export default Routes;
