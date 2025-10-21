import './style.css'
import { useRef, useState } from 'react'
import CryptoJS from 'crypto-js'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

function Cadastro() {

  const navigate = useNavigate()
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()
  const [error, setError] = useState("")

  async function createCustomer() {
    const password = inputPassword.current.value

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }
    setError("")

    try {
      await api.post('/cliente/cadastrar', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: password
      })
      navigate("/login");
    } catch (err) {
      setError("Erro ao cadastrar usuário")
      console.error(err)
    }
  }

  return (
    <div className='cadastro-pessoa-container'>
      <form>
        <h1>Cadastro</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
        <input placeholder="Senha" name="senha" type="password" ref={inputPassword} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" className='cadastro-pessoa' onClick={createCustomer}>Cadastrar</button>
      </form>

      <div></div>
    </div>
  )
}

export default Cadastro
