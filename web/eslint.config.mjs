import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // We resolve Lucide icons by name from a *static* registry (`getIcon`),
      // then render the returned component (`const Icon = getIcon(name); <Icon/>`).
      // These are stable, pre-existing component references — nothing is created
      // during render — so this rule is a false positive for that intentional pattern.
      "react-hooks/static-components": "off",
    },
  },
]);

export default eslintConfig;
