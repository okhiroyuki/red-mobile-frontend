const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  publicPath: "",
  pluginOptions: {
    cordovaPath: "src-cordova",
  },
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
};
