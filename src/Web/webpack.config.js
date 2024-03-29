const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const S3Plugin = require('webpack-s3-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const bundleOutputDir = './dist';

    return {
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        entry: {
            'app': './src/boot.tsx'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: path.resolve(__dirname, "./"), loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader?silent=true'] },
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader'}
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin('app.css'),
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./dist/vendor-manifest.json')
            }),
            new S3Plugin({
                s3Options: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: 'us-east-1'
                },
                s3UploadOptions: {
                    Bucket: 'infinitivity'
                },
                directory: bundleOutputDir
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
                ])
        ,
        devServer: {
            hot: true,
            // enable HMR on the server

            contentBase: path.resolve(__dirname, 'dist'),
            // match the output path

            publicPath: '/'
            // match the output `publicPath`
        }
    }
};