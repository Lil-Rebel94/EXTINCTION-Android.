# Jurassic Terrarium

A code-first, ambient dinosaur-island project. This repository is the working home for Jurassic Terrarium.

## v0.5.0 — predator-prey behaviour and GPU-rendered sky

Open **[index.html](./index.html)** in a modern browser. The page is self-contained and uses the browser's built-in Canvas 2D and optional WebGL APIs. It loads no external libraries, assets, fonts, APIs, or paid services.

### Included in this test

- Procedurally drawn island, distant mountains, lagoon, waterfall, mist, clouds, forest, visitor-centre-inspired lodge, perimeter fence, service road, and safari vehicle.
- Animated stylized Tyrannosaurus, Brachiosaurus, and Gallimimus-like herd.
- Deterministic per-animal activity state machines: herd foraging, walking, alert pauses, fleeing and rest; T. rex patrol, scan, stalking, close-range pursuit and rest; Brachiosaurus browsing, walking and rest.
- Predator response: the herd raises alerts when the T. rex approaches; it can stalk a nearby animal, trigger a short pursuit, and cause the target to flee, with a cooldown to prevent constant re-triggering.
- Smooth gait/browse blending, bounded roaming around each animal's home range, and a live behaviour readout.
- Optional WebGL2/WebGL1 shader-rendered sky gradient, composited into the Canvas 2D scene; shader setup failures retain the Canvas 2D fallback.
- Day/night toggle, tropical-rain toggle, pause/resume, camera-view shift, and keyboard shortcuts (**Space**, **N**, **R**).
- Responsive canvas sizing and a capped device-pixel ratio for a lighter first-run experience.

### Run locally

1. Download `index.html` from this repository.
2. Open it in a current desktop or mobile browser.
3. Use the on-screen controls, or Space / N / R on a keyboard.

No build step or server is required.

### Tests

Run the mocked browser/runtime smoke test with Node.js:

```sh
node tests/behavior-smoke.mjs
```

The test checks inline-script parsing, WebGL2/WebGL1/Canvas-only paths, shader-failure fallback, animation-frame execution, activity-state output, predator pursuit/fleeing, and the main controls using stubbed browser APIs. It is not a substitute for a real browser/GPU test.

### Important limits

This is an **early playable visual prototype**, not the promised photorealistic terrarium. Dinosaur bodies are simplified procedural silhouettes, not finished anatomical meshes or rigs. The animals now have deterministic ambient activity states and bounded roaming, but feeding, successful predation, herd cohesion/social interactions, territory, persistent state, and sound are not implemented. The current predator system models stalking and fleeing only; it does not simulate kills or feeding. The scene remains a hybrid renderer: the sky gradient uses an optional WebGL2/WebGL1 shader pass, while landscape, structures, weather, and dinosaur silhouettes remain Canvas 2D. This is not a 3D dinosaur renderer or evidence of TV compatibility.

The Samsung UN85TU7000FXZA browser has **not** been tested. Samsung's published 2020 TV web-engine baseline is Tizen 5.5 / Chromium M69; its documentation lists WebGL generally but does not establish WebGL2 for this target. Samsung's general specification lists 1920×1080 application resolution even on 4K models. See [TV compatibility notes](./docs/TV_COMPATIBILITY.md). Actual resolution, frame rate, remote-control navigation, sleep/wake behaviour, and long-duration stability remain unverified. Do not treat this prototype as a 4K/60–120 FPS or TV-validated build.

## Project principles

- Original procedural code and artwork; no ripped film models, textures, footage, or soundtrack.
- Free and local-first; no paid APIs, GitHub Actions, or Codespaces.
- Distinguish confirmed on-screen species from uncertain background identifications before locking the final film roster.
- Treat visual quality and TV performance as measured engineering targets, not assumptions.

## Changelog

- **v0.1.0** — first repository-hosted, self-contained playable island scene.
- **v0.2.0** — autonomous activity state machines, bounded roaming, blended poses, live behaviour readout, and a Node-based mocked runtime smoke test.
- **v0.3.0** — runtime WebGL2/WebGL1 capability detection with explicit Canvas 2D fallback.
- **v0.4.0** — first active GPU-rendered pass: shader-based day/night sky gradient on WebGL2 or WebGL1, with Canvas 2D fallback.
- **v0.5.0** — predator-prey encounter states: T. rex stalking and short pursuit, herd alerting, targeted fleeing, and pursuit cooldown.
