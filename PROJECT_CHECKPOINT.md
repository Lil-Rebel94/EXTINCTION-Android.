# Project checkpoint

- **Project:** Jurassic Terrarium
- **Version:** v0.4.0
- **Repository:** `Lil-Rebel94/EXTINCTION-Android.` (default branch `main`)
- **Current entry point:** `index.html` (latest verified blob `c611b4ee5f391a6e05351b65f8b0d2d9712949dd`)
- **Test:** `node tests/behavior-smoke.mjs`
- **TV research:** `docs/TV_COMPATIBILITY.md`

## Completed this run

- Added the first actual GPU-rendered scene pass: a GLSL sky gradient, with day/night uniform, rendered through WebGL2 or WebGL1 and composited into the existing Canvas 2D scene.
- Kept the full Canvas 2D sky gradient as a fallback when context creation, shader compilation, or program linking fails.
- Updated the graphics badge to report `WEBGL2 ACTIVE · GPU SKY`, `WEBGL1 ACTIVE · GPU SKY`, or `CANVAS 2D ONLY` rather than implying that detection alone activates a GPU renderer.

- Preserved and extended the existing v0.2.0 ambient dinosaur activity system: herd foraging/walking/alert/rest, T. rex patrol/scan/rest, and Brachiosaurus browse/walk/rest.
- The GPU pass uses a dedicated WebGL canvas and retains the existing scene canvas for 2D compositing.
- Added/updated the Node mocked smoke test to cover WebGL2, WebGL1 and Canvas-only branches, animation, behaviour state output and controls.
- Recorded Samsung TV browser-engine and application-resolution constraints in `docs/TV_COMPATIBILITY.md`.

## Verification

- Inline JavaScript syntax compilation after latest commit: **PASS**.
- Mocked runtime validation after GPU pass: **PASS** — 20 frames each on WebGL2 and WebGL1, with GPU draw calls; Canvas-only fallback produced zero GPU draw calls.
- Final post-cleanup runtime harness rerun: **PASS**.
- Mocked runtime harness: **PASS** — 30 simulated seconds, no runtime errors.
- Graphics probe branches: **PASS** — WebGL2 detected, WebGL1 detected after WebGL2 miss, and Canvas-only fallback.
- Activity readout: **PASS** — herd, T. rex and Brachiosaurus states displayed.
- Day/night, rain, pause/resume and camera controls: **PASS**.
- Node CLI test file: **committed; not executed under Node in this environment**. Equivalent runtime assertions were run in the available JavaScript runtime.
- Actual browser/GPU rendering on a physical GPU: **NOT RUN**.
- Samsung UN85TU7000FXZA firmware/browser/WebGL2: **NOT QUERIED ON DEVICE**.
- Real-TV playback, 4K output and frame rate: **NOT VERIFIED**.

## Known limitations

The renderer is hybrid WebGL + Canvas 2D; only the sky gradient currently uses WebGL. The dinosaur models remain stylized procedural silhouettes with basic activity poses, not photorealistic meshes or skeletal rigs. Feeding/hunting interactions, herd-level social behavior, territorial simulation, soundscape, persistent world state, complete verified film species roster, and 3D rendering remain outstanding. Samsung's published general specifications list 1920×1080 application resolution for TV apps even on 4K models, so native 4K browser rendering is not assumed.

## Next engineering task

Validate the new shader pass in a real browser/GPU, then replace procedural dinosaur silhouettes with articulated 3D meshes and skeletal animation. Keep the Canvas fallback until browser and TV testing pass.
