const connection = require("../db/connection")

exports.findUsers = () => {
    return connection.query(`SELECT * FROM users`)
    .then(result=> result.rows)
}