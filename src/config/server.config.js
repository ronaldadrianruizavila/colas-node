const express = require('express');
const { publicPath } = require('../env');

module.exports = app => {

    app.use(express.static(publicPath))
    return app;
}