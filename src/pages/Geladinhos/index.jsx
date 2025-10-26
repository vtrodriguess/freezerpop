import './style.css';
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from "../../services/api";

function Geladinhos() {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate("/cadastro-geladinho");
  };
  const [geladinho, setGeladinho] = useState([])
  const [balance, setBalance] = useState(0)
  const [quantities, setQuantities] = useState({});

  function handleChange(e, id) {
    setQuantities({ ...quantities, [id]: e.target.value });
  }

  async function getGeladinho() {
    const token = localStorage.getItem("token");

    try {
      const usersFromApi = await api.get("/admin/all-geladinhos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGeladinho(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar os geladinhos:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  }

  async function deleteGeladinho(id) {
    await api.delete(`/geladinho/delete/${id}`)
    setGeladinho(prev => prev.filter(g => g.id !== id));
  }

  async function attQuantity(id, quantity) {
    await api.put(`/estoque/${id}/atualizar?quantity=${quantity}`)
    setGeladinho(prev =>
      prev.map(g =>
        g.id === id ? { ...g, quantity: g.quantity + Number(quantity) } : g
      )
    );

    setQuantities(prev => ({ ...prev, [id]: "" }));
  }

  function confirmaDelete(id) {
    confirmAlert({
      title: 'Confirmação de Exclusão',
      message: 'Tem certeza que deseja deletar este geladinho?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => deleteGeladinho(id)
        },
        {
          label: 'Não',
          onClick: () => { }
        }
      ]
    });
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
      getGeladinho();
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

      {geladinho.map((geladinhos) => (
        <div key={geladinhos.id} className="card-geladinhos-adm">
          <div className="texts">
            <p><strong>Sabor:</strong> {geladinhos.flavor}</p>
            <p><strong>Preço:</strong> R$ {geladinhos.price}</p>
            <p><strong>Quantidade:</strong> {geladinhos.quantity}</p>
          </div>
          <div className="actions">
            <button onClick={() => confirmaDelete(geladinhos.id)} className='button-delete'>Deletar</button>
            <button onClick={() => attQuantity(geladinhos.id, quantities[geladinhos.id])}>Adicionar</button>
            <input type="number" min="0" step="1" value={quantities[geladinhos.id] || ""} onChange={(e) => handleChange(e, geladinhos.id)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Geladinhos
