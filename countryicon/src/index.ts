// Ships as raw TS/TSX source (see package.json's main/types) — consumers'
// own bundler (Vite for web-ds, Metro for app-ds) compiles it directly, the
// same convention @statrys/web-ds itself uses. Metro's platform-extension
// resolution is what makes "./Flag" resolve to Flag.native.tsx instead of
// Flag.tsx when this package is bundled into a React Native app.
export { Flag } from "./Flag";
export type { FlagProps } from "./Flag";
export type { FlagCountry } from "./flag-countries.generated";
export { FLAG_COUNTRIES, FLAG_LABELS } from "./flag-countries.generated";
