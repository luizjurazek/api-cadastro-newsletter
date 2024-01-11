// Importa o modelo de usuário para interagir com o banco de dados
const UserModel = require('../models/userModel')

// Importa a função de validação para os campos de criação de usuário
const validateCreateUserFields = require('../utils/validationUtils')

// Controlador de usuário com funções relacionadas às operações
const userController = {
    // Função para cadastrar um novo usuário
    subscribeUser: async (req, res) => {
        // Valida os campos do formulário antes de prosseguir
        if (validateCreateUserFields(req.body)) {
            // Extrai os dados do corpo da requisição
            const { name, lastname, email, phone } = req.body

            try {
                // Chama a função do modelo para cadastrar um novo usuário
                const newUser = await UserModel.subscribeUser(name, lastname, email, phone)

                // Prepara a resposta de sucesso
                const response = {
                    error: false,
                    mensagem: "Usuário cadastrado com sucesso!",
                    user: newUser
                }

                // Log de sucesso e envio da resposta
                console.log("Usuário criado com sucesso! " + newUser)
                res.status(201).json(response)
            } catch (error) {
                // Prepara a resposta de erro
                const response = {
                    error: true,
                    mensagem: "Erro ao cadastrar novo usuário!"
                }

                // Log de erro e envio da resposta
                console.log("Erro ao criar novo usuário: " + error)
                res.status(500).json(response)
            }
        } else {
            // Resposta em caso de campos inválidos
            const response = {
                error: true,
                mensagem: "Preencha todos os dados do usuário!"
            }
            res.status(404).json(response)
        }
    },

    // Função para obter todos os usuários
    getAllUsers: async (req, res) => {
        try {
            // Chama a função do modelo para obter todos os usuários
            const allUsers = await UserModel.getAllUsers()

            // Prepara a resposta de sucesso
            const response = {
                error: false,
                mensagem: "Usuários encontrados com sucesso!",
                users: allUsers
            }

            // Log de sucesso e envio da resposta
            console.log("Usuários encontrados com sucesso!" + allUsers)
            res.status(200).json(response)
        } catch (error) {
            // Prepara a resposta de erro
            const response = {
                error: true,
                mensagem: "Erro ao buscar usuários!"
            }

            // Log de erro e envio da resposta
            console.log("Erro ao buscar usuários: " + error)
            res.status(500).json(response)
        }
    },

    // Função para obter um usuário específico com base no ID
    getUserById: async (req, res) => {
        // Extrai o ID do corpo da requisição
        const { user_id } = req.body
        try {
            // Chama a função do modelo para obter um usuário pelo ID
            const user = await UserModel.getUserById(user_id)

            // Prepara a resposta de sucesso
            const response = {
                error: false,
                mensagem: "Usuário encontrado com sucesso!",
                user: user[0]
            }

            // Envio da resposta
            res.status(200).json(response)
        } catch (error) {
            // Prepara a resposta de erro
            const response = {
                error: true,
                mensagem: "Erro ao buscar o usuário de id: " + user_id
            }

            // Log de erro e envio da resposta
            console.log("Erro ao buscar usuário: " + error)
            res.status(500).json(response)
        }
    },

    // Função para remover um usuário com base no ID
    unsubscribeUserById: async (req, res) => {
        // Extrai o ID do corpo da requisição
        const { user_id } = req.body
        try {
            // Chama a função do modelo para remover um usuário pelo ID
            const userDeleted = await UserModel.unsubscribeUserById(user_id)

            // Verifica se o usuário foi removido com sucesso
            if (userDeleted.affectedRows > 0) {
                // Prepara a resposta de sucesso
                const response = {
                    error: false,
                    mensagem: "Usuário deletado com sucesso!",
                    userDeleted: userDeleted[0]
                }
                res.status(200).json(response)
            } else {
                // Prepara a resposta de erro caso o usuário não seja encontrado
                const response = {
                    error: true,
                    mensagem: "Usuário não encontrado"
                }
                res.status(404).json(response)
            }

        } catch (error) {
            // Prepara a resposta de erro
            const response = {
                error: true,
                mensagem: "Erro ao deletar o usuário de id: " + user_id
            }

            // Log de erro e envio da resposta
            console.log("Erro ao deletar usuário: " + error)
            res.status(500).json(response)
        }
    },

    // Função para atualizar informações de um usuário
    updateUser: async (req, res) => {
        // Extrai as informações do corpo da requisição
        const user_info = req.body
        try {
            // Chama a função do modelo para atualizar as informações do usuário
            const userUpdated = await UserModel.updateUser(user_info)

            // Verifica se o usuário foi atualizado com sucesso
            if (userUpdated.affectedRows > 0) {
                // Prepara a resposta de sucesso
                const response = {
                    error: false,
                    mensagem: "Usuário atualizado com sucesso!"
                }
                console.log(userUpdated)
                res.status(200).json(response)
            } else {
                // Prepara a resposta de erro caso o usuário não seja encontrado
                const response = {
                    error: true,
                    mensagem: "Houve um erro ao atualizar o usuário"
                }
                console.log(userUpdated)
                res.status(404).json(response)
            }
        } catch (error) {
            // Prepara a resposta de erro
            const response = {
                error: true,
                mensagem: "Erro ao atualizar o usuário"
            }

            // Log de erro e envio da resposta
            console.log("Erro ao deletar usuário: " + error)
            res.status(500).json(response)
        }
    }
}

// Exporta o controlador de usuário para ser utilizado em outros arquivos
module.exports = userController;