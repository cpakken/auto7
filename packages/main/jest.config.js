const { pathsToModuleNameMapper } = require("ts-jest/utils")
const { compilerOptions } = require("./tsconfig.json")

/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "ts-jest",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  // setupFiles: ["./register-context.js"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      // babelConfig: {
      //   presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      //   plugins: ["require-context-hook"],
      // },
    },
  },
}
