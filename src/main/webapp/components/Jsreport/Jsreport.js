import React, { Component } from 'react'
import jsreport from "jsreport-browser-client-dist";
// import logo from './logo.svg';
// import './App.css';

class Jsreport extends Component {
    constructor() {
        super();
        this.state = {
            report: '',
            reportScript: ''
        };
    }

    componentDidMount() {
        jsreport.serverUrl = 'http://localhost:5488';
        let reportRequest = { template: { shortid: 'ByyCM_B7Z' } };
        jsreport.render(this.reportPreview, reportRequest)
    }

    render() {
        let test = this.state.report;
        return (
            <div className="App">
                <div className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <h2>Welcome to Jsreport</h2>
                </div>
                <div id="reportPlaceholder">
                    {/*<p>there should be a report here...</p>*/}
                    <div style={{ height: '700px' }} ref={(el) => this.reportPreview = el} />
                </div>
            </div>
        );
    }
}

export default Jsreport;
