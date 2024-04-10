const { json } = require('express'); 
const db = require('../database/conection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {

            const sql = `SELECT 
            prd_id, prd_nome, prd_valor, prd_unidade, 
            prd_disponivel, prd_img, prd_img_destaque, 
            prd_descricao, prd_img_destaque 
            FROM produtos 
            WHERE prd_disponivel=1;`

            const produtos = await db.query(sql)
            const nItems = produtos[0].length;

            // throw new Error('Eu causei o erro!');
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: produtos[0],
                nItems
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
            
            const {prd_nome, prd_valor, prd_unidade, ptp_id ,prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao} = request.body;

            const sql = `INSERT INTO produtos
            (prd_nome, prd_valor, prd_unidade, ptp_id ,prd_disponivel, prd_img, prd_destaque, prd_descricao, prd_img_destaque)
            VALUES(?,?,?,?,?,?,?,?,?)`

            const values = [prd_nome, prd_valor, prd_unidade, ptp_id ,prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao];

            const execSql= await db.query(sql, values)

            const prd_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Produto cadastrado com sucesso.', 
                dados: prd_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async editarProdutos(request, response) {

        const {prd_nome, prd_valor, prd_unidade, ptp_id ,prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao} = request.body;

        const {prd_id} = request.params;

        const sql = `UPDATE produtos SET prd_nome=?, prd_valor=?, prd_unidade=?, ptp_id=?, prd_disponivel=?,
        prd_destaque=?, prd_img_destaque=?, prd_descricao=? Where prd_id=?;`

        const values = [prd_nome, prd_valor, prd_unidade, ptp_id ,prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao]

        const atualizadados = await db.query(sql, values);

        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: `O Produto ${prd_id} foi alterado com sucesso.`, 
                dados: atualizadados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 

    async apagarProdutos(request, response) {

        const {prd_id} = request.params;

        const sql =  `DELETE FROM produtos WHERE prd_id=?`

        const values = [prd_id]

        const excluir = await db.query(sql, values);

        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produtos ${prd_id} excluido com sucesso.`, 
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
}

