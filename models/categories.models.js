const connection = require("../db/connection")

exports.findCategories = () => {
    return connection.query(`SELECT * FROM categories`)
        .then(result => result.rows)
}