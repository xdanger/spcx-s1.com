import { defineConfig, globalIgnores } from "eslint/config";
import {
  baseConfig,
  commonIgnorePatterns,
  createTypeScriptConfig,
} from "../../eslint.config.mjs";

export default defineConfig([
  globalIgnores([...commonIgnorePatterns, ".next", "out"]),
  ...baseConfig,
  createTypeScriptConfig(import.meta.dirname, "browser", 2022),
]);
