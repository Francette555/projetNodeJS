/*import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/ajout"
            element={
              <PrivateRoute>
                <Navbar />
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/liste"
            element={
              <PrivateRoute>
                <Navbar />
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/bilan"
            element={
              <PrivateRoute>
                <Navbar />
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/accueil"
            element={
              <PrivateRoute>
                <Navbar />
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/ajout"
            element={
              <PrivateRoute>
                <Navbar />
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/liste"
            element={
              <PrivateRoute>
                <Navbar />
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/bilan"
            element={
              <PrivateRoute>
                <Navbar />
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;