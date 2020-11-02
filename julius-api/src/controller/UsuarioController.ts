import { getManager, LessThan, MoreThan, MoreThanOrEqual } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { Lancamento } from "../entity/Lancamento";

export class UsuarioController {

    /**
     * Método para salvar um novo usuário
     */
    async salvar(usuario: Usuario) {
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
    }

    /**
     * Método para recuperar todos os usuários
     */
    async recuperarTodos() {
        const usuarios = await getManager().find(Usuario);
        return usuarios;
    }

    /**
     * Método para recuperar um determinado usuário pelo seu id
     */
    async recuperarPorId(id: number) {
        const usuario = await getManager().findOne(Usuario, id);
        return usuario;
    }

    /**
     * Método para recuperar todos os lançamentos de um determinado 
     * usuário pelo seu id
     */
    async recuperarLancamentosDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['lancamentos']
        });
        return usuario.lancamentos;
    }

    /**
    * Método para recuperar os lançamentos positivos de um determinado usuário
    */
    async recuperarEntradas(id: number) {
        const entradas = await getManager().find(Lancamento, {
            where: {
                usuario: id,
                valor: MoreThanOrEqual(0)
            }
        });
        return entradas;
    }

    /**
    * Método para recuperar os lançamentos positivos de um determinado usuário
    */
    async recuperarGastos(id: number) {
        const gastos = await getManager().find(Lancamento, {
            where: {
                usuario: id,
                valor: LessThan(0)
            }
        });
        return gastos;
    }
}