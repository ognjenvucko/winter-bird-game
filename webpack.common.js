const path = require('path');
// eslint-disable-next-line
const CleanWebpackPlugin = require('clean-webpack-plugin');
// eslint-disable-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './main.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	externals: {
		p5: 'p5',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-2'],
					},
				},
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(svg)$/,
				use: {
					loader: 'svg-url-loader',
					options: {
						encoding: 'base64',
					},
				},
			},
			{
				test: /\.(mp3|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				minifyCSS: true,
			},
		}),
	],
	performance: {
		hints: false,
	},
};