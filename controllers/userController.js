const UserModel = require('../models/userModel')
const validateCreateUserFields = require('../utils/validationUtils')

const userController = {
    subscribeUser: async (req, res) => {
        if (validateCreateUserFields(req.body)) {
            const {
                name,
                lastname,
                email,
                phone
            } = req.body

            try {
                const newUser = await UserModel.subscribeUser(name, lastname, email, phone)
                const response = {
                    error: false,
                    mensagem: "Usuário cadastrado com sucesso!",
                    user: newUser
                }

                console.log("Usuário criado com sucesso! " + newUser)
                res.status(201).json(response)
            } catch (error) {
                const response = {
                    error: true,
                    mensagem: "Erro ao cadastrar novo usuário!"
                }

                console.log("Erro ao criar novo usuário: " + error)
                res.status(500).json(response)
            }
        } else {
            const response = {
                error: true,
                mensagem: "Preencha todos os dados do usuário!"
            }
            res.status(404).json(response)
        }

    },
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await UserModel.getAllUsers()
            const response = {
                error: false,
                mensagem: "Usuários encontrados com sucesso!",
                users: allUsers
            }

            console.log("Usuários encontrados com sucesso!" + allUsers)
            res.status(200).json(response)
        } catch (error) {
            const response = {
                error: true,
                mensagem: "Erro ao buscar usuários!"
            }

            console.log("Erro ao buscar usuários: " + error)
            res.status(500).json(response)
        }
    },
    getUserById: async (req, res) => {
        const {
            user_id
        } = req.body
        try {
            const user = await UserModel.getUserById(user_id)
            const response = {
                error: false,
                mensagem: "Usuário encontrado com sucesso!",
                user: user[0]
            }

            res.status(200).json(response)
        } catch (error) {
            const response = {
                error: true,
                mensagem: "Erro ao buscar o usuário de id: " + user_id
            }

            console.log("Erro ao buscar usuário: " + error)
            res.status(500).json(response)
        }
    },
    unsubscribeUserById: async (req, res) => {
        const {
            user_id
        } = req.body
        try {
            const userDeleted = await UserModel.unsubscribeUserById(user_id)
            if (userDeleted.affectedRows > 0) {
                const response = {
                    error: false,
                    mensagem: "Usuário deletado com sucesso!",
                    userDeleted: userDeleted[0]
                }
                res.status(200).json(response)
            } else {
                const response = {
                    error: true,
                    mensagem: "Usuário não encontrado"
                }
                res.status(404).json(response)
            }

        } catch (error) {
            const response = {
                error: true,
                mensagem: "Erro ao deletar o usuário de id: " + user_id
            }

            console.log("Erro ao deletar usuário: " + error)
            res.status(500).json(response)
        }
    },
    updateUser: async (req, res) => {
        const user_info = req.body
        try {
            const userUpdated = await UserModel.updateUser(user_info)

            if (userUpdated.affectedRows > 0) {
                const response = {
                    error: false,
                    mensagem: "Usuário atualizado com sucesso!"
                }
                console.log(userUpdated)
                res.status(200).json(response)
            } else {
                const response = {
                    error: true,
                    mensagem: "Houve um erro ao atualizar o usuário"
                }
                console.log(userUpdated)
                res.status(404).json(response)
            }
        } catch (error) {
            const response = {
                error: true,
                mensagem: "Erro ao atualizar o usuário"
            }

            console.log("Erro ao deletar usuário: " + error)
            res.status(500).json(response)
        }
    }
}

module.exports = userController;