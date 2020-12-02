const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = (_env) => ({
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devServer: {
    hot: true,
    port: 1234,
    contentBase: path.join(__dirname, "public"),
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" }), new ReactRefreshWebpackPlugin()],
})
