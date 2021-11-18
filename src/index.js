import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DataDashboard from './pages/DataDashboard';
import reportWebVitals from './reportWebVitals'
import { NavigationBar } from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.Fragment>
    <Router>
      <NavigationBar/>
      <Routes>
        <Route exact path="/" element={<App/>}/>
        <Route path="/data" element={<DataDashboard/>}/>
        <Route component={<App/>}/>
      </Routes>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
