// @ts-ignore
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  testPathIgnorePatterns: ["./dist", "/cypress"],
  setupFiles: ["<rootDir>/tests/test-setup.ts"]
};

export default config;
