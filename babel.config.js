module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-env"],
  plugins: [
    ["@babel/proposal-decorators", { legacy: true }],
    ["@babel/proposal-class-properties", { loose: true }],
    ["@vue/babel-plugin-jsx"]
  ]
};
