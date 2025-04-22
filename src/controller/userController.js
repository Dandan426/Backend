const User = require("../model/user");
 
const userController = {
    create: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
 
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    msg: "Faltou enviar os campos"
                })  
            }
 
        User.create = await User.finByPk({ nome, email, senha })
 
 
            return res.status(201).json({
                msg: "User criado com sucesso"
            })
 
 
        } catch (error) {
            return res.status(500).json({
                msg: "Deu um erro no sistema"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
 
            if (!id) {
                return res.status(400).json({
                    msg:"Pendente o id"
                })
            }
 
            // Deletar o User
           
        } catch (error) {
           return res.status(500).json({
            msg: "Ocorreu um erro ao criar o User"
           })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
 
            if (!id || !nome || !email || !senha) {
                return res.status(400).json({
                    msg: "Pendente campos"
                })
            }
 
            // Atualizar User...
 
            return res.status(200).json({
                msg: "User atualizado com sucesso"
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Ocorreu um erro interno"
            })
        }
    },
    getAll: async (req, res) => {
        try {
            // Busca dos User
            const users = await User.findAll()
 
            return res.status(200).json({
                msg: "User encontrados",
                users
            })
           
        } catch (error) {
            return res.status(500).json({
                msg: "Ocorreu um erro interno"
            })
           
        }
    }
}
 
module.exports = userController;
 