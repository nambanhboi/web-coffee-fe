const path = require('path');

module.exports = {
  // Đường dẫn đến thư mục gốc của dự án
  context: path.resolve(__dirname, 'src'),

  // Điểm khởi đầu của ứng dụng của bạn
  entry: './index.js',

  // Địa chỉ và tên của file bundle đầu ra
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Các module và loaders để xử lý các loại file khác nhau
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Các rules khác cho các loại file khác
    ],
  },

  // Các cài đặt khác của webpack
  // Ví dụ: cài đặt devServer để chạy webpack dev server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },

  // Các plugins và cài đặt khác nếu cần
  // Ví dụ: HtmlWebpackPlugin để tạo file HTML tự động
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //   }),
  // ],
};
