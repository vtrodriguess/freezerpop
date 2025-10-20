import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Cliente from './pages/Cliente';
import Geladinhos from './pages/Geladinhos';
import CadastroGeladinho from './pages/CadastroGeladinho';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Cliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/geladinhos"
          element={
            <ProtectedRoute>
              <Geladinhos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastro-geladinho"
          element={
            <ProtectedRoute>
              <CadastroGeladinho />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);