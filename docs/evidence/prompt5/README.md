# Prompt 5 verification — 28 September 2026

Base: `render-interfaces` at `f39ccc0`. Python 3.12.14 on Windows,
ezdxf 1.4.4, Cairo via pycairo 1.29.1, Pillow 12.3.0.

## Examiner gate

```sh
python -m pytest fixtures/render/tests \
  --ignore=fixtures/render/tests/test_stills.py \
  --ignore=fixtures/render/tests/test_preview_video.py -p no:cacheprovider
```

**46 passed, 257 failed.** The failures comprise:

- 253 responses rejecting the 11 DDL fixtures with globally duplicated IDs.
- Four SVG annotation checks raising `TypeError: sequence item 0: expected str
  instance, list found` in the examiner's text extraction at `test_svg.py:99`.

The two valid details, `parapet` and `steel_beam_bearing`, pass 42 renderer checks;
four fixture integrity checks also pass. The examiner has been asked to correct
the fixtures in [issue #12](https://github.com/Akomzy1/drawlogic/issues/12).
No examiner files or contracts were changed for this implementation.

The prerequisite checks pass: 17 core solver cases and 25 profile cases. Ruff and
strict mypy pass for the engine.

## Actual DXF opened in a reference viewer

The unmodified [ezdxf CAD viewer](https://ezdxf.readthedocs.io/en/stable/launcher.html#view)
loaded both exported DXFs from disk. Both audits reported zero errors and zero
repairs. The screenshots below are Qt widget captures of that viewer using
PySide6-Essentials 6.10.2 with the offscreen platform; they are not screenshots of
Drawlogic's SVG renderer. The layer list, real dimension blocks, annotation
leaders and profile hatches are visible.

![Parapet DXF in ezdxf CAD viewer](parapet.cad-viewer.png)

![Steel beam bearing DXF in ezdxf CAD viewer](steel_beam_bearing.cad-viewer.png)

To reproduce interactively, install the viewer's Qt dependency and run:

```sh
ezdxf view docs/evidence/prompt5/parapet.dxf
ezdxf view docs/evidence/prompt5/steel_beam_bearing.dxf
```

## Other outputs and repeatability

Each detail has its original SVG, DXF and PDF export, three conditioning PNGs and
an artefacts metadata JSON. PDF preview PNGs were rendered from the exported PDF
with PDFium (pypdfium2 5.13.0) and visually inspected. The blank box at the bottom
right is the reserved stamp area. Annotation positions come from the fixture DDL.

All four routes were called twice for each valid detail under both `gb-eng` and
`variant` conventions, with more than one second between calls. All 16 response
pairs were byte-identical. [determinism.json](determinism.json) records their SHA256
digests. Concept DXF rejection, malformed JSON, missing request fields and the
shared health route were also checked manually. These smoke checks supplement
the examiner gate; they do not make its failing cases pass.
