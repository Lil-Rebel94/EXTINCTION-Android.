# Project checkpoint

- **Project:** Jurassic Terrarium
- **Version:** v0.2.0
- **Repository:** `Lil-Rebel94/EXTINCTION-Android.` (default branch `main`)
- **Current entry point:** `index.html`
- **Test:** `node tests/behavior-smoke.mjs`
- **TV research:** `docs/TV_COMPATIBILITY.md`

## Completed this run

- Added deterministic per-animal finite-state activity to the existing procedural actors.
- Gallimimus-like herd members transition between foraging, walking, alert pauses and rest.
- T. rex transitions between patrol, scanning and rest.
- Brachiosaurus transitions between browsing, walking and rest; the neck/head pose blends down while browsing.
- Added smooth gait/activity blending, bounded roaming around each actor's home range, and a live activity readout.
- Added a mocked runtime smoke test covering script parsing, animation-frame execution, behaviour-state output and UI controls.
- Researched Samsung's published 2020 TV web-engine baseline and recorded the WebGL2 / app-resolution uncertainties.

## Verification

- Inline JavaScript syntax compilation before commit: **PASS**.
- Static feature assertions before commit: **PASS**.
- Node mocked runtime smoke test: **added; execution pending local Node runtime**.
- Actual browser/GPU rendering: **NOT RUN**.
- Samsung UN85TU7000FXZA firmware/browser/WebGL2: **NOT QUERIED ON DEVICE**.
- Real-TV playback, 4K output and frame rate: **NOT VERIFIED**.

## Known limitations

This remains a stylized Canvas 2D prototype. Dinosaur anatomy is simplified; current behaviour is state-based ambient motion, not a full ecological simulation. No feeding/hunting interactions, soundscape, persistence, complete species roster, or 3D renderer yet. The TV's panel is 4K, but Samsung's published general specifications list 1920×1080 application resolution; native 4K browser rendering is not assumed.

## Next engineering task

Implement a WebGL capability probe and a minimal GPU-rendered terrain/sky pass, retaining the current Canvas 2D renderer as the fallback. Do not select WebGL2 as the TV default until device testing confirms it.
