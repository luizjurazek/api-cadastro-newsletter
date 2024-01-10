const UserModel = require('../models/userModel')

const userController = {
    createNewUser: async (req, res) => {
        const { name, lastname, email, phone } = req.body
        try {
            const newUser = await UserModel.createNewUser(name, lastname, email, phone)
            const response = {
                error: false,
                mensagem: "Usuário cadastrado com sucesso!",
                user: newUser
            }

            console.log("Usuário criado com sucesso! " + newUser)
            res.status(201).json(response)

        } catch (error){
            const response = {
                error: true,
                mensagem: "Erro ao cadastrar novo usuário!"
            }

            console.log("Erro ao criar novo usuário: " + error)
            res.status(500).json(response)
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
        } catch (error){
            const response = {
                error: true,
                mensagem: "Erro ao buscar usuários!"
            }

            console.log("Erro ao buscar usuários: " + error)
            res.status(500).json(response)
        }
    }
}

module.exports = userController;