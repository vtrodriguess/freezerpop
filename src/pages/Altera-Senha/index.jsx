import './style.css'
import { useRef, useState } from 'react'
import CryptoJS from 'crypto-js'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

function AlteraSenha() {

  const navigate = useNavigate()
  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()
  const [error, setError] = useState("")

  async function trocarSenha() {
    const password = inputPassword.current.value

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }
    setError("")

    try {
      await api.put('cliente/troca-senha', {
        email: inputEmail.current.value,
        newPassword: password
      })
      navigate("/login");
    } catch (err) {
      setError("Erro ao trocar a senha. Verifique o e-mail informado.")
      console.error(err)
    }
  }
  return (
    <div className='cadastro-pessoa-container'>
      <form>
        <h1>Trocar senha</h1>
        <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
        <input placeholder="Senha" name="senha" type="password" ref={inputPassword} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" className='cadastro-pessoa' onClick={trocarSenha}>Confirmar</button>
      </form>

      <div></div>
    </div>
  )
}

export default AlteraSenha
