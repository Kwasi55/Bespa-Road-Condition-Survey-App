# Bespa Road Condition Survey App — field capture (Phase 1)

Offline-first web app created by Dr. Kwasi Osafo Ampadu for feeder road condition surveys. It
captures what the crew sees and exports a workbook the Master Estimator prices on the desktop.
**It produces no bill and holds no rates** — pricing, taking-off and the BOQ stay on the
desktop.

## Files
| File | What it is |
|---|---|
| `bespa-survey.html` | **The whole app.** One self-contained file, no dependencies, no internet needed. This is the only file with any application logic in it, and the only one to edit. |
| `index.html` | An 858-byte redirect to `bespa-survey.html`, and nothing else. It exists because GitHub Pages answers a bare folder URL with `index.html` alone, and every phone that has already installed the app carries `./` as its start address. Holding no logic, it cannot drift from the app. |
| `manifest.webmanifest` | Lets Android install it to the home screen as an app. |
| `sw.js` | Service worker — caches the app so it opens with no signal. **Its cache name must be bumped whenever the app changes**, or an installed phone keeps serving the copy it already has. |
| `icon.png`, `icon.svg` | Home-screen icon. |

Until 28 October 2026 the app existed twice, as `index.html` and as an identical
`bespa-survey.html`, with the README promising they were "kept identical". Two copies of one
file stay identical only until someone edits one. Collapsed on Dr Ampadu's instruction.

## Putting it on the crews' phones
1. Copy every file in `github_pages/` to any HTTPS address — an intranet server, GitHub Pages, Netlify.
   They must sit in the same folder. **HTTPS is required** for GPS and for offline install.
2. On the phone, open that address in Chrome and choose *Add to Home screen*.
3. Open it once with signal so the service worker caches it. After that it runs offline.

Opening `bespa-survey.html` straight off the phone's storage also works — you lose the
home-screen install and GPS, but capture and export still run.

## Using it
- **Setup** — road identity, Form E treatment rules, Form F constants. A red `!` marks a
  template figure not yet confirmed for this road.
- **Survey** — stamp the **From** chainage where the section starts, record what is true along
  it, walk to where the road or its features change, stamp **To**, then *Save section*. Stamp
  writes the GPS chainage into the box; both limits can also be typed. The next section starts
  where this one ended, carrying the settings forward, so gaps cannot creep in unnoticed.
  Tap the big chainage at the top of the screen to correct it whenever you pass a known point.
- **Points** — culverts, bridges, gullies, turnouts and pitching at the current chainage, with a photo.
- **To be redesigned** — the first switch on Form A. Turn it on where a stretch is going to the
  Road Design app and off where that stretch ends. It closes any earthworks run at that
  chainage and locks raise, cut-to-widen and fill-to-widen for as long as it is on, because the
  design app measures those. Clearing, drainage, pavement and point items are still surveyed
  normally. The export lists the stretches on a `G_Design` sheet and notes them on Form A;
  that sheet is a note to the estimator and is never pasted into it.
- **Surface** — choose Gravel or Bituminous, then tap **Start here**; tap **End here** where it
  changes. The same two-step as the other items, so a road that changes surface partway is
  recorded as two runs rather than one guess.
- **U-drains** — choose the drain by its **legend**, `U-1` to `U-7`, each labelled with its
  internal width × height: `U-3  600 × 750`. Before 1.7.0 this box took a width in
  centimetres, which could not say whether a 600 drain was 600×600, 600×750 or
  600×900 — three different items at three different rates. A survey that still carries
  a centimetre figure is refused when it is loaded, rather than priced with the drain missing.
- **Centreline** — while the survey is RUNNING and the GPS is locked, the app records the
  road's centre line: one point roughly every 20 m, at exactly the moments the chainage
  advances. If the chainage is counting, the line is being drawn, and the GPS status line
  shows how many points are held. It costs no extra battery — the fixes were already being
  taken to measure the chainage.
- **Export** — checks, then the survey workbook, the raw data, and the centreline as a
  `.kml` for Google Earth or QGIS: the line itself, a marker every 500 m so a chainage can
  be found on the map, and a pin for every culvert, bridge and gully that had a fix when it
  was recorded.

Chainages are **metres**. 8 km is 8000.

### About the altitude
Each centreline point keeps the phone's altitude where it has one, and the `.kml` carries it
— but the line is drawn **clamped to the ground**, and the altitude must not be used as a
level. Three reasons: a phone's vertical error runs two to three times its horizontal one,
because every satellite is above you and there is nothing below the horizon to balance the
solution; the figure is often missing altogether when the phone positions itself from wifi
rather than satellites; and it is height above the WGS84 *ellipsoid*, not above sea level.
Ghana sits in the Gulf of Guinea geoid low, so these readings are low by a systematic bias
that averaging cannot remove. It is captured because data not captured cannot be recovered
later. Elevations for design come from the DTM.

## Loading a survey into the Master Estimator
Open the exported workbook and `AOK_Master_Estimator_2026_V2.xlsx` side by side. For each of
`A_Corridor`, `B_Drainage`, `C_Pavement` and `D_Points`, copy the data block from row 5 down
and paste it into the same sheet of the estimator at row 5. Do the same for `E_Rules`
(rows 5-9) and the Value column of `F_Road_Data`. Type the road identity on `00_Project` —
the length is measured for you. Then read `90_Checks`.

The exported file also works unchanged with `field_to_stations.py`.

## Version
App 1.7.0, export schema **3**, service worker `bespa-survey-v14`.

Two changes went into 1.7.0 and they are declared differently, on purpose.

The **U-drain legend** did not change the export's *shape* — `udL`/`udR` still carry one
value — so it needs no schema number: the value is now a legend rather than a size, and a
legend is unmistakable on sight. The service checks the value, not the version.

The **centreline** did change the shape: a `track` array, and a position on each point
feature. That is declared as shape 3, and the estimator was widened to read `(1, 2, 3)` in
the same parcel. **The app and the service must therefore deploy together** — an app
exporting shape 3 into a service that reads `(1, 2)` is refused outright, by design.

## Proof it is faithful
The Osubeng example survey captured in this app exports to a workbook that, pasted into the
estimator, reproduces the station schedule cell for cell, and both engines — the workbook
recalculated by LibreOffice and the Python port — price it to the same figure. The
differential proves every ported layer, not just the total.

**The acceptance figure is being re-established.** GH¢18,017,884.18 belonged to a master many
revisions old; it was still written here, and in `tests/test_service.py`, long after the master
it described had been replaced. The sample survey's drains are re-entered as `U-3` in 1.7.0 per
Dr Ampadu's ruling of 28 October, and the new figure will be taken from one clean run of
`tests/differential.py` rather than written down from memory. A figure in this file is only
worth what the thing that checks it says.

## Storage
Everything lives in the phone's own storage until exported. Clearing the browser's site data
erases it. Export at the end of every survey day.
