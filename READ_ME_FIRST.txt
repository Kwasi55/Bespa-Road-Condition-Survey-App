UPLOAD THESE FIVE FILES TO GITHUB - ALL IN ONE COMMIT
=====================================================
Repo: kwasi55/Bespa-Road-Condition-Survey-App, branch main, at the
ROOT of the repo. That is where the live files are.

Select the five FILES inside this folder. Do not drag the folder
itself - GitHub would create a subfolder of that name in the repo.
Leave READ_ME_FIRST.txt behind; it is not for the repo.

  890b75792d66a32d    119067 bytes  bespa-survey.html
  28df54399c81c8c9       858 bytes  index.html
  374654a3d29949eb       710 bytes  sw.js
  00ed2310d637fd1f       475 bytes  manifest.webmanifest
  2b395a3c6fd8ad97      7827 bytes  README.md


icon.png is unchanged and must NOT be re-uploaded.
icon.svg sits in the staging folder but is not in the repo and is
referenced by nothing. It is a leftover. Do not upload it.

WHY ONE COMMIT AND NOT FIVE
---------------------------
sw.js becomes cache "bespa-survey-v14" and both caches and falls back
to ./bespa-survey.html. If the worker goes up without the app, or the
app without the worker, the offline fallback points at a file that is
not there. One commit, five files.

WHAT IS LIVE RIGHT NOW
----------------------
The site serves TWO DIFFERENT APPS:
  index.html          112,239 bytes  APP_VERSION 1.6.0, schema 2
  bespa-survey.html    53,183 bytes  no version constant at all
The README has been claiming these two were kept identical. They were
never close. The manifest's start_url is "./" and sw v13 caches
./index.html, so every installed phone launches the 1.6.0 app and the
53 KB file is an orphan no installed app has ever used. Anyone holding
that direct link, though, has been using a version with no version.

AFTER THIS UPLOAD
-----------------
  bespa-survey.html   the app: 1.7.0, export schema 3, seven U-drain
                      legends, GPS centreline, KML export
  index.html          an 858-byte redirect, no logic, so it cannot
                      drift from the app again
  sw.js               cache v14 - the line that makes an already
                      installed phone see the change at all
  manifest            start_url ./bespa-survey.html

A phone still on 1.6.0 exports schema 2, which the service accepts, so
nobody in the field is stranded. The service is already deployed and
proven: bespa-rdestimate:proven-2026-10-29, READS_SCHEMA (1, 2, 3),
44 tests passing.

EDITORIAL CHANGES IN THIS SET, ON YOUR RULING OF 29 OCTOBER
-----------------------------------------------------------
  * Your authorship credit is restored to the README. An earlier
    rewrite had dropped it.
  * DFR is out of all five files - the README's two mentions, the
    app's footer line, and the manifest's description, which is
    public and shows in the installed app's metadata. The functional
    road type FEEDER ROAD (DFR) is untouched: the app does not carry
    a road-type list at all.
  * The header's visible name now reads "Bespa Road Condition Survey
    App". That one span said "Bespa Road Condition Survey" without
    the "App" while the title, the footer, the export header and the
    manifest's name all carried the full name. All five agree now.
  * APP_VERSION stays 1.7.0. boq_agent compares the app's version to
    AGENT_VERSION for equality and warns "keep them in step" when
    they differ, so bumping to 1.7.1 for a text change would put that
    notice on every upload from the field.

The staging folder Field_App/github_pages/ and Field_App/README.md
have been updated to match these files exactly, so the staging copy
does not drift from what is published.

AFTER UPLOADING
---------------
Hard-reload https://kwasi55.github.io/Bespa-Road-Condition-Survey-App/
and check the version line reads 1.7.0. On a phone that already has
the app installed, open it twice: the first open installs the new
worker, the second serves it.
