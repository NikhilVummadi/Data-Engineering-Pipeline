import React from 'react';
import PrivateFiles from './PrivateFiles';
import PublicFiles from './PublicFiles';

const MyFiles = ({ privateData, publicData, onToggle, onClick, fileSelection }) => (
    <div styles={{flex:1}}>
        <div style={{minHeight: `50%`}}>
            <PrivateFiles data={privateData} onToggle={onToggle} fileSelection={fileSelection} fileType='Private' />
        </div>
        <div style={{minHeight: `50%`}}>
        <PublicFiles data={publicData} onToggle={onToggle} onClick={onClick} fileSelection={fileSelection} fileType='Public' />    
        </div>
    </div>
);

export default MyFiles;