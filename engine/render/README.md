# Drawing renderers — Prompt 5

Run from the repository root with Python 3.12:

```sh
# Linux: install libcairo2-dev and pkg-config first.
pip install $(python .github/scripts/engine-deps.py)
python -m uvicorn engine.app:app --port 8765
```

`engine.app:app` includes the core router, render router and `/health`. Core's
standalone entrypoint remains usable. The API accepts the approved
[`drawing_request`](../../contracts/render-api.schema.json) on four POST routes:

| Route | Response |
| --- | --- |
| `/render/svg` | SVG with layer groups, object provenance, profile hatches, dimensions and leaders |
| `/render/dxf` | R2013 DXF with editable geometry, HATCH, DIMENSION blocks, TEXT, LEADER and DRAWLOGIC XDATA |
| `/render/pdf` | Cairo vector PDF at the declared scale, title block and blank stamp area |
| `/render/artefacts` | Aligned PNG line-art, planar depth and exact-colour material ID map |

The request contains `ddl` and resolved `conventions`. Responses carry drawing
hash and revision headers; binary formats also carry that identity internally.
Invalid input returns HTTP 422 in the contract's `error` shape. Validation includes
DDL hashes, globally unique IDs, resolved solver state, layer references and
explicit geometry. The renderer rejects missing hatch mappings; a profile's
explicit `null` mapping means unhatched.

## Rendering choices

- Coordinates are converted to millimetres internally. Paper line weights, text
  heights and hatch spacing come from conventions and scale with the drawing.
- The hatch library contains neutral geometry. Profiles select patterns by the
  material category already present in the DDL. The renderer does not choose
  construction materials from jurisdiction or building-type text.
- Object stacking follows DDL layer order, then object order within each layer.
  Annotation text and dimensions are drawn over the geometry.
- Polygon, polyline, rotated rectangle, arc and point geometry are supported.
  SVG/PDF arcs are tessellated; DXF arcs remain editable ARC entities.
- Displayed dimensions currently require positive, resolved linear values that
  match referenced geometry. Other dimension kinds and unresolved `layer_band`
  geometry return an error. No thickness or structural value is filled in.
- The first convention sheet is used for PDF. A drawing that does not fit at its
  declared scale returns an error instead of being resized. The rightmost 90 mm
  of the title block is reserved for the trust assembler's stamp.
- Conditioning images share a grid with a maximum side of 1024 pixels. The
  material map uses stable exact colours keyed by material ID, without blending.
  This 2D renderer has no extrusion: depth is the drawing plane at 0 mm
  (`near_mm == far_mm == 0`); white background is outside model geometry. Stage 3
  must supply actual model depth for 3D conditioning.
- Idea outputs carry the Concept label and cannot export DXF. Learn outputs carry
  Student work and Made with Drawlogic. Final issued exports still require the
  trust assembler, which supplies the actual stamp and workspace/tier information.
- Stable drawing metadata replaces ezdxf's generated times and GUIDs. Cairo uses
  the drawing's creation date. Byte repeatability is verified within the pinned
  environment; font/library differences across operating systems can change bytes.

## Gate status

The independent examiner suite passes **303 tests** against Claude Code's
corrected fixtures at `f6d2623`. Fixture generation also passes its freshness
check and the core validator.

[Evidence](../../docs/evidence/prompt5/README.md) includes two sample exports,
CAD-viewer screenshots and determinism hashes. All 104 combinations of 13
details, two conventions and four routes produce identical bytes across two
complete runs. Both sample DXFs open in the reference CAD viewer with clean
audits, satisfying Prompt 5's visual inspection requirement.
