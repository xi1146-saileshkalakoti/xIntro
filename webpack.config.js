const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */


module.exports = {
	entry: './src/main.js',
	devtool: 'inline-source-map',
	output: {
		chunkFilename: '[name].[chunkhash].js',
		filename: '[name].[chunkhash].js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader?runtime=handlebars/runtime',
				query: { inlineRequires: '\/assets\/images\/' }
			},
			{
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},

				test: /\.js$/
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader"
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: "file-loader"
			},
			{
				test: /\.(scss|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: devMode,
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						},
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			jquery: "jquery/src/jquery"
		}
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.hbs',
			title: 'xInduction',
			hash: true,
			xhtml: true,
			favicon: "./src/assets/favicon.ico",
			meta: {
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
			}
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
		new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'allAssets' // i know it's bad but need to load all the resources to have a good UX for
		})
	],
	optimization: {
		minimizer: [new UglifyJSPlugin()],
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'all',
			minChunks: 1,
			maxSize: 30000,
			minSize: 30000,
			name: true
		}
	}
};
