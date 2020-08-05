import React from 'react';
import ReactDOM from 'react-dom';
import PivotTable from './PivotTable';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PivotTable />, div);
    ReactDOM.unmountComponentAtNode(div);
});
