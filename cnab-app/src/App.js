import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UnloggedRoute } from './components/auth/UnloggedRoute';
import { SetAuth } from './components/login/CheckLogin';
import AuthService from './services/AuthService';

const service = new AuthService();
const App = () => {
  useEffect(() => service.loggedin(), []);

  if (service.isAuthenticated())
    return <Navigate to="/dashboard" />

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute service={service} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<UnloggedRoute service={service} />}>
          <Route path="/" element={<Login />} />
          <Route path="/set-auth" element={<SetAuth />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
