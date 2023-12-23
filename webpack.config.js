const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js',
		//animation: './src/js/animation.js'
		// about: './src/js/about.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
