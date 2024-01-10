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
    },
    getUserById: async(req, res) => {
        const { user_id }= req.body
        try {
            const user = await UserModel.getUserById(user_id)
            const response = {
                error: false,
                mensagem: "Usuário encontrado com sucesso!",
                user: user[0]
            }

            res.status(200).json(response)
        } catch (error){
            const response = {
                error: true,
                mensagem: "Erro ao buscar o usuário de id: " + user_id
            }

            console.log("Erro ao buscar usuário: " + error)
            res.status(500).json(response)
        }
    },
    deleteUserById: async (req, res) => {
        const { user_id } = req.body
        try {
            const userDeleted = await UserModel.deleteUserById(user_id)
            if(userDeleted.affectedRows > 0){
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

        }catch (error){
            const response = {
                error: true,
                mensagem: "Erro ao deletar o usuário de id: " + user_id
            }

            console.log("Erro ao deletar usuário: " + error)
            res.status(500).json(response)
        }
    }
}

module.exports = userController;