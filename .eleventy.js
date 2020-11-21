// Transforms
const htmlMinTransform = require('./site/transforms/html-min-transform.js');
const CleanCSS = require('clean-css');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (config) => {
	if (isProduction) {
		config.addTransform('htmlmin', htmlMinTransform);
	}

	config.addFilter('cssmin', function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	config.addPassthroughCopy('./src/assets/');

	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'site',
			output: 'dist',
		},
	};
};
