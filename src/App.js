import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import DataRender from './components/DataRender';
import { isAuth } from './utils/auth';
//import Layout from './components/Layout';

function App() {


  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route
          path="/items"
          element={isAuth() ? <DataRender /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
