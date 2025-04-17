import { useRecoilState } from "recoil";
import { contatosState } from "../atoms/contatosState";
import { apiContatos } from "../api/api";
import { useEffect } from "react";

export const useContatos = () => {
    const [contatos, setContatos] = useRecoilState(contatosState);

    const fetchContatos = async () => {
        return apiContatos.resgatarContatos().then((dadosDosContatos) => {
            setContatos(dadosDosContatos);
        });
    }    

    const addContatos = async (contato) => {
        return apiContatos.criar(contato).then((novoContato) => {
            setContatos((listaAntiga) => [...listaAntiga, novoContato]);
            return novoContato;
        });
    }

    useEffect(() => {
        fetchContatos();
    }, []);

    return {
        contatos,
        fetchContatos,
        addContatos
    }
}