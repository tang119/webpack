const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
        //多入口文件
        entry: {
            app: './src/index.js'
        },
        devtool: 'inline-source-map',//调试工具
        devServer: {
            contentBase: './dist',
            //下载的webpack-dev-server，可以提供简单的服务器以上配置告知
            // webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
            hot: true   //热加载
        },
        plugins: [
            //new CleanWebpackPlugin(['dist']),//下载的clean-webpack-plugin插件，清理 /dist 文件夹
            /*new HtmlWebpackPlugin({
                title: 'Production'
            }),*///生成新的index.html文件
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            filename: 'bundle.js',
            filename: '[name].bundle.js',//多入口文件
            path: path.resolve(__dirname, 'dist')
        },
        // 模块对象
        module: {
            // 规则
            rules: [
                {
                    // 正则匹配所有以.css结尾的文件
                    test: /\.css$/,
                    // 使用css-loader和style-loader依次对css文件进行处理
                    // 按照数组中从后往前的顺序
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        }
};
