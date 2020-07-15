const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
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