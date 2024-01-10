const connection = require('../config/connection')

const User = {
    createNewUser: async (name, lastname, email, phone) => {
        try {
            const query = 'INSERT INTO users (name_user, lastname_user, email_user, phone_user) VALUE (?, ?, ?, ?)'
            const [ result ] = await connection.promise().query(query, [name, lastname, email, phone])
            
            console.log(result[0])
            return result[0];
        } catch (error){
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
        } catch (error){
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
        }catch (error){
            console.log(error)
            throw error;
        }
    },
}


module.exports = User;