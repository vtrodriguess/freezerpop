import './style.css'
import { useRef } from 'react'
import CryptoJS from 'crypto-js'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'

function CadastroGeladinho() {

  const navigate = useNavigate()
  const inputSabor = useRef()
  const inputPreco = useRef()

  async function createGeladinho() {
    const preco = Number(inputPreco.current.value.replace(',', '.'));
    await api.post('/geladinho/cadastrar', {
      flavor: inputSabor.current.value,
      price: preco,

    })

    navigate("/geladinhos");
  }

  return (
    <div className='container-cadastrar-geladinho'>
      <form className='cadastro-gela'>
        <h1>Cadastro de Geladinho</h1>
        <input placeholder="Sabor" name="Sabor" type="text" ref={inputSabor} />
        <input placeholder="" name="Preço" type="text" ref={inputPreco} />
        <button type="button" className="cadastrar-geladinho" onClick={createGeladinho}>Cadastrar</button>
      </form>

      <div></div>
    </div>
  )
}

export default CadastroGeladinho
