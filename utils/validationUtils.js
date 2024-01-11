// Função para validar os campos necessários ao criar um novo usuário
function validateCreateUserFields(user_info) {
    // Extrai as informações relevantes do objeto user_info
    const { name, lastname, email, phone } = user_info;

    // Verifica se algum dos campos obrigatórios está vazio ou nulo
    if (name === "" || name === null || lastname === "" || lastname === null || email === "" || email === null || phone === "" || phone === null) {
        // Retorna falso se algum campo estiver vazio ou nulo
        return false;
    } else {
        // Retorna verdadeiro se todos os campos obrigatórios estiverem preenchidos
        return true;
    }
}

// Exporta a função de validação para ser utilizada em outros arquivos
module.exports = validateCreateUserFields;