const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    // "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      // options: { docs: false, controls: false },
    },
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  reactOptions: {
    fastRefresh: true,
  },
  refs: {
    "@chakra-ui/react": { disable: true },
  },
  webpackFinal: (config) => {
    // config.module.rules[0].include.push("C:\\Users\\ckwon\\Desktop\\libraries")
    // console.log(config.module.rules[0])

    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/core": "@emotion/react",
      "emotion-theming": "@emotion/react",
    }

    config.resolve.plugins.push(new TsconfigPathsPlugin())
    return config
  },
}
