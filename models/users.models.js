const connection = require("../db/connection")
const { checkExists } = require("../db/seeds/utils")

exports.findUsers = () => {
    return connection.query(`SELECT * FROM users`)
    .then(result=> result.rows)
}

exports.addUser = (username, name, url, id) => {
    
    return connection.query(`INSERT INTO users (username, name, avatar_url, id) VALUES ($1, $2, $3, $4) RETURNING *;`, [username, name, url, id])
    .then(res => res.rows[0])
}

exports.findUser = async (username) => {
    await checkExists('users', 'username', [username])
    return connection.query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then(res => res.rows[0])
}