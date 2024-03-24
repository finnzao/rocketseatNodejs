import { knex } from "../../../src/database";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await knex('meal').where('id', '=', id).del()

        if (result > 0) return;

        return new Error('Erro ao apagar o registro.')

    } catch (error) {
        return new Error('Erro ao consultar os registros');
    }

}