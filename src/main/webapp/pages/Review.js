import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Review = (props)  => {
    const [state, setState] = useState({ name: '', gender: '', age: ''});

    useEffect(() => {
        const { steps } = props;
        const { name, gender, age } = steps;
        setState({ name, gender, age });
    }, [props])

    const { name, gender, age } = state;
    return (
        <div style={{ width: '100%' }}>
            <h3>Summary</h3>
            <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{name.value}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{gender.value}</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{age.value}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};

export default Review;

import React, { Component } from 'react'
import * as FlexmonsterReact from 'react-flexmonster';
import {Card, CardContent} from '@material-ui/core';
import Page from 'components/Page';
import 'flexmonster/flexmonster.css';



class PivotTable extends Component {
    render() {
        return (
            <div className="PivotTable">
                <Page title="Report Builder" >
                    <Card >
                        <CardContent>
                            <h4>Create Report</h4>
                            <hr />
                            <FlexmonsterReact.Pivot toolbar={true}
                                                    componentFolder="https://cdn.flexmonster.com/"
                                                    width="100%"
                                                    report="https://cdn.flexmonster.com/reports/report.json"/>
                        </CardContent>
                    </Card>
                </Page>
            </div>

        );
    }
}
export default PivotTable;
