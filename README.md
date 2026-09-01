# Bespa Road Condition Survey App — field capture (Phase 1)

Offline-first web app created by Dr. Kwasi Osafo Ampadu for Department of Feeder Roads for condition surveys. It captures what the
crew sees and exports a workbook to the Master Estimator for producing a BOQ on the desktop. It is basically a Field Survey Form to capture data for further processing with an Excel file "BESPA_Master_Estimator_2026_V2". **The App does produces not produce a
bill and holds no rates** — pricing, taking-off and the BOQ stay on the desktop.

## Files
| File | What it is |
|---|---|
| `bespa-survey.html` | The whole app. One self-contained file, no dependencies, no internet needed. |
| `manifest.webmanifest` | Lets Android install it to the home screen as an app. |
| `sw.js` | Service worker — caches the app so it opens with no signal. |
| `icon.svg` | Home-screen icon. |

## Putting it on the crews' phones
1. Copy all four files to any HTTPS address — a DFR intranet server, GitHub Pages, Netlify.
   They must sit in the same folder. **HTTPS is required** for GPS and for offline install.
2. On the phone, open that address in Chrome and choose *Add to Home screen*.
3. Open it once with signal so the service worker caches it. After that it runs offline.

Opening `bespa-survey.html` straight off the phone's storage also works — you lose the
home-screen install and GPS, but capture and export still run.

## Using it
- **Setup** — road identity, Form E treatment rules, Form F constants. A red `!` marks a
  template figure not yet confirmed for this road.
- **Survey** — set what is true where you stand, walk to where it changes, tap
  *End stretch here*. The next stretch starts at that chainage carrying the settings forward,
  so gaps and overlaps cannot be created.
- **Points** — culverts, bridges, gullies, turnouts and pitching at the current chainage, with a photo.
- **Export** — checks, then the survey workbook.

Chainages are **metres**. 8 km is 8000.

## Loading a survey into the Master Estimator
Open the exported workbook and `AOK_Master_Estimator_2026.xlsx` side by side. For each of
`A_Corridor`, `B_Drainage`, `C_Pavement` and `D_Points`, copy the data block from row 5 down
and paste it into the same sheet of the estimator at row 5. Do the same for `E_Rules`
(rows 5-9) and the Value column of `F_Road_Data`. Type the road identity on `00_Project` —
the length is measured for you. Then read `90_Checks`.

The exported file also works unchanged with `field_to_stations.py`.

## Proof it is faithful
The Osubeng survey captured in this app exports to a workbook that, pasted into the estimator,
reproduces the station schedule cell for cell — 6,080 cells, zero mismatches — and prices to
GH¢16,950,034.28, the same figure the Python converter produces.

## Storage
Everything lives in the phone's own storage until exported. Clearing the browser's site data
erases it. Export at the end of every survey day.
