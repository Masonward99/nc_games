const connection = require("../db/connection");

exports.findReviewById = (id) => {
    const idArray = [id];
    return connection.query(`SELECT * FROM reviews WHERE review_id = $1`, idArray)
        .then(result => {
            let review = result.rows[0];
            if (!review) {
                return Promise.reject({
                    status: 404,
                    msg:`no review found with id ${id}`
                })
            }
            return review;
        })
}