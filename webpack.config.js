const webpack = require('webpack')
// const CompressionPlugin = require("compression-webpack-plugin")
const AssetsInstallerPlugin = require('@hscmap/assets-installer-plugin')


module.exports = {
    entry: [
        './src/main.ts',
        'file-loader?name=index.html!./src/index.html',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                    }
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
    },
    plugins: [
        new AssetsInstallerPlugin({
            files: {'@hscmap/stellar-globe': '{*.json,*._json,*.worker.js}'}
        }),
        // new CompressionPlugin(),
    ]
}


if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    ])
}