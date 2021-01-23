const {
	name: short_name,
	description: name,
	version,
	homepage,
} = require("./package.json");
const { BannerPlugin } = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = (env, { mode }) => {
	const is_production = mode === "production";
	const is_development = !is_production;

	const config = {
		watch: is_development,

		entry: path.resolve(__dirname, "src/entry.ts"),

		output: {
			path: path.resolve(__dirname, "dist"),
			filename: `${short_name}.js`,
		},

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},

		externals: {
			react: "React",
			"react-dom": "ReactDOM",
			"@wordpress/blocks": "wp.blocks",
			"@wordpress/core-data": "wp.coreData",
			"@wordpress/data": "wp.data",
			"@wordpress/element": "wp.element",
			"@wordpress/i18n": "wp.i18n",
		},

		module: { rules: [] },

		plugins: [],
	};

	config.module.rules.push({
		test: /\.tsx?$/,
		exclude: /node_modules/,
		loader: "babel-loader",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
	});

	config.module.rules.push({
		test: /\.(css|styl)$/,
		use: [
			MiniCssExtractPlugin.loader,

			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: is_production
							? "[hash:base64:5]"
							: "[name]-[local]-[hash:base64:2]",
					},
				},
			},

			{
				loader: "stylus-loader",
				options: {
					stylusOptions: {
						import: [
							"nib",
							path.join(__dirname, "src/utils/data/variables"),
						],
					},
				},
			},
		],
	});

	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: `${short_name}.css`,
		})
	);

	if (is_production) {
		config.plugins.push(
			new BannerPlugin({
				banner: `${name} v${version} | ${homepage}`,
				include: /\.css/,
			})
		);

		config.plugins.push(
			new BannerPlugin({
				banner: [
					`${name} v${version} | ${homepage}`,
					"uuid | https://github.com/kelektiv/node-uuid | MIT License",
					"react-tiny-popover | https://github.com/alexkatz/react-tiny-popover | Alex Katz | MIT License",
					"React-Select | https://github.com/JedWatson/react-select | Jed Watson | MIT License",
					"array-move | https://github.com/sindresorhus/array-move | Sindre Sorhus | MIT License",
				].join("\n"),
				include: /\.js/,
			})
		);

		config.optimization = {
			minimizer: [
				new CssMinimizerPlugin(),

				// As we are using a custom optimization, making use of
				// CssMinimizerPlugin, we also need to specify TerserPlugin
				new TerserPlugin({ extractComments: false }),
			],
		};
	}

	return config;
};
