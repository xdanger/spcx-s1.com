import { defineConfig, globalIgnores } from "eslint/config";
import {
  baseConfig,
  commonIgnorePatterns,
  createTypeScriptConfig,
} from "../../eslint.config.mjs";

export default defineConfig([
  globalIgnores([...commonIgnorePatterns]),
  ...baseConfig,
  createTypeScriptConfig(import.meta.dirname, "node", 2022),
]);
