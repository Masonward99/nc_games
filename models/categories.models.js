const connection = require("../db/connection")

exports.findCategories = () => {
    return connection.query(`SELECT * FROM categories`)
        .then(result =>result.rows)
}

exports.addCategory = (slug, desc) => {
  	if (!desc) {
    	return Promise.reject({status:400, msg:'bad request'});
    }
    return connection.query('INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *', [slug, desc])
    	.then(data=>data.rows[0])
}