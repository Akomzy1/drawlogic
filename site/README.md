# Drawlogic marketing site

Next.js 15 static export of the 12 approved pages in
[`marketing-site.html`](../design/prototype/marketing-site.html).

```sh
npm ci
npm run dev
npm run build
```

The build writes `out/`; crawlers remain blocked before launch. There are no live
account, payment, generation or signing integrations in this marketing preview.

## Design source

The React components, CSS, fonts and media are ported from the approved export.
`src/components/prototype.jsx` contains the components; display strings come from
`content/prototype.json`. `content/routes.json` maps page names to static routes.
The media manifest records each imported asset's original resource ID and SHA256.
No generated media calls are made during import, build or runtime.

`npm run prototype:import` deliberately reimports the approved design. It replaces
the generated component, content, styles and media files, so review its diff before
committing. It applies the PRD pricing corrections recorded in DESIGN_GAPS 18 and
the Lagos currency behaviour in Decision 12. It never edits the prototype or the
independent examiner tests. Open pricing decisions retain the prototype's draft
values; this PR does not settle them or enable purchases.

The superseded Home and its `/home` assets remain in the original `ddl-engine`
worktree. They are not deployed by this site (Decision 16).

## Independent examiner

```sh
cd tests
npm ci
npm test
```

The tests are owned by Claude Code and remain unchanged. On Windows, use
`npm.cmd` if PowerShell blocks `npm.ps1`. Put `REPORTS_DIR` outside OneDrive for
local runs. Every site PR needs prototype comparisons at 375, 768 and 1280 pixels
and the repository fidelity checklist.
