import React from 'react';
import PrivateFiles from './PrivateFiles';
import PublicFiles from './PublicFiles';

const MyFiles = ({ fileSelection }) => (
    <>
        <PrivateFiles fileSelection={fileSelection} fileType='Private' />
        <PublicFiles fileSelection={fileSelection} fileType='Public' />    
    </>
);

export default MyFiles;