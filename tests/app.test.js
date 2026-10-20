const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
test("server includes health endpoint and app name", () => {
  const s = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");
  assert.match(s, /\/api\/health/);
  assert.match(s, /Campus Event Board/);
});
test("homepage includes version placeholder and event cards", () => {
  const h = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.match(h, /__APP_VERSION__/);
  assert.match(h, /Tech Talk/);
  assert.match(h, /Project Showcase/);
});
