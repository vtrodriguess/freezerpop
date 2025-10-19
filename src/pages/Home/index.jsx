import './style.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

function Home() {
  const navigate = useNavigate();

  const inputQuantidade = useRef()

  const [users, setUsers] = useState([])
  const [balance, setBalance] = useState(0)
  const [quantities, setQuantities] = useState({});
  const [user, setUser] = useState({})

  function handleChange(e, id) {
    setQuantities({ ...quantities, [id]: e.target.value });
  }

  async function getUsers() {
    const token = localStorage.getItem("token");

    try {
      const usersFromApi = await api.get("/geladinho/geladinhos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar os geladinhos:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }

  async function increase(idFreezer, qtt) {
    const customer = JSON.parse(localStorage.getItem("customer"));
    await api.post('comprar', {
      idCustomer: customer.id,
      idFreezerPop: idFreezer,
      quantity: Number(qtt)
    })


    window.location.reload()
  }

  useEffect(() => {
    async function fetchBalance() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("cliente/balance", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data);
      } catch (error) {
        console.error("Erro ao buscar balance:", error);
      }
    }

    fetchBalance();
  }, []);

  useEffect(() => {
    async function usuario() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("cliente/clientes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.name);
      } catch (error) {
        console.error("Erro ao buscar balance:", error);
      }
    }

    usuario();
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
    <div className="container">

      <button type='button' onClick={handleLogout} className="logout-button">Sair</button>
      <h1>GELADINHO DA TÂMARA</h1>
      <div className="card1">
        <p><strong>Saldo:</strong> R$ {balance.toFixed(2)}</p>
      </div>

      <hr />

      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="texts">
            <p><strong>Sabor:</strong> {user.flavor}</p>
            <p><strong>Preço:</strong> R$ {user.price}</p>
            <p><strong>Quantidade:</strong> {user.quantity}</p>
          </div>
          <button onClick={() => increase(user.id, quantities[user.id])}>Comprar</button>
          <input type="number" min="0" max={user.quantity} step="1" onChange={(e) => handleChange(e, user.id)} disabled={user.quantity === 0} />
        </div>
      ))}
    </div>
  )
}

export default Home
