// Importa o módulo de conexão com o banco de dados
const connection = require('../config/connection')

// Definição do modelo User, que representa operações relacionadas a usuários
const User = {
    // Função para cadastrar um novo usuário na base de dados
    subscribeUser: async (name, lastname, email, phone) => {
        try {
            // Query SQL para inserir um novo usuário na tabela 'users'
            const query = 'INSERT INTO users (name_user, lastname_user, email_user, phone_user) VALUE (?, ?, ?, ?)'
            
            // Executa a query no banco de dados usando a conexão configurada
            const [result] = await connection.promise().query(query, [name, lastname, email, phone])

            // Log para debug e retorno do resultado
            console.log(result[0])
            return result[0];
        } catch (error) {
            // Log de erro em caso de falha
            console.log(error)
            throw error;
        }
    },

    // Função para obter todos os usuários da base de dados
    getAllUsers: async () => {
        try {
            // Query SQL para selecionar todos os usuários da tabela 'users'
            const query = 'SELECT * FROM users';
            
            // Executa a query no banco de dados usando a conexão configurada
            const result = await connection.promise().query(query)

            // Log para debug e retorno do resultado
            console.log(result[0])
            return result[0]
        } catch (error) {
            // Log de erro em caso de falha
            console.log(error)
            throw error;
        }
    },

    // Função para obter um usuário específico com base no ID
    getUserById: async (user_id) => {
        try {
            // Query SQL para selecionar um usuário com base no ID da tabela 'users'
            const query = 'SELECT * FROM users WHERE id_user = ?'
            
            // Executa a query no banco de dados usando a conexão configurada
            const result = await connection.promise().query(query, user_id)

            // Logs para indicar sucesso e retorno do resultado
            console.log("Usuário encontrado com sucesso")
            console.log(result[0])

            return result[0]
        } catch (error) {
            // Log de erro em caso de falha
            console.log(error)
            throw error;
        }
    },

    // Função para remover um usuário com base no ID
    unsubscribeUserById: async (user_id) => {
        try {
            // Query SQL para excluir um usuário com base no ID da tabela 'users'
            const query = 'DELETE FROM users WHERE id_user = ?'
            
            // Executa a query no banco de dados usando a conexão configurada
            const result = await connection.promise().query(query, user_id)

            // Logs para indicar sucesso e retorno do resultado
            console.log("Usuário deletado com sucesso")
            console.log(result[0])
            return result[0]
        } catch (error) {
            // Log de erro em caso de falha
            console.log(error)
            throw error;
        }
    },

    // Função para atualizar informações de um usuário
    updateUser: async (user_info) => {
        const {
            user_id,
            name,
            lastname,
            email,
            phone
        } = user_info

        try {
            // Query SQL para atualizar informações de um usuário na tabela 'users'
            const query = 'UPDATE users SET name_user = ?, lastname_user = ?, email_user = ?, phone_user = ? WHERE id_user = ?'
            
            // Executa a query no banco de dados usando a conexão configurada
            const result = await connection.promise().query(query, [name, lastname, email, phone, user_id])
            return result[0]
        } catch (error) {
            // Log de erro em caso de falha
            console.log(error)
            throw error;
        }
    }
}

// Exporta o modelo User para ser utilizado em outros arquivos
module.exports = User;