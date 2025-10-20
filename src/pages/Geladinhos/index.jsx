import './style.css'
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

function Geladinhos() {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate("/cadastro-geladinho");
  };
  const [users, setUsers] = useState([])
  const [balance, setBalance] = useState(0)
  const [quantities, setQuantities] = useState({});

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

  async function attQuantity(id, quantity) {
    await api.put(`http://localhost:8080/estoque/${id}/atualizar?quantity=${quantity}`, {
    })

    window.location.reload()
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getUsers();
    }
  }, []);

  return (
    <div className="container-geladinhos-adm">
      <div className="header">
        <h1>GELADINHO DA TÂMARA</h1>
      </div>
      <div className="top-buttons-group">
        <button type="button" onClick={handleLogout} className="logout-button">Sair</button>
        <Link to="/admin" className="btn-voltar-geladinho">Voltar</Link>
      </div>

      <button className="cadastro-geladinho-gela" type="button" onClick={handleCadastro}>
        Cadastrar Geladinho
      </button>

      <hr />

      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="texts">
            <p><strong>Sabor:</strong> {user.flavor}</p>
            <p><strong>Preço:</strong> R$ {user.price}</p>
            <p><strong>Quantidade:</strong> {user.quantity}</p>
          </div>
          <div className="actions">
            <button onClick={() => attQuantity(user.id, quantities[user.id])}>Adicionar</button>
            <input type="number" min="0" step="1" onChange={(e) => handleChange(e, user.id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Geladinhos
