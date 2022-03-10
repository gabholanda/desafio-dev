import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UnloggedRoute } from './components/auth/UnloggedRoute';
import { SetAuth } from './components/login/SetAuth';
import AuthService from './services/AuthService';
import { FileUploadPage } from './components/file/FileUploadPage';
class App extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = { service: this.service }
  }

  clickHandler = async (e) => {
    e.preventDefault();
    this.service.login();
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route element={<UnloggedRoute service={this.state.service} />}>
            <Route path="/login" element={<Login handler={this.clickHandler} />} />
            <Route path="/set-auth" element={<SetAuth service={this.state.service} />} />
          </Route>

          <Route element={<ProtectedRoute service={this.state.service} />}>
            <Route path="/dashboard/file" element={<FileUploadPage />} />
            <Route path="/dashboard/show" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
