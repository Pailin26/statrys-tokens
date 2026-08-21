const StyleDictionary = require("style-dictionary");
const config = require("./config.json");

// dist/tokens.js is the *native* (React Native) output — RN's StyleSheet
// needs plain numbers for dimensions/font sizes ("13px" is not a valid
// paddingHorizontal), unlike CSS which needs the unit kept. Strip it here
// so every future component gets numeric values for free, instead of each
// one hand-parsing px strings in its own Button.styles.ts-equivalent.
StyleDictionary.registerTransform({
  name: "size/native",
  type: "value",
  matcher: (token) =>
    (token.type === "dimension" || token.type === "fontSize") &&
    typeof token.value === "string" &&
    /px$/.test(token.value),
  transformer: (token) => parseFloat(token.value),
});

// CSS font stacks ("GT Walsheim LC", "Helvetica Neue", ...) aren't valid for
// RN's fontFamily, which takes exactly one bare name and has no fallback-list
// concept — take just the first, unquoted.
StyleDictionary.registerTransform({
  name: "fontFamily/native",
  type: "value",
  matcher: (token) => token.type === "fontFamily" && typeof token.value === "string" && token.value.includes(","),
  transformer: (token) => token.value.split(",")[0].trim().replace(/^["']|["']$/g, ""),
});

config.platforms.js.transforms = [...StyleDictionary.transformGroup.js, "size/native", "fontFamily/native"];

StyleDictionary.extend(config).buildAllPlatforms();
