import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scriptStart = html.indexOf("<script>");
const scriptEnd = html.indexOf("</script>", scriptStart);
assert.ok(scriptStart >= 0 && scriptEnd > scriptStart, "standalone inline script exists");
const source = html.slice(scriptStart + 8, scriptEnd);
new vm.Script(source, { filename: "index.html:inline-script" });

function boot(webglMode) {
  const handlers = new Map();
  const elements = new Map();
  const frameQueue = [];
  const noop = () => {};
  const gradient = { addColorStop: noop };
  const context2d = new Proxy({
    createLinearGradient: () => gradient,
    createRadialGradient: () => gradient
  }, {
    get(target, key) { return key in target ? target[key] : noop; },
    set(target, key, value) { target[key] = value; return true; }
  });
  let contextReleased = false;
  const glContext = {
    getExtension(name) {
      return name === "WEBGL_lose_context"
        ? { loseContext() { contextReleased = true; } }
        : null;
    }
  };

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

  const document = {
    getElementById: element,
    createElement(tag) {
      assert.equal(tag, "canvas");
      return {
        getContext(type) {
          if (webglMode === "webgl2" && type === "webgl2") return glContext;
          if (webglMode === "webgl1" && type === "webgl") return glContext;
          return null;
        }
      };
    }
  };
  const windowStub = {
    devicePixelRatio: 1,
    addEventListener(type, callback) { handlers.set("window:" + type, callback); }
  };
  const sandbox = {
    window: windowStub,
    document,
    innerWidth: 1280,
    innerHeight: 720,
    requestAnimationFrame(callback) { frameQueue.push(callback); },
    Math,
    console
  };

  vm.runInNewContext(source, sandbox, { timeout: 2000 });
  return {
    handlers, elements, frameQueue,
    contextWasReleased: () => contextReleased,
    step(timestamp) {
      const callback = frameQueue.shift();
      assert.ok(callback, "animation frame was scheduled");
      callback(timestamp);
    }
  };
}

const runtime = boot("webgl1");
assert.equal(runtime.elements.get("graphics").textContent, "WEBGL1 DETECTED · 2D ACTIVE");
assert.ok(runtime.contextWasReleased(), "temporary WebGL probe context is released");
runtime.step(0);
for (let i = 1; i <= 600; i++) runtime.step(i * 50);

const status = runtime.elements.get("status").textContent;
assert.ok(status.startsWith("HERD "), "herd activity is visible");
assert.ok(status.includes(" · REX "), "T. rex activity is visible");
assert.ok(status.includes(" · BRACH "), "Brachiosaurus activity is visible");

runtime.elements.get("cycle").click();
assert.ok(runtime.elements.get("clock").textContent.includes("NIGHT"), "night control responds");
runtime.elements.get("storm").click();
assert.equal(runtime.elements.get("weather").textContent, "TROPICAL RAIN");
runtime.elements.get("pause").click();
assert.equal(runtime.elements.get("pause").textContent, "Resume");
const frozenStatus = runtime.elements.get("status").textContent;
for (let i = 601; i <= 620; i++) runtime.step(i * 50);
assert.equal(runtime.elements.get("status").textContent, frozenStatus, "paused simulation status stays frozen");
runtime.elements.get("pause").click();
assert.equal(runtime.elements.get("pause").textContent, "Pause");
runtime.handlers.get("world:pointerdown")?.();
assert.ok(runtime.elements.get("world").style.transform.startsWith("scale("), "camera control responds");

const webgl2 = boot("webgl2");
assert.equal(webgl2.elements.get("graphics").textContent, "WEBGL2 DETECTED · 2D ACTIVE");
const canvasOnly = boot("none");
assert.equal(canvasOnly.elements.get("graphics").textContent, "CANVAS 2D ONLY");

console.log("PASS: inline script parses");
console.log("PASS: WebGL2, WebGL1 and Canvas-only capability paths are distinguished");
console.log("PASS: 30 seconds of mocked animation frames run without runtime errors");
console.log("PASS: autonomous herd, rex and brach activity states are exposed");
console.log("PASS: day/night, rain, pause/resume and camera controls respond");
