import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import DataProvider from './components/context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <App />
  </DataProvider>
)