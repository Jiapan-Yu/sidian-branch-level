var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  plugins: [new HtmlWebpackPlugin({
    template: './src/template.html'
  })],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.otf$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 8192, // 注释此行就可以用 Alibaba-PuHuiTi-Bold.otf 等字体文件
            },
          },
        ]
      },
    ]
  }
}