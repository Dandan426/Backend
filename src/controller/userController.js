const User = require("../model/user");

const bcrypt = require("bcrypt"); // Importar o bcrypt

// JWT -> Token Aplicação
const jwt = require("jsonwebtoken"); // Importar o JWT
 
const userController = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                msg: "Campos inválidos"
            });
        }

        // SELECT * FROM User WHERE email = email;
        const userEncontrado = await User.findAll({
            where: {
                email
            }
        })

        if (!userEncontrado) {
            return res.status(403).json({
                msg: "E-mail ou Senha incorretos"
            })
        }

        const isCerto = await bcrypt.compare(senha, userEncontrado.senha)

        if (!isCerto) {
            return res.status(401).json({
                msg: "E-mail ou Senha incorreta"
            })
        }

        // payload -> Conteúdo de dentro do JWT
        // somente o necessário para a aplicação
        const payload = {
            id: userEncontrado.id,
            email: userEncontrado.email,
        }

        // token vai sobreviver por 1h
        // palavra secreta -> letty
        // dsad9d81nx78nsasyad0n1n7x1b10dxn98s

        // petermarcoaurelio -> base64
        const token = jwt.sign(payload, "palavra-secreta", {
            expiresIn: "1h"
        });

        return res.status(200).json({
            token,
            msg: "Usuario autenticado com sucesso!"
        });
        
    },

    create: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
 
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    msg: "Faltou enviar os campos"
                })  
            }

            // Senha criptografada
            const hashedSenha = await bcrypt.hash(senha, 10)
            
            // Salvar a senha criptografada
            await User.create({ nome, email, senha: hashedSenha })
 
 
            return res.status(201).json({
                msg: "User criado com sucesso"
            })
 
 
        } catch (error) {
            console.log(error)
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
            const userDeletado = await User.destroy({
                where: {
                    id
                }
            })
           
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
            const userAtualizado = await User.update({
                nome,
                email,
                senha
            }, {
                where: {
                    id
                }
            })
 
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
 