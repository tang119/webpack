module.exports = {
    entry: './js/main.js',//入口文件
    output: {//出口文件
        filename: 'bundle.js',//文件名
        publicPath: './dist/',
    },
    module: {//模块加载器
        rules:[
            {
                test: /\.css$/,//匹配所有的css文件
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ],

    }
};
