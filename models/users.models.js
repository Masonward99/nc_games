const connection = require("../db/connection")

exports.findUsers = () => {
    return connection.query(`SELECT * FROM users`)
    .then(result=> result.rows)
}

exports.addUser = (username, name, url)=>{
    return connection.query(`INSERT INTO users (username, name, avatar_url) VALUES ($1, $2, $3) RETURNING *;`, [username, name, url])
    .then(res => res.rows[0])
}