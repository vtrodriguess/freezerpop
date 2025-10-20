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
import AlteraSenha from './pages/Altera-Senha';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/alterar-senha" element={<AlteraSenha />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={['USER']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Cliente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/geladinhos"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Geladinhos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastro-geladinho"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <CadastroGeladinho />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);