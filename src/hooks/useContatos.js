import { useRecoilState } from "recoil";
import { contatosState } from "../atoms/contatosState";
import { apiContatos } from "../api/api";

export const useContatos = () => {
    const [contatos, setContatos] = useRecoilState(contatosState);

    const fetchContatos = async () => {
        return apiContatos.resgatarContatos().then((dadosDosContatos) => {
            setContatos(dadosDosContatos);
        });
    }    

    return {
        contatos,
        fetchContatos
    }
}