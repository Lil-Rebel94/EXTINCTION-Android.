# Jurassic Terrarium checkpoint

- **Current version:** v0.8.0
- **Target:** Samsung UN85TU7000FXZA; physical TV playback remains unverified.
- **Files changed:** `index.html`, `tests/behavior-smoke.mjs`, `README.md`.
- **Milestone:** Six procedural food patches now support herbivore target selection, approach movement, feeding, vegetation consumption and regrowth. Feeding state is visible in the behavior readout; herd and Brachiosaurus head poses lower while feeding.
- **Tests added:** Brachiosaurus feeding reduces patch biomass; unused vegetation regrows; a herd animal moves toward a nearby patch. Existing mocked WebGL2/WebGL1/Canvas fallback, predator encounter and control tests are retained.
- **Validation:** Inline application script and smoke-test source both parse. A custom V8 mocked-browser run passed 601 WebGL1 animation frames, a WebGL2 draw, Canvas-only fallback, shader-failure fallback, predator pursuit/fleeing, herbivore food seeking, biomass consumption, and regrowth. The Node CLI test and real browser/GPU rendering were not executed in this run.
- **Known limitations:** Dinosaur geometry remains low-poly procedural ellipsoids projected through Canvas 2D, not a true 3D/WebGL mesh renderer or finished skeletal rig. No kills/carcass feeding, social cohesion, territory, persistent world state, audio, full film species roster, or TV validation yet.
- **Next task:** Add a real browser-executable render/visual regression path and verify procedural mesh appearance before expanding species or complexity.
