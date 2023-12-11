const fs = require('fs/promises');

exports.findEndpoints = () => {
    return fs.readFile( "endpoints.json","utf8")
      .then((data) => JSON.parse(data));
}