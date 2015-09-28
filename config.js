var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var config = {
    src: 'src',
    dist: 'dist',
		scriptName: 'app.js',
    isProd: process.argv.indexOf('dev') == -1,
		scriptsIncluded: path.join('src', 'scripts', 'include.yaml'),
    getScripts: function() {
        return yaml.load(fs.readFileSync(config.scriptsIncluded, 'utf-8'))
            .map(function(scriptSrc) {
                return path.join(config.src, scriptSrc);
            });
    }
};

module.exports = config;
