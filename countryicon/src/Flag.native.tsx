import * as React from "react";
import Svg from "react-native-svg";
import { FLAG_CONTENT } from "./flags.native.generated";
import type { FlagCountry } from "./flag-countries.generated";

export type FlagProps = {
  country: FlagCountry;
  size?: number;
};

// React Native renderer — Metro's bundler prefers this file over Flag.tsx for
// any import of "./Flag" (or "@statrys/countryicon", which re-exports it), so
// app-ds and web-ds both just do `import { Flag } from "@statrys/countryicon"`.
export function Flag({ country, size = 24 }: FlagProps) {
  const Content = FLAG_CONTENT[country];
  if (!Content) return null;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Content />
    </Svg>
  );
}
