import env from "./index";

console.log("Hello World");
console.log("NODE_ENV", env.get("string", "NODE_ENV"));
console.log("BUILD_NUMBER", env.get("number", "BUILD_NUMBER"));
console.log("VERSION", env.get("string", "VERSION"));
console.log("AWESOME", env.get("boolean", "AWESOME"));
console.log(
  "AWESOME_ARR",
  env.get("boolean", ["UNKNOWN", "EXT_AWESOME", "AWESOME"])
);
console.log("UNKNOWN", env.get("boolean", "UNKNOWN", false));
console.log("UNKNOWN_ARR", env.get("boolean", ["UNKNOWN1", "UNKNOWN2"]), false);
