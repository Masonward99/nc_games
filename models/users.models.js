const connection = require("../db/connection")

exports.findUsers = () => {
    return connection.query(`SELECT * FROM users`)
    .then(result=> result.rows)
}

exports.addUser = (username, name, url, id)=>{
    return connection.query(`INSERT INTO users (username, name, avatar_url, id) VALUES ($1, $2, $3, $4) RETURNING *;`, [username, name, url, id])
    .then(res => res.rows[0])
}