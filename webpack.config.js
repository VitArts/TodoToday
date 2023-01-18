const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  renderer: {
    entry: './src/renderer/index.js',
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: './src/renderer/**/*.html', to: '[name]/[name][ext]' },
        ],
      }),
    ]
  },
  preload: {
    entry: './src/preload/index.js'
  },
  main: {
    entry: './src/main/index.js',
    module: {
      rules: [ {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            }
          },
        ],
      },]
    }
  }
}
