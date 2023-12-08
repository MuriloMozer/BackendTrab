import Fornecedor from "../modelo/fornecedor.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class FornecedorDAO{
    async gravar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const sql = `INSERT INTO fornecedor(forn_cnpj, forn_nome, forn_endereco, forn_bairro,
                forn_cidade, forn_uf, foprn_cep) VALUES(?,?,?,?,?,?,?)`;
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const sql = `UPDATE fornecedor SET forn_nome = ?, forn_endereco = ?, forn_bairro = ?,
            forn_cidade = ?, forn_uf = ?, forn_cep = ? WHERE forn_cnpj = ?`; 
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.bairro, fornecedor.cidade,
            fornecedor.uf, fornecedor.cep, fornecedor.cnpj];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const sql = "DELETE FROM fornecedor WHERE forn_cnpj = ?"; 
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }
        const conexao = await conectar();
        let listaFornecedores = [];
        // Verifica se o termo parece ser um CNPJ
        const isCNPJ = /^[0-9]{14}$/.test(termo);

        if (isCNPJ){
            // Consulta pelo CNPJ do fornecedor
            const sql = `SELECT f.cnpj, f.nome, f.endereco, f.bairro, f.cidade, f.uf, f.cep FROM fornecedor f WHERE f.cnpj = ?
                        ORDER BY f.nome`;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const fornecedor = new Fornecedor(registro.cnpj, registro.nome, registro.endereco,
                                                  registro.bairro, registro.cidade, registro.uf, registro.cep);
                listaFornecedores.push(fornecedor);
            }
        } else {
            // Consulta pelo nome do fornecedor
            const sql = `SELECT f.cnpj, f.nome, f.endereco, f.bairro, f.cidade, f.uf, f.cep FROM fornecedor f WHERE f.nome LIKE ?
                        ORDER BY f.nome`;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const fornecedor = new Fornecedor(registro.cnpj, registro.nome, registro.endereco,
                                                  registro.bairro, registro.cidade, registro.uf, registro.cep);
                listaFornecedores.push(fornecedor);
            }
        }  
        return listaFornecedores;
    }
    
}