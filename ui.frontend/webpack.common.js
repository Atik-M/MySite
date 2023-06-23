'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })],
    modules: ['node_modules'],
    alias: {
        Components: path.resolve(SOURCE_ROOT, 'components'),
        Utils: path.resolve(SOURCE_ROOT, 'utils'),
        Services: path.resolve(SOURCE_ROOT, 'services'),
        Vendor: path.resolve(SOURCE_ROOT, 'vendor'),
    }
};

module.exports = {
    resolve: resolve,
    entry: {
        'site-fonts': path.resolve(SOURCE_ROOT + '/site/main-fonts.js'),
        'site': path.resolve(SOURCE_ROOT + '/site/main.ts')
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'dependencies' ? 'clientlib-dependencies/[name].js' : 'clientlib-[name]/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'ts', 'tsx']
        }),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site/' },
                {
                    from: path.resolve(__dirname, SOURCE_ROOT + '/resources'),
                    to: './clientlib-site-fonts',
                    globOptions: {
                        ignore: ['**/img/**']
                    }
                },
                
                {
                    from: './node_modules/@fortawesome/fontawesome-free/webfonts',
                    to: './clientlib-site-fonts/font-awesome'
                }
            ]
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};
