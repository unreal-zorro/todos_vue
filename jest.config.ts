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
  testEnvironment: "node",
  transform: {},
  testPathIgnorePatterns: ["./dist", "/cypress"]
};

export default config;
