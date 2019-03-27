import React from 'react';
import NavLink from 'react-bootstrap/NavLink';

const PrivateFiles = ({ fileSelection, fileType }) => (
    <>
        <h3>Private</h3>
        <ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Customers')}>Customers</NavLink></li>
                <ul>
                    <li><NavLink onClick={() => fileSelection(fileType, 'Customers_1')}>Customers_1</NavLink></li>
                </ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Schedules')}>Schedules</NavLink></li>
            <li><NavLink onClick={() => fileSelection(fileType, 'Clients')}>Clients</NavLink></li>
        </ul>
    </>
);


export default PrivateFiles;