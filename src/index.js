import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

const root = document.querySelector('#root');
render(<Router />, root);
