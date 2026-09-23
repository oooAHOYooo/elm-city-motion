# Elm City Motion

Standalone editorial website for **Elm City Motion (ECM)**, a film and video production studio in New Haven, Connecticut.

- **Studio Contact:** Alex (`alex@ahoy.ooo`)
- **Repository:** [github.com/oooAHOYooo/elm-city-motion](https://github.com/oooAHOYooo/elm-city-motion)
- **Primary Branch:** `master`

---

## Preview Locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173` in your browser.

---

## Site Architecture & Layout

The website currently uses **Layout A** (Hero Video + Stills Section Below):

1. **`#hero` (Cinematic Reel Hero)**:
   - Features the 44-second, 12-shot black-and-white commercial showreel (`assets/ecm-commercial-reel.mp4`).
   - SVG typography wordmark (`assets/ecm-wordmark.svg`).
   - Monospace metadata overlays with film grain texture.
2. **`#about` (01 / About)**:
   - Clean editorial positioning statement on warm paper background.
3. **`#stills` (02 / Stills)**:
   - Dedicated photography gallery featuring 6 production stills from New Haven shoots.
   - Interactive selector pills (`01 CAMERA`, `02 COUNTER`, `03 INTERIOR`, `04 ESPRESSO`, `05 CUP`, `06 DETAIL`).
   - Location readout and subtle Ken Burns zoom drift with smooth crossfades.
4. **`#contact` (03 / Contact)**:
   - "Make Something" full-screen statement with dark photography backdrop and direct email link.

---

## Motion & Photography Assets

All production and location assets are stored in `assets/`:

- `assets/ecm-commercial-reel.mp4`: Lightweight 12-clip relaxed cinematic montage reel (44s, 5.0 MB, CRF 29, 1920x804 anamorphic) with 0.55s dark crossfades (fade through black) in high-contrast B&W.
- `assets/ecm-commercial-reel-poster.jpg`: First-frame poster image for fast visual paint before video buffers.
- `assets/nh-bts-camera.jpg`: Production Set — Cinema camera rig on tripod & directing in chiaroscuro.
- `assets/nh-koffee-counter.jpg`: Koffee? on Audubon St — Barista motion blur & pastry counter.
- `assets/nh-koffee-interior.jpg`: Koffee? on Audubon St — Interior wide shot, chandelier & brick arches.
- `assets/nh-koffee-espresso.jpg`: Koffee? on Audubon St — Espresso bar, brick wall & clock.
- `assets/nh-koffee-cup.jpg`: Koffee? on Audubon St — Ceramic cup, latte & chocolate cookies.
- `assets/nh-koffee-sticker.jpg`: Koffee? on Audubon St — Illustrative brand sticker on woodgrain.
- `assets/nh-koffee-motion.mp4`: Sesabee chai motion clip (237 KB).
- `assets/ecm-wordmark.svg`: White hero wordmark with subtle motion trail exposure.
- `assets/ecm-wordmark-print.svg`: Crisp one-color black wordmark for print, festival laurels, and credits.

> **Note on Raw Footage:** Raw heavy video files (such as `AG - COMMERCIAL BROLL - ECM - 9-17-26.mp4`, 229 MB) are stored in `assets/reels/` and are strictly ignored by `.gitignore` to keep the git repository ultra-lean.

---

## Project History & Agent Handoff

For an in-depth record of all conversations, design iterations, technical decisions, and instructions for subsequent developers or AI agents, please read:

👉 **[HANDOFF.md](./HANDOFF.md)**

### Summary of Recent Iterations:
1. **Initial Stills-Only Site:** Pure static photo slides in hero with pill selectors.
2. **First Video Integration:** Graded and compressed `SHOOT 2 - EXPORT - SESABEE CHAI` into background rotation.
3. **Dedicated 1200px Reel Section:** Added raw footage from `AG - COMMERCIAL BROLL - ECM - 9-17-26` in a full-bleed stretched video section below contact.
4. **21-Shot Rapid Montage:** Created a 39-second montage across 21 scenes with dark crossfades.
5. **Relaxed 44s Reel & Hero Video (Current):** Slowed down pace to 3.6s–4.0s per clip (12 curated shots) with 0.55s dark crossfades. Placed reel in `#hero` and created dedicated `#stills` gallery below.
6. **Layout Comparison Option:** The codebase and scripts support both **Layout A** (Video in Hero + Stills Below) and **Layout B** (Stills in Hero + Video Below) seamlessly.
