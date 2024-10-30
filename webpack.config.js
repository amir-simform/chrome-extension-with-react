const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: {
        popup: './src/popup.js',
        background: './src/background.js',
        content: './src/content.js',
        devtool: './src/devtool.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build-extension'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                    },
                },
            ],
        }),
        new CleanWebpackPlugin()
    ],
};
