const path = require("path");
const isDevelopment = process.env.NODE_ENV === "development";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s(a|c)ss$/,
        oneOf: [
          {
            test: /\.module\.s(a|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { modules: true }
              },
              "sass-loader"
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css"
    })
  ]
};
