# Prompt 3 profile examination

The production profiles are Claude Code's to author. These tests do not accept the synthetic Prompt 2 profile fixtures in their place.

Run from the repository root:
```
python -m pytest -c trust/tests/pytest.ini -m "profiles and not runtime" -q
python -m pytest -c trust/tests/pytest.ini -m profiles -q
```

The first command gates profile documents and coverage generation without an engine. The second additionally checks real core interpretation with the authored defaults. Missing profiles fail with PROFILE_UNAVAILABLE; nothing is skipped. These tests carry the profiles marker, not fixtures, so the existing Prompt 2 fixture CI remains green before Prompt 3 is implemented. Add the first command to CI when Prompt 3 lands; add the second when core interpretation is available. Existing core-runtime CI selects named files and will not automatically include this new file.

Each profiles/<id>/ directory must contain exactly one root-level JSON document with metadata.id matching the directory. The filename is unconstrained. Required IDs: generic, gb-eng-residential, us-ibc-base, ng-la. All begin at 0.1.0. US and Lagos remain no-rule stubs; this does not decide their future launch tiers.

Coverage callable proposed for the builder: profiles.coverage:generate_coverage(profile) -> coverage object. It must be pure, derive counts/categories from rules, ignore stale stored coverage, and return the same object for the same input. The paragraph names the profile/version and stubs explicitly say “no rules yet”. This callable is an examiner binding, not a contract-schema edit; if the implementation exposes a different location, change the binding with examiner review, not the assertions.

The tests cover schema validation; unsigned/unverified rules with readable why-text; complete conventions; material references; all 13 FR-23 GB detail types and Draft/Idea constraint lists; engineering constraints with no default; Generic FR-34 topics; GB document references; coverage mutations; and FR-06–09 defaults. Generic region keys follow the schema/PRD examples: west_africa_coastal, gulf, northern_europe. No regulatory threshold is invented here.

Data tests inspect the materials actually referenced by wall build-ups, not just profile names. Runtime tests use authored profiles and require Generic fallbacks to be ai_inferred with verify=true, while jurisdiction defaults retain profile ID/version provenance. Prompt 2 already tests explicit client/user overrides; these remain separate from the no-instruction default cases.

Plain-language automation rejects empty/placeholder explanations and requires a sentence; human review still decides whether the reason is understandable.

The suite contains 25 profile-data cases and 23 runtime cases. Runtime coverage includes Draft and Idea, convention-only client/office overlays, all three Generic regions, and a Draft confirmation question for inferred wall construction. Referenced typical-detail DDL must exist, validate, and preserve the jurisdiction's default materials. Renderer material-map checks remain Claude Code's examination responsibility for Prompt 5/12.

Coverage statements include the tier where one applies and identify the unsigned state. Generic's null tier is permitted by the approved schema. Rule display conditions are checked against the contract's condition-text renderer.
