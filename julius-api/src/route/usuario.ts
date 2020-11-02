import { Usuario } from '../entity/Usuario';
import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const { nome, email } = req.body;
    const usuario = new Usuario(nome, email);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});

/**
 * Serviço para recuperar todos os usuários
 */
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
});

/**
 * Serviço para recuperar os lançamentos de um determinado usuário
 */
routerUsuario.get('/lancamentos/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    res.json(lancamentos);
});

/**
 * Serviço para recuperar os lançamentos positivos de um determinado usuário
 */
routerUsuario.get('/usuario/lancamentos/entradas/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarEntradas(idLancamento);
    
    if (lancamentos) {
        res.json(lancamentos);
    } else {
        res.status(404).json({ mensagem: "Nenhum lançamento de entrada foi encontrado" });   
    }
});

/**
 * Serviço para recuperar os lançamentos negativos de um determinado usuário
 */
routerUsuario.get('/usuario/lancamentos/gastos/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarGastos(idLancamento);
    
    if (lancamentos) {
        res.json(lancamentos);
    } else {
        res.status(404).json({ mensagem: "Nenhum lançamento de gasto foi encontrado" });   
    }
});