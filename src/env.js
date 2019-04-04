const path = require('path');

module.exports = {
    port: process.env.PORT || 3000,
    publicPath: path.resolve(__dirname, './public')
}