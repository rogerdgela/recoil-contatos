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

    useEffect(() => {
        fetchContatos();
    }, []);

    return {
        contatos,
        fetchContatos
    }
}