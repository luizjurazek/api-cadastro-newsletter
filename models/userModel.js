const connection = require('../config/connection')

const User = {
    subscribeUser: async (name, lastname, email, phone) => {
        try {
            const query = 'INSERT INTO users (name_user, lastname_user, email_user, phone_user) VALUE (?, ?, ?, ?)'
            const [result] = await connection.promise().query(query, [name, lastname, email, phone])

            console.log(result[0])
            return result[0];
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    getAllUsers: async () => {
        try {
            const query = 'SELECT * FROM users';
            const result = await connection.promise().query(query)

            console.log(result[0])
            return result[0]
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    getUserById: async (user_id) => {
        try {
            const query = 'SELECT * FROM users WHERE id_user = ?'
            const result = await connection.promise().query(query, user_id)

            console.log("Usuário encontrado com sucesso")
            console.log(result[0])

            return result[0]
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    unsubscribeUserById: async (user_id) => {
        try {
            const query = 'DELETE FROM users WHERE id_user = ?'
            const result = await connection.promise().query(query, user_id)

            console.log("Usuário deletado com sucesso")
            console.log(result[0])
            return result[0]
        } catch (error) {
            console.log(error)
            throw error;
        }
    },
    updateUser: async (user_info) => {
        const {
            user_id,
            name,
            lastname,
            email,
            phone
        } = user_info

        try {
            const query = 'UPDATE users SET name_user = ?, lastname_user = ?, email_user = ?, phone_user = ? WHERE id_user = ?'
            const result = await connection.promise().query(query, [name, lastname, email, phone, user_id])
            return result[0]
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}


module.exports = User;