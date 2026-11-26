# Project checkpoint

- **Project:** Jurassic Terrarium
- **Version:** v0.6.0
- **Repository:** `Lil-Rebel94/EXTINCTION-Android.` (default branch `main`)
- **Current entry point:** `index.html` (latest verified blob `cc2bc392fce97a9b9ad71140dc870fab5ee61936`)
- **Test:** `node tests/behavior-smoke.mjs`
- **TV research:** `docs/TV_COMPATIBILITY.md`

## Completed this run

- Replaced the T. rex's flat silhouette with a procedural low-poly 3D mesh built from shaded triangle-based ellipsoids. Tail, torso, skull, jaw, eyes, legs and forearms are separate articulated volumes; limb stride and body bob respond to the existing movement state. Brachiosaurus and herd remain on the previous silhouette renderer.

- Added a predator-prey encounter loop: nearby herd animals become alert, the T. rex stalks a nearby target, and a close encounter triggers a short pursuit with the target fleeing faster and beyond its normal roaming radius.
- Added a pursuit cooldown and explicit `STALKING`, `HUNTING`, and `FLEEING` activity labels to prevent constant re-triggering and make encounters visible.
- Added deterministic smoke-test coverage for the close-range pursuit and fleeing response.

- Added the first actual GPU-rendered scene pass: a GLSL sky gradient, with day/night uniform, rendered through WebGL2 or WebGL1 and composited into the existing Canvas 2D scene.
- Kept the full Canvas 2D sky gradient as a fallback when context creation, shader compilation, or program linking fails.
- Updated the graphics badge to report `WEBGL2 ACTIVE · GPU SKY`, `WEBGL1 ACTIVE · GPU SKY`, or `CANVAS 2D ONLY` rather than implying that detection alone activates a GPU renderer.

- Preserved and extended the existing v0.2.0 ambient dinosaur activity system: herd foraging/walking/alert/rest, T. rex patrol/scan/rest, and Brachiosaurus browse/walk/rest.
- The GPU pass uses a dedicated WebGL canvas and retains the existing scene canvas for 2D compositing.
- Added/updated the Node mocked smoke test to cover WebGL2, WebGL1 and Canvas-only branches, animation, behaviour state output and controls.
- Recorded Samsung TV browser-engine and application-resolution constraints in `docs/TV_COMPATIBILITY.md`.

## Verification

- Inline JavaScript syntax compilation after latest commit: **PASS**.
- Mocked ecosystem encounter: **PASS** — forced close-range encounter transitioned T. rex to `hunt`, prey to `flee`, and moved the prey away from the predator.
- Mocked runtime validation after GPU pass: **PASS** — 30 simulated seconds (601 frames) each on WebGL2 and WebGL1, with GPU draw calls; Canvas-only and shader-compilation-failure fallbacks produced zero GPU draw calls.
- Final post-cleanup runtime harness rerun: **PASS**.
- Mocked runtime harness: **PASS** — 30 simulated seconds, no runtime errors.
- Graphics paths: **PASS** — WebGL2 and WebGL1 render paths, Canvas-only fallback, and shader-compilation-failure fallback.
- Activity readout: **PASS** — herd, T. rex and Brachiosaurus states displayed.
- Day/night, rain, pause/resume and camera controls: **PASS**.
- Node CLI test file: **committed; not executed under Node in this environment**. Equivalent runtime assertions were run in the available JavaScript runtime.
- Actual browser/GPU rendering on a physical GPU: **NOT RUN**.
- Samsung UN85TU7000FXZA firmware/browser/WebGL2: **NOT QUERIED ON DEVICE**.
- Real-TV playback, 4K output and frame rate: **NOT VERIFIED**.

## Known limitations

The renderer is hybrid WebGL + Canvas 2D; only the sky gradient currently uses WebGL. The T. rex now uses a stylized procedural low-poly 3D mesh with animated part transforms; it is not a high-detail sculpt or a full bone-weighted skeletal rig. Brachiosaurus and herd remain stylized silhouettes. Predator behaviour currently stops at stalking and a short chase; no kill, feeding, or carcass cycle is implemented. Herd cohesion/social behaviour, territorial simulation, soundscape, persistent world state, complete verified film species roster, and 3D rendering remain outstanding. Samsung's published general specifications list 1920×1080 application resolution for TV apps even on 4K models, so native 4K browser rendering is not assumed.

## Next engineering task

Validate the hybrid renderer in a real browser/GPU, extend the mesh renderer to Brachiosaurus and herd species, improve articulated joint motion, then add the feeding/carcass cycle. Keep the Canvas fallback until browser and TV testing pass.
