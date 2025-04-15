
const User = require("../model/user.js");

const userController = {
    create: async (request, reponse) => {
        try {
            const { nome, email, senha } = request.body;

            const userCriado = await User.create({ nome, email, senha });

            return response.status(200).json({
                msg: "O User foi criado com sucesso",
                userCriado
            })
        } catch (error) {
            return response.status(500).json({
                msg: "Ocorreu um erro ao acessar a API"
            })
        }
    },
    update: async (request, reponse) => {
        try {
            const { id } = request.params;
            const { nome, email, senha } = request.body;

            if (!nome || !email || !senha) {
                return response.status(400).json({
                    msg: "Campos faltando"
                });
            }

            const userExiste = await User.finByPk(id);

            if (!userExiste) {
                return response.status(400).json({
                    msg: "User não encontrado"
                });
            }

            await User.update({
                nome, email, senha
            }, {
                where: {
                    id: id
                }
            });
            
            return response.status(200).json({
                msg: "User atualizado com sucesso"
            });

        } catch (error) {
            return response.status(500).json({
                msg: "Ocorreu um erro ao atualizar o User"
            })
        }
    },
    findAll: async (request, reponse) => {
        try {
            const user = await User.findAll();

            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({
                msg: "Ocorreu um erro interno ao buscar todos os users"
            })
        }
    },
    delete: async (request, reponse) => {
        try {
            const { id } = request.params;

            const existeUser = await User.finByPk(id);

            if (!existeUser) {
                return response.status(400).json({
                    msg:"User não foi encontrado"
                });
            }

            await User.detroy({
                where: {
                    id: id
                }
            });

            return response.status(200).json({
                msg: "User deletado com sucesso"
            });

        } catch (error) {
            return response.status(500).json({
                msg: "Ocorreu um erro interno ao deletar o user"
            })
        }
    },
    finByPk: async (request, reponse) => {
        try {
            const { id } = request.params;

            const userEncontrado = await User.finByPk(id);

            if (!userEncontrado) {
                return response.status(204).json({
                    msg: "User não encontrado"
                });
            }

            return response.status(200).json(userEncontrado);
        } catch (error) {
            return response.status(500).json({
                msg: "Ocorreu um erro interno ao buscar o user unico"
            });
        }
    }
}

module.exports = userController;