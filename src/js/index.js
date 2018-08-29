import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';
import '../assets/dog.jpg';

import Cropper from './Cropper.jsx';


ReactDOM.render(
    <Cropper />,
    document.getElementById('cropper')
)
