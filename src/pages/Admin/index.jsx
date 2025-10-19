import './style.css'
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Admin() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchBalance() {
      try {
        const response = await api.get("/admin/total-vendas-mes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data);
      } catch (error) {
        console.error("Erro ao buscar balance:", error);
      }
    }

    fetchBalance();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <button type='button' onClick={handleLogout} className="logout-button">Sair</button>
      <h1>GELADINHO DA TÂMARA</h1>

      <div className="admin-card1">
        <p><strong>Saldo total:</strong> R$ {balance.toFixed(2)}</p>
      </div>

      <hr />

      <div className="admin-menu">
        <Link to="/clientes" className="admin-menu-link">Clientes</Link>
        <Link to="/geladinhos" className="admin-menu-link">Geladinhos</Link>
      </div>
    </div>
  )
}

export default Admin