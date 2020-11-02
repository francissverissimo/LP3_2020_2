import { getManager } from 'typeorm';
import { Lancamento } from "../entity/Lancamento";

export class LancamentoController {

    /**
     * Método para salvar um novo lançamento
     */
    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await getManager().save(lancamento);
        return lancamentoSalvo;
    }

    /**
     * Método para atualizar um determinado lançamento
     */
    async atualizar(id: number, valor: number, descricao: string, data: Date) {
        let lancamento = await getManager().findOne(Lancamento, id);

        lancamento.valor = valor;
        lancamento.descricao = descricao;
        lancamento.data = data;

        if (lancamento) {
            const atualizar = await getManager().save(lancamento);
            return atualizar
        }
    }

    /**
     * Método para remover um determinado lançamento
     */
    async remover(id: number) {
        const lancamento = await getManager().findOne(Lancamento, id);

        if (lancamento) {
            const remover = await getManager().remove(lancamento);
            return remover;
        }
    }
}