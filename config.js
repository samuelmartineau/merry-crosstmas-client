var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var config = {
    src: 'src',
    dist: 'dist',
    scriptName: 'app.js',
    test: {
        directory: 'tests/',
        files: '*.js'
    },
    isProd: process.argv.indexOf('dev') == -1
};

module.exports = config;
