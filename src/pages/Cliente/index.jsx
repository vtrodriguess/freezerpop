import './style.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

function Cliente() {
  const navigate = useNavigate();

  const inputQuantidade = useRef()

  const [users, setUsers] = useState([])
  const [balance, setBalance] = useState(0)
  const [amounts, setAmounts] = useState({})

  async function getUsers() {
    const token = localStorage.getItem("token");

    try {
      const usersFromApi = await api.get("/cliente/clientes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }

  async function attBalance(id, amount) {
    await api.put(`http://localhost:8080/admin/${id}/atualizar?amount=${amount}`, {
    })

    window.location.reload()
  }

  useEffect(() => {
    async function fetchBalance() {
      const token = localStorage.getItem("token");
      if (!token) return;

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getUsers();
    }
  }, []);

  return (
    <div className="container-clientes">

      <button type='button' onClick={handleLogout} className="logout-button">Sair</button>
      <h1>GELADINHO DA TÂMARA</h1>
      <div className="card1">
        <p><strong>Saldo:</strong> R$ {balance.toFixed(2)}</p>
      </div>
      <button onClick={() => attBalance(user.id, amounts[user.id])} className='btn-voltar'>Voltar</button>
      <hr />

      {users
        .filter(user => user.role !== "ADMIN")
        .map((user) => (
          <div key={user.id} className="card-clientes">
            <div className="texts">
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Saldo:</strong> R$ {user.balance}</p>
            </div>
            <button onClick={() => attBalance(user.id, amounts[user.id])}>Pago</button>
            <input type="number" min="0" max={user.balance} step="1" disabled={user.balance === 0} onChange={(e) =>
              setAmounts({ ...amounts, [user.id]: e.target.value })
            } />
          </div>
        ))
      }
    </div>
  )
}

export default Cliente
