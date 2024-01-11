function validateCreateUserFields(user_info){
    const { name, lastname, email, phone } = user_info

    if(name == "" || name == null || lastname == "" || lastname == null || email == "" || email == null || phone == "" || phone == null){
        return false
    } else {
        return true
    }
}

module.exports = validateCreateUser

