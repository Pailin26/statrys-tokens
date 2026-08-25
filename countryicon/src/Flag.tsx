import * as React from "react";
import { FLAG_CONTENT } from "./flags.web.generated";
import type { FlagCountry } from "./flag-countries.generated";

export type FlagProps = {
  country: FlagCountry;
  size?: number;
  className?: string;
};

// Web renderer for the flag set — Metro (React Native) resolves Flag.native.tsx
// instead of this file for the exact same import path, so app-ds never needs a
// separate import site. Every flag shares this one outer <svg>; only the inner
// content (rect + g + defs, looked up by country) differs.
export function Flag({ country, size = 24, className }: FlagProps) {
  const Content = FLAG_CONTENT[country];
  if (!Content) return null;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Content />
    </svg>
  );
}
