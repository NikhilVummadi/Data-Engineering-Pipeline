import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {Treebeard} from 'react-treebeard';

const PrivateFiles = ({ data, onToggle, fileSelection, fileType }) => (
    <>
        <h3>Private</h3>
        {/* <ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Customers')}>Customers</NavLink></li>
                <ul>
                    <li><NavLink onClick={() => fileSelection(fileType, 'Customers_1')}>Customers_1</NavLink></li>
                </ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Schedules')}>Schedules</NavLink></li>
            <li><NavLink onClick={() => fileSelection(fileType, 'Clients')}>Clients</NavLink></li>
        </ul> */}
            <Treebeard
                data={data}
                onToggle={onToggle}
            />
    </>
);


export default PrivateFiles;