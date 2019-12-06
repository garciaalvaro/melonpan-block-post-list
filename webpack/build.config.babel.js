import { name, version, description, homepage } from "../package.json";
import { BannerPlugin, DefinePlugin } from "webpack";
import TerserJSPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import nib from "nib";
import path from "path";

export default {
	entry: path.join(__dirname, "../src/index.ts"),
	output: {
		path: path.join(__dirname, "../build"),
		filename: `${name}.js`
	},
	resolve: {
		alias: {
			Components: path.join(__dirname, "../src/Components"),
			utils: path.join(__dirname, "../src/utils")
		}
	},
	externals: {
		lodash: "lodash",
		react: "React",
		"react-dom": "ReactDOM",
		"@wordpress/blocks": "wp.blocks",
		"@wordpress/data": "wp.data",
		"@wordpress/element": "wp.element",
		"@wordpress/i18n": "wp.i18n"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				resolve: {
					extensions: [".tsx", ".ts", ".js", ".jsx"]
				}
			},
			{
				test: /\.(css|styl)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "stylus-loader",
						options: {
							use: [nib()],
							import: [
								"~nib/index.styl",
								path.join(__dirname, "../src/utils/data/stylus_variables.styl")
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			l: (...args) => console.log(...args)
		}),
		new MiniCssExtractPlugin({
			filename: `${name}.css`
		}),
		new BannerPlugin({
			banner: [
				`/*! ${description} | ${version} | ${homepage} */`,
				"/*! uuid | https://github.com/kelektiv/node-uuid | MIT License */",
				`/*! react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License */`,
				`/*! immer | https://github.com/mweststrate/immer | Michel Weststrate | MIT License */`,
				`/*! React-Select | https://github.com/JedWatson/react-select | Jed Watson | MIT License */`,
				`/*! array-move | https://github.com/sindresorhus/array-move | Sindre Sorhus | MIT License */`
			].join(""),
			raw: true,
			include: new RegExp(/.*?\.js/)
		}),
		new BannerPlugin({
			banner: `${description} | ${version} | ${homepage}`,
			include: new RegExp(/.*?\.css/)
		})
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	}
};
