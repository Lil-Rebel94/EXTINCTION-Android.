import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const match = html.match(/<script>([\\s\\S]*?)<\\/script>/);
assert.ok(match, "standalone inline script exists");
const source = match[1];
new vm.Script(source, { filename: "index.html:inline-script" });

const handlers = new Map();
const elements = new Map();
const noop = () => {};
const gradient = { addColorStop: noop };
const context2d = new Proxy({
  createLinearGradient: () => gradient,
  createRadialGradient: () => gradient
}, {
  get(target, key) { return key in target ? target[key] : noop; },
  set(target, key, value) { target[key] = value; return true; }
});

function element(id) {
  if (!elements.has(id)) {
    elements.set(id, {
      id, textContent: "", style: {}, width: 0, height: 0,
      addEventListener(type, callback) { handlers.set(id + ":" + type, callback); },
      getContext() { return context2d; },
      click() { handlers.get(id + ":click")?.(); }
    });
  }
  return elements.get(id);
}

const frameQueue = [];
const windowStub = {
  devicePixelRatio: 1,
  addEventListener(type, callback) { handlers.set("window:" + type, callback); }
};
const sandbox = {
  window: windowStub,
  document: { getElementById: element },
  innerWidth: 1280,
  innerHeight: 720,
  requestAnimationFrame(callback) { frameQueue.push(callback); },
  Math,
  console
};

vm.runInNewContext(source, sandbox, { timeout: 2000 });
function step(timestamp) {
  const callback = frameQueue.shift();
  assert.ok(callback, "animation frame was scheduled");
  callback(timestamp);
}

step(0);
for (let i = 1; i <= 600; i++) step(i * 50);

const status = element("status").textContent;
assert.match(status, /HERD (FORAGING|MOVING|ALERT|RESTING)/);
assert.match(status, /REX (PATROLLING|SCANNING|RESTING)/);
assert.match(status, /BRACH (BROWSING|MOVING|RESTING)/);

element("cycle").click();
assert.match(element("clock").textContent, /NIGHT/);
element("storm").click();
assert.equal(element("weather").textContent, "TROPICAL RAIN");
element("pause").click();
assert.equal(element("pause").textContent, "Resume");
const frozenStatus = element("status").textContent;
for (let i = 601; i <= 620; i++) step(i * 50);
assert.equal(element("status").textContent, frozenStatus, "paused simulation status stays frozen");
element("pause").click();
assert.equal(element("pause").textContent, "Pause");
handlers.get("world:pointerdown")?.();
assert.match(element("world").style.transform, /scale\\(/);

console.log("PASS: inline script parses");
console.log("PASS: 30 seconds of mocked animation frames run without runtime errors");
console.log("PASS: autonomous herd, rex and brach activity states are exposed");
console.log("PASS: day/night, rain, pause/resume and camera controls respond");
