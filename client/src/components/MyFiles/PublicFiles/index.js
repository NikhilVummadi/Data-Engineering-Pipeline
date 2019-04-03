import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {Treebeard} from 'react-treebeard';

const PublicFiles = ({ data, onToggle, onClick, fileSelection, fileType }) => (
    <>
        <h3>Public</h3>
        {/* <ul>
            <li><NavLink onClick={() => fileSelection(fileType, 'Everyone')}>Everyone</NavLink></li>
            <li><NavLink onClick={() => fileSelection(fileType, 'Pixels')}>Pixels</NavLink></li>
            <li><NavLink onClick={() => fileSelection(fileType, 'Updates')}>Updates</NavLink></li>
        </ul> */}
            <Treebeard
                data={data}
                onToggle={onToggle}
                onClick={onClick}
            />
    </>
);


export default PublicFiles;