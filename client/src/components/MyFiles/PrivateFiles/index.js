import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {Treebeard} from 'react-treebeard';

const PrivateFiles = ({ data, onToggle, fileSelection, fileType }) => (
    <div style={{backgroundColor: '#212529', paddingLeft: 10, height: '40vh'}}>
        <h3 style={{color: 'white'}}>Private</h3>
        <ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Customers')}>Customers</NavLink></li>
                <ul>
                    <li><NavLink onClick={() => fileSelection(fileType, 'Customers_1')}>Customers_1</NavLink></li>
                </ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Schedules')}>Schedules</NavLink></li>
            <li><NavLink onClick={() => fileSelection(fileType, 'Clients')}>Clients</NavLink></li>
        </ul>
            {/* <Treebeard
                data={data}
                onToggle={onToggle}
            /> */}
    </div>
);


export default PrivateFiles;
