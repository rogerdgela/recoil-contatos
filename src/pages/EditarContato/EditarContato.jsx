import {useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../../components/Container/Container";
import Wrapper from "../../components/Wrapper/Wrapper";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import Formulario from "../../components/Formulario/Formulario";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";
import { useContatos } from "../../hooks/useContatos";


function EditarContato() {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    nome: "",
    telefone: "",
    imagem: "",
  });

  const {contatos, atualizarContato} = useContatos();


  // Carregar dados do contato atual
  useEffect(() => {
    const contatoAtual = contatos.find(
      (contato) => contato._id === parseInt(id)
    );
    
    if (contatoAtual) {
      setDadosDoFormulario(contatoAtual);
    }
  }, []);

  // Atualizar estado do formulário
  const gerenciarMudancaDeInput = (e) => {
    const { id, value } = e.target;
    setDadosDoFormulario((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    atualizarContato(id, dadosDoFormulario).then(() => {
      navigate("/")
    }).catch(() => {
      console.error("Erro ao atualizar o contato")
    })
  };

  return (

    <Wrapper>
      <Header />
      <Container>
      <BotaoVoltar/>

        <Titulo>
          Editar contato
        </Titulo>

        <Formulario
            dadosDoFormulario={dadosDoFormulario}
            onChange={gerenciarMudancaDeInput}
            onSubmit={handleSubmit}
          />
      </Container>
    </Wrapper>

  );
}

export default EditarContato;
