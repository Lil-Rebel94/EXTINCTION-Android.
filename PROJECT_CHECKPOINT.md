# Project checkpoint

- **Project:** Jurassic Terrarium
- **Version:** v0.3.0
- **Repository:** `Lil-Rebel94/EXTINCTION-Android.` (default branch `main`)
- **Current entry point:** `index.html`
- **Test:** `node tests/behavior-smoke.mjs`
- **TV research:** `docs/TV_COMPATIBILITY.md`

## Completed this run

- Preserved and extended the existing v0.2.0 ambient dinosaur activity system: herd foraging/walking/alert/rest, T. rex patrol/scan/rest, and Brachiosaurus browse/walk/rest.
- Added a startup graphics capability probe using a temporary canvas: WebGL2 first, then WebGL1/experimental WebGL, with explicit Canvas-only fallback.
- Added an on-screen graphics badge. It reports detected capability while the scene continues to use Canvas 2D; no unverified GPU renderer is enabled.
- Releases the temporary WebGL probe context after detection to avoid keeping an unnecessary GPU context alive.
- Added/updated the Node mocked smoke test to cover WebGL2, WebGL1 and Canvas-only branches, animation, behaviour state output and controls.
- Recorded Samsung TV browser-engine and application-resolution constraints in `docs/TV_COMPATIBILITY.md`.

## Verification

- Inline JavaScript syntax compilation after latest commit: **PASS**.
- Mocked runtime harness: **PASS** — 30 simulated seconds, no runtime errors.
- Graphics probe branches: **PASS** — WebGL2 detected, WebGL1 detected after WebGL2 miss, and Canvas-only fallback.
- Activity readout: **PASS** — herd, T. rex and Brachiosaurus states displayed.
- Day/night, rain, pause/resume and camera controls: **PASS**.
- Node CLI test file: **committed; not executed under Node in this environment**. Equivalent runtime assertions were run in the available JavaScript runtime.
- Actual browser/GPU rendering: **NOT RUN**.
- Samsung UN85TU7000FXZA firmware/browser/WebGL2: **NOT QUERIED ON DEVICE**.
- Real-TV playback, 4K output and frame rate: **NOT VERIFIED**.

## Known limitations

The renderer is still Canvas 2D. The dinosaur models remain stylized procedural silhouettes with basic activity poses, not photorealistic meshes or skeletal rigs. Feeding/hunting interactions, herd-level social behavior, territorial simulation, soundscape, persistent world state, complete verified film species roster, and 3D rendering remain outstanding. Samsung's published general specifications list 1920×1080 application resolution for TV apps even on 4K models, so native 4K browser rendering is not assumed.

## Next engineering task

Build a minimal optional GPU-rendered sky/terrain pass with a WebGL2 path and a compatible WebGL1 path, keeping the current Canvas renderer as a guaranteed fallback. Validate shader compilation in a real browser before attempting TV deployment.
