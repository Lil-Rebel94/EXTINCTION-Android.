import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const scriptStart = html.indexOf("<script>");
const scriptEnd = html.indexOf("</script>", scriptStart);
assert.ok(scriptStart >= 0 && scriptEnd > scriptStart, "standalone inline script exists");
const source = html.slice(scriptStart + 8, scriptEnd);
new vm.Script(source, { filename: "index.html:inline-script" });

function boot(webglMode, failShader = false) {
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
  let gpuDrawCount = 0;
  const glContext = {
    VERTEX_SHADER:1, FRAGMENT_SHADER:2, COMPILE_STATUS:3, LINK_STATUS:4,
    ARRAY_BUFFER:5, STATIC_DRAW:6, FLOAT:7, TRIANGLE_STRIP:8,
    createShader(type) { return { type }; },
    shaderSource(shader, source) { shader.source = source; },
    compileShader(shader) { shader.compiled = true; },
    getShaderParameter() { return !failShader; },
    getShaderInfoLog() { return ""; },
    createProgram() { return {}; },
    attachShader() {}, linkProgram() {},
    getProgramParameter() { return true; },
    getProgramInfoLog() { return ""; },
    createBuffer() { return {}; }, bindBuffer() {}, bufferData() {},
    getAttribLocation() { return 0; }, getUniformLocation() { return {}; },
    viewport() {}, useProgram() {}, enableVertexAttribArray() {},
    vertexAttribPointer() {}, uniform1f() {},
    drawArrays() { gpuDrawCount++; }
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
  const testSource = source.replace("updateStatus();\nrequestAnimationFrame(tick);", "updateStatus();\nwindow.__terrariumDebug = { herd, rex, brach, feedingPatches, updateEcosystem };\nrequestAnimationFrame(tick);");
  const sandbox = {
    window: windowStub,
    document,
    innerWidth: 1280,
    innerHeight: 720,
    requestAnimationFrame(callback) { frameQueue.push(callback); },
    Math,
    console
  };

  vm.runInNewContext(testSource, sandbox, { timeout: 2000 });
  return {
    handlers, elements, frameQueue, debug: windowStub.__terrariumDebug,
    qa: windowStub.__JURASSIC_TERRARIUM__,
    gpuDrawCount: () => gpuDrawCount,
    step(timestamp) {
      const callback = frameQueue.shift();
      assert.ok(callback, "animation frame was scheduled");
      callback(timestamp);
    }
  };
}

const runtime = boot("webgl1");
assert.equal(runtime.elements.get("graphics").textContent, "WEBGL1 ACTIVE · GPU SKY");
runtime.step(0);
for (let i = 1; i <= 600; i++) runtime.step(i * 50);

assert.ok(runtime.qa, "browser QA interface is exposed");
assert.equal(runtime.qa.version, "0.9.0");
assert.equal(runtime.qa.getSnapshot().herdCount, 9);
assert.equal(runtime.qa.getSnapshot().foodPatchCount, 6);
assert.equal(runtime.qa.getSnapshot().renderedFrames, 601);
assert.deepEqual(Array.from(runtime.qa.getSnapshot().errors), []);

const status = runtime.elements.get("status").textContent;
assert.ok(status.startsWith("HERD "), "herd activity is visible");
assert.ok(status.includes(" · REX "), "T. rex activity is visible");
assert.ok(status.includes(" · BRACH "), "Brachiosaurus activity is visible");
assert.ok(runtime.gpuDrawCount() > 0, "WebGL sky pass renders frames");

runtime.elements.get("cycle").click();
assert.ok(runtime.elements.get("clock").textContent.includes("NIGHT"), "night control responds");
assert.equal(runtime.qa.getSnapshot().isNight, true, "QA snapshot reflects night mode");
runtime.elements.get("storm").click();
assert.equal(runtime.elements.get("weather").textContent, "TROPICAL RAIN");
assert.equal(runtime.qa.getSnapshot().isRaining, true, "QA snapshot reflects rain mode");
runtime.elements.get("pause").click();
assert.equal(runtime.elements.get("pause").textContent, "Resume");
assert.equal(runtime.qa.getSnapshot().paused, true, "QA snapshot reflects paused state");
const frozenStatus = runtime.elements.get("status").textContent;
for (let i = 601; i <= 620; i++) runtime.step(i * 50);
assert.equal(runtime.elements.get("status").textContent, frozenStatus, "paused simulation status stays frozen");
runtime.elements.get("pause").click();
assert.equal(runtime.elements.get("pause").textContent, "Pause");
runtime.handlers.get("world:pointerdown")?.();
assert.ok(runtime.elements.get("world").style.transform.startsWith("scale("), "camera control responds");

const webgl2 = boot("webgl2");
assert.equal(webgl2.elements.get("graphics").textContent, "WEBGL2 ACTIVE · GPU SKY");
webgl2.step(0);
assert.ok(webgl2.gpuDrawCount() > 0, "WebGL2 sky pass renders a frame");
const canvasOnly = boot("none");
assert.equal(canvasOnly.elements.get("graphics").textContent, "CANVAS 2D ONLY");
const shaderFailure = boot("webgl2", true);
assert.equal(shaderFailure.elements.get("graphics").textContent, "CANVAS 2D ONLY");
shaderFailure.step(0);
assert.equal(shaderFailure.gpuDrawCount(), 0, "shader compilation failure falls back to Canvas 2D");


const encounter = boot("webgl2");
const actors = encounter.debug;
actors.herd.forEach((actor, index) => { actor.x = 0.22 + index * 0.002; });
const prey = actors.herd[4];
prey.x = 0.61;
actors.rex.x = 0.56;
actors.rex.mode = "stalk";
actors.rex.modeTime = 5;
actors.rex.huntCooldown = 0;
actors.updateEcosystem(0.016);
assert.equal(actors.rex.mode, "hunt", "T. rex enters hunt state at close range");
assert.equal(prey.mode, "flee", "targeted herd animal flees a close predator");
assert.ok(prey.x < 0.61, "fleeing animal moves away from predator");


const feeding = boot("webgl2");
const ecosystem = feeding.debug;
ecosystem.rex.x = ecosystem.rex.homeX = 0.96;
ecosystem.herd.forEach((actor,index)=>{actor.x=actor.homeX=0.32+index*0.027;});
ecosystem.brach.x=ecosystem.brach.homeX=ecosystem.feedingPatches[0].x;
ecosystem.brach.mode="browse";
ecosystem.brach.modeTime=10;
ecosystem.brach.feedTarget=0;
const foodBefore=ecosystem.feedingPatches[0].biomass;
ecosystem.updateEcosystem(1);
assert.equal(ecosystem.brach.mode,"feed","Brachiosaurus settles into a feeding patch");
assert.ok(ecosystem.feedingPatches[0].biomass<foodBefore,"feeding consumes patch biomass");
ecosystem.brach.mode="walk";
ecosystem.brach.modeTime=10;
const regrowthBefore=ecosystem.feedingPatches[0].biomass;
ecosystem.updateEcosystem(1);
assert.ok(ecosystem.feedingPatches[0].biomass>regrowthBefore,"unused vegetation regrows");
const grazer=ecosystem.herd[0];
grazer.x=grazer.homeX=0.32;
grazer.mode="forage";
grazer.modeTime=10;
grazer.feedTarget=-1;
const grazerStart=grazer.x;
ecosystem.updateEcosystem(1);
assert.ok(grazer.x<grazerStart,"herd member moves toward a nearby food patch");

console.log("PASS: inline script parses");
console.log("PASS: WebGL2 and WebGL1 GPU sky passes render; Canvas-only and shader-failure fallbacks are retained");
console.log("PASS: 30 seconds of mocked animation frames run without runtime errors");
console.log("PASS: autonomous herd, rex and brach activity states are exposed");
console.log("PASS: predator stalking escalates to a chase and prey flees");
console.log("PASS: herbivores seek, consume and regrow procedural vegetation");
console.log("PASS: day/night, rain, pause/resume and camera controls respond");
