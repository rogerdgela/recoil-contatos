import { useRecoilState } from "recoil";
import { contatosState } from "../atoms/contatosState"
import { apiContatos } from "../api/api"
import { useEffect } from "react";

export function useContatos() {
    const [contatos, setContatos] = useRecoilState(contatosState)

    const fetchContatos = async () => {
        return apiContatos.resgatarContatos().then((dadosDosContatos) => {
            setContatos(dadosDosContatos);
        })
    }

    const addContatos = async (contato) => {
        return apiContatos.criar(contato).then((novoContato) => {
            setContatos((listaAntiga) => [...listaAntiga, novoContato])

            return novoContato;
        })
    }

    const atualizarContato = async (id, contato) => {
        return apiContatos.atualizar(id, contato).then((contatoAtualizado) => {
            setContatos((listaAntiga) => 
                listaAntiga.map((contato) => contato._id === id ? contatoAtualizado : contato))

            return contatoAtualizado;
        })
    }

    const deletarContato = async (id) => {
        return apiContatos.deletar(id).then(() => {
            setContatos((listaAntiga) => listaAntiga.filter((contato) => contato._id !== id))
        })
    }

    useEffect(() => {
        fetchContatos();
    }, [])

    return {
        contatos,
        fetchContatos,
        addContatos,
        atualizarContato,
        deletarContato
    }
}