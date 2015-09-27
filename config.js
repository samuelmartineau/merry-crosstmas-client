var config = {
	src: 'src',
	dist: 'dist',
  isProd: process.argv.indexOf('dev') == -1,
};

module.exports = config;
