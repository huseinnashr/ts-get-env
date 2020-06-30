import env from "./index";

console.log("Hello World");
console.log(env.get("string", "NODE_ENV"));
console.log(env.get("number", "BUILD_NUMBER"));
console.log(env.get("string", "VERSION"));
console.log(env.get("boolean", "AWESOME"));
console.log(env.get("boolean", "UNKNOWN", false));
