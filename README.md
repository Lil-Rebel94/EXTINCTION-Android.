# Jurassic Terrarium

A code-first, ambient dinosaur-island project. This repository is the working home for the Jurassic Terrarium project.

## v0.1.0 — playable visual test

Open **[index.html](./index.html)** in a modern browser. The page is self-contained: it uses only the browser's built-in Canvas 2D API and does not load external libraries, assets, fonts, APIs, or paid services.

### Included in this test
- Procedurally drawn island, distant mountains, lagoon, waterfall, mist, clouds, forest, visitor-centre-inspired lodge, perimeter fence, service road, and safari vehicle.
- Animated stylized Tyrannosaurus, Brachiosaurus, and Gallimimus-like herd.
- Day/night toggle, tropical-rain toggle, pause/resume, and a small camera-view shift.
- Responsive canvas sizing and a capped device-pixel ratio for a lighter first-run experience.
- Keyboard shortcuts: **Space** pauses/resumes, **N** toggles night, **R** toggles rain.

### Important limits
This is an **early playable visual prototype**, not the promised photorealistic terrarium. Dinosaur bodies are simplified procedural silhouettes, not finished anatomical meshes or rigs. The animals have basic looping motion; feeding, hunting, social behavior, territory, persistent state, and sound are not implemented. The current renderer is Canvas 2D, deliberately chosen for this first no-dependency browser sample; it is not evidence of WebGL2 support or TV compatibility.

The Samsung UN85TU7000FXZA browser has **not** been tested. Resolution, frame rate, remote-control navigation, sleep/wake behavior, and long-duration stability are unverified. Do not treat this prototype as a 4K/60–120 FPS or TV-validated build.

## Run locally
1. Download `index.html` from this repository.
2. Open it in a current desktop or mobile browser.
3. Use the on-screen controls, or Space / N / R on a keyboard.

No build step or server is required.

## Project principles
- Original procedural code and artwork; no ripped film models, textures, footage, or soundtrack.
- Free and local-first; no paid APIs, GitHub Actions, or Codespaces.
- Distinguish confirmed on-screen species from uncertain background identifications before locking the final film roster.
- Treat visual quality and TV performance as measured engineering targets, not assumptions.

## Changelog
- **v0.1.0** — first repository-hosted, self-contained playable island scene.
