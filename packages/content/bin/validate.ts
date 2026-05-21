#!/usr/bin/env tsx

import { validateContent } from "../src/validator";

const result = validateContent();

if (!result.ok) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(result, null, 2));
