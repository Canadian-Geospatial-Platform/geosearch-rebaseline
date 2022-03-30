import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './assets/css/style.scss';

const container = document.getElementById('root');
render(<App />, container);
