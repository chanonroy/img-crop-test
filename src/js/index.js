import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';
import '../assets/office.jpg';

import CroppingTool from './CroppingTool.jsx';


ReactDOM.render(
    <CroppingTool />,
    document.getElementById('cropper')
)
