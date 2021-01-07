import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from '../context/providers/DataProvider';
import App from './App';

if (document.getElementById('root1')) {
    ReactDOM.render(
    <DataProvider>
        <App />
    </DataProvider>,
    document.getElementById('root1'));
}