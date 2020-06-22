import React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import {Card, CardContent} from '@material-ui/core';
import Page from 'components/Page';
import 'flexmonster/flexmonster.css';

function PivotTable(props) {

    const ref = React.useRef(null);

    console.log(ref);

    const onReportComplete = () => {
        const flexMonsterRef = ref.current.flexmonster();
        console.log(ref);
        console.log(">>>>", flexMonsterRef.getReport());
    }

    return (
        <Page title="Report Builder" >
            <Card >
                <CardContent>
                    <h4>Create Report</h4>
                    <hr />
        <FlexmonsterReact.Pivot
            ref={ref}
            toolbar={true}
            width="100%"
            report="https://cdn.flexmonster.com/reports/report.json"
            reportcomplete={onReportComplete}/>
                </CardContent>
            </Card>
        </Page>
    );
}

export default PivotTable;