import { UsuarioController } from '../controller/UsuarioController';
import { LancamentoController } from '../controller/LancamentoController';
import { Router } from 'express';
import { Lancamento } from '../entity/Lancamento';

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerLancamento.post('/', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});

/**
 * Serviço para atualizar os dados de um determinado lançamento
 */
routerLancamento.put('/lancamento/:idLancamento', async (req, res) => {
    const idLancamento = parseInt(req.params.id);
    const { idUsuario, valor, descricao, data } = req.body;

    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    const lancamento = new Lancamento(valor, descricao, data, usuario);

    const lancamentoAtualizado = await lancamentoCtrl.atualizar(
        idLancamento,
        lancamento.valor,
        lancamento.descricao,
        lancamento.data
    );

    if (lancamentoAtualizado) {
        res.status(200).json({ mensagem: "Lançamento atualizado com SUCESSO" });
    } else {
        res.status(404).json({ mensagem: "Nenhum lançamento foi encontrado" });
    }
});

/**
 * Serviço para remover um determinado lançamento
 */
routerLancamento.delete('/lancamento/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.idLancamento);

    const lancamentoRemovido = await lancamentoCtrl.remover(idLancamento);

    if (lancamentoRemovido) {
        res.status(200).json({ mensagem: "Lançamento removido com SUCESSO" });
    } else {
        res.status(404).json({ mensagem: "Nenhum lançamento foi encontrado" });
    }
});