import React from 'react';
import NavLink from 'react-bootstrap/NavLink';

const MyFiles = () => (
    <>
        <h3>Private</h3>
        <ul>
            <li><NavLink>Customers.csv</NavLink></li>
            <li><NavLink>Schedules.csv</NavLink></li>
            <li><NavLink>Clients.csv</NavLink></li>
        </ul>
        <h3>Public</h3>
        <ul>
            <li><NavLink>Everyone.csv</NavLink></li>
            <li><NavLink>Pixels.csv</NavLink></li>
            <li><NavLink>Updates.csv</NavLink></li>
        </ul>
    </>
);

export default MyFiles;