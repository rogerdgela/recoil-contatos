import { atom, selector } from "recoil";

export const contatosState = atom({
    key: "contatosState",
    default: [],
})

export const pesquisaState = atom({
    key: "pesquisaState",
    default:""
})

export const contatosFiltradosSelector = selector({
    key: "contatosFiltradosSelector",
    get: ({ get }) => {
        const pesquisa = get(pesquisaState).toLowerCase();
        const contatos = get(contatosState);

        return contatos.filter(contato => contato.nome.toLowerCase().includes(pesquisa))
    }
})