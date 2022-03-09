import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UnloggedRoute } from './components/auth/UnloggedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* <ProtectedRoute />
        <ProtectedRoute /> */}
        <Route path="/" element={<UnloggedRoute />}>
          <Route path="/" element={<Login onClickHandler={() => null} platform="Github" class="dark rounded medium-font" />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
