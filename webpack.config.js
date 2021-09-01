var path = require("path");
// dotenv는 nodejs 런타임에서 사용하게끔 설계되었기 때문에
// 웹 브라우저 런타임에서는 사용 불가
// 하지만 webpack.config.js 파일은 브라우저 런타임이 아니라 nodeJS위에서 실행되기 때문에
// webpack.config.js 내부에서는 dotenv 라이브러리를 사용할 수 있다.
require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },
  target: "node",
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      APIKEY: JSON.stringify(process.env.APIKEY),
      AUTHDOMAIN: JSON.stringify(process.env.AUTHDOMAIN),
      PROJECTID: JSON.stringify(process.env.PROJECTID),
      STORAGEBUCKET: JSON.stringify(process.env.STORAGEBUCKET),
      MESSAGINGSENDERID: JSON.stringify(process.env.MESSAGINGSENDERID),
      APPID: JSON.stringify(process.env.APPID),
    }),
  ],
};
