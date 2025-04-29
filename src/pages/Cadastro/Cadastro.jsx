import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

import Wrapper from "../../components/Wrapper/Wrapper";
import Container from "../../components/Container/Container";
import BotaoVoltar from "../../components/BotaoVoltar/BotaoVoltar";
import Formulario from "../../components/Formulario/Formulario";
import Titulo from "../../components/Titulo/Titulo";
import { useContatos } from "../../hooks/useContatos";


function Cadastro() {
  const navigate = useNavigate();
  const [dadosDoFormulario, setDadosDoFormulario] = useState({
    nome: "",
    telefone: "",
    imagem: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDadosDoFormulario((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const { addContatos } = useContatos();
  const handleSubmit = (evento) => {
    evento.preventDefault();
    addContatos(dadosDoFormulario).then(() => {
      navigate("/")
    }).catch(() => {
      console.error("Erro ao adicionar o contato");
    })
  };


  return (
    <Wrapper>
      <Header />
      <Container>
        <BotaoVoltar/>


        <Titulo>
        Adicionar contato
        </Titulo>

        <Formulario
            dadosDoFormulario={dadosDoFormulario}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
      </Container>
    </Wrapper>
  );
}

export default Cadastro;
