# Samsung TV compatibility notes

Target: **Samsung UN85TU7000FXZA**, 85-inch TU7000 family.

## Evidence gathered

- Samsung's Smart TV web-engine table maps the **2020** TV generation to **Tizen 5.5 / Chromium M69**. This is a generation-level reference, not a live firmware query from the user's set: https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html
- Samsung lists Canvas and `requestAnimationFrame()` support for its TV web engine, and lists the WebGL API in the graphics feature table. The documentation does **not** separately establish WebGL 2 support for this target generation. Do not assume WebGL2 or a specific GPU extension set: https://developer.samsung.com/smarttv/develop/specifications/web-engine-specifications.html
- Samsung's general specification table lists the TV application resolution as **1920×1080 for all models**, while 4K UHD video is listed at 3840×2160. This is a critical distinction: the panel is 4K, but browser-app rendering should initially be budgeted around 1080p unless the actual device demonstrates a higher app viewport/render target: https://developer.samsung.com/smarttv/develop/specifications/general-specifications.html
- Samsung provides Web Inspector for debugging web applications on physical TVs and notes that emulator measurements may differ from a real TV: https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/web-inspector.html

## Engineering decisions

1. Keep the current Canvas 2D path as a no-dependency compatibility baseline.
2. Probe WebGL2 at runtime before enabling a 3D renderer; do not infer it from generic WebGL support.
3. If WebGL2 is unavailable, use a WebGL1-compatible renderer only after feature checks, or retain Canvas 2D.
4. Start with a 1920×1080 internal render target and adaptive quality. A 4K panel can upscale the output; native 4K browser rendering is not assumed.
5. Validate remote-control input, browser focus, sleep/wake, memory stability, and sustained frame pacing on the actual TV before declaring compatibility.

## Current verification state

- Platform reference research: **documented**.
- Exact firmware/browser version on the user's TV: **not queried**.
- WebGL2 on the user's TV: **unknown**.
- Real-TV rendering/performance: **not tested**.
