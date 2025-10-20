import './style.css'
import { useRef } from 'react'
import CryptoJS from 'crypto-js'
import api from '../../services/api'
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate("/cadastro");
  };
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function loginCustomer() {
    const password = inputPassword.current.value
    const response = await api.post('cliente/login', {
      email: inputEmail.current.value,
      password: password

    })

    const token = response.data.token;
    const customer = response.data.customer;
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem('token', token);
    localStorage.setItem("role", customer.role);

    if (customer.role !== "ADMIN") {
      navigate("/home")
    }
    else {
      navigate("/admin")
    }
  }

  return (
    <div className='login-container'>
      <form>
        <h1>Login</h1>
        <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
        <input placeholder="Senha" name="senha" type="password" ref={inputPassword} />
        <button type="button" className="login-acessar-ini" onClick={loginCustomer}>Acessar</button>
        <Link to="/alterar-senha" className="btn-esqueci-senha">
          Esqueci a senha
        </Link>
        <button className='login-cadastro-ini' type="button" onClick={handleCadastro}>Cadastre-se</button>
      </form>

      <div></div>
    </div>
  )
}

export default Login
