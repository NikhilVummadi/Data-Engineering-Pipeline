import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import {Treebeard} from 'react-treebeard';

const PublicFiles = ({ data, onToggle, onClick, fileSelection, fileType }) => (
    <div style={{backgroundColor: '#212529', paddingLeft: 10, height: '40vh'}}>
        <h3 style={{color: 'white'}}>Public</h3>
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
    </div>
);


export default PublicFiles;