# Jurassic Terrarium

A code-first, ambient dinosaur-island project. This repository is the working home for Jurassic Terrarium.

## v0.9.0 — browser visual QA harness

The film roster has also been researched into a working baseline: **15 confirmed living dinosaur taxa across the trilogy, plus Pteranodon as a separate flying reptile**. Brief/background animals, prop-only references, and uncertain candidates are separated in [docs/SPECIES_ROSTER.md](./docs/SPECIES_ROSTER.md).

The standalone scene now exposes a read-only diagnostic snapshot at `window.__JURASSIC_TERRARIUM__` (render-frame count, canvas dimensions, selected renderer path, animal activity states, food patch count, control state, and captured runtime errors). A dependency-free browser test page at **[tests/browser-visual.html](./tests/browser-visual.html)** loads the scene in an iframe, samples the rendered canvas for nonblank visual output, checks animation progress and runtime errors, and exercises day/night, rain, pause and resume.

Run the browser check from the repository root with a local static server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/tests/browser-visual.html`. The page reports each check in the browser; it requires no packages, external assets, or network APIs. The Node mocked-runtime test remains available separately.

## v0.8.0 — herbivore feeding and vegetation regrowth

Open **[index.html](./index.html)** in a modern browser. The page is self-contained and uses the browser's built-in Canvas 2D and optional WebGL APIs. It loads no external libraries, assets, fonts, APIs, or paid services.

### Included in this test

- Procedurally drawn island, distant mountains, lagoon, waterfall, mist, clouds, forest, visitor-centre-inspired lodge, perimeter fence, service road, and safari vehicle.
- Animated stylized Tyrannosaurus, Brachiosaurus, and Gallimimus-like herd.
- Deterministic per-animal activity state machines: herd foraging, walking, alert pauses, fleeing and rest; T. rex patrol, scan, stalking, close-range pursuit and rest; Brachiosaurus browsing, walking and rest.
- Predator response: the herd raises alerts when the T. rex approaches; it can stalk a nearby animal, trigger a short pursuit, and cause the target to flee, with a cooldown to prevent constant re-triggering.
- Six procedural feeding patches support herbivore target selection, approach movement, feeding/consumption, head-lowering poses, and gradual vegetation regrowth.
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

The test checks inline-script parsing, WebGL2/WebGL1/Canvas-only paths, shader-failure fallback, animation-frame execution, activity-state output, predator pursuit/fleeing, food seeking, vegetation consumption/regrowth, and the main controls using stubbed browser APIs. It is not a substitute for a real browser/GPU test.

### Important limits

This is an **early playable visual prototype**, not the promised photorealistic terrarium. Dinosaur bodies are assembled from procedural low-poly ellipsoid parts and projected through Canvas 2D; they are not finished anatomical models, true GPU 3D meshes, or skeletal rigs. The animals have deterministic ambient activity states and bounded roaming. Herbivores can seek nearby food patches, feed, lower their heads, and consume vegetation that gradually regrows. Successful predation, herd cohesion/social interactions, territory, persistent state, and sound are not implemented. The current predator system models stalking and fleeing only; it does not simulate kills or carcass feeding. The scene remains a hybrid renderer: only the sky gradient uses an optional WebGL2/WebGL1 shader pass, while terrain, structures, weather, vegetation and dinosaur geometry are drawn through Canvas 2D. This is not a true 3D dinosaur renderer or evidence of TV compatibility.

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
- **v0.6.0** — first procedural low-poly T. rex mesh.
- **v0.7.0** — procedural low-poly mesh renderer extended to the sauropod and herd groups.
- **v0.8.0** — herbivores seek, approach and feed from six procedural vegetation patches; biomass is consumed and regrows, with visible head-lowering poses.
- **v0.9.0** — read-only runtime diagnostics and a dependency-free browser visual smoke-test page for actual canvas pixels, frame progression, runtime errors, and ambient controls.
