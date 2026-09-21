#!/usr/bin/env python3
"""
Rebuild the two JSON files the research page needs from a run's results.jsonl.

The CSV export drops several things the run records, and without them the overlap
numbers cannot be read at all — in particular the random-subspace null, which is
what says whether a given angle is alignment or chance.

Usage:
    python3 scripts/extract_research_data.py /path/to/run_folder

Then copy the run's CSVs into src/data/research/ alongside these JSONs:
    summary_all.csv  denominator_all.csv  repro.json
    geometry_<model>.csv  per_layer_<model>.csv
"""
import json
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "research"


def main(run_dir: Path) -> None:
    rows = [json.loads(line) for line in (run_dir / "results.jsonl").open()]

    anisotropy, refs = [], {}
    for r in rows:
        meta, value = r["meta"], r["value"]
        model = meta.get("model", "").split("/")[-1]
        kind = meta.get("k")

        if kind == "anisotropy_v1":
            anisotropy.append(
                {
                    "model": model,
                    "participation_ratio": value["participation_ratio"],
                    "d": value["d"],
                    "layer": meta.get("layer"),
                }
            )
        elif kind == "geometry_v1":
            refs.setdefault(model, {}).update(
                split_half=value["split_half"],
                harmless_noise=value["harmless_noise"],
                null_reduced=value["nulls"]["reduced"]["mean"],
                null_full=value["nulls"]["full"]["mean"],
                P=value["P"],
                d=value["d"],
                K=value["K"],
                shrinkage=value["shrinkage"],
                whitener_valid=value["whitener_valid"],
                n_pool=value["n_pool"],
                layer=value["layer"],
            )
        elif kind == "direction_v1":
            # sep has one entry per layer plus the embedding layer.
            refs.setdefault(model, {}).update(n_layers=len(value["sep"]) - 1)

    (OUT / "anisotropy.json").write_text(
        json.dumps(sorted(anisotropy, key=lambda x: x["model"]), indent=2) + "\n"
    )
    (OUT / "geometry_refs.json").write_text(
        json.dumps([{"model": k, **v} for k, v in sorted(refs.items())], indent=2) + "\n"
    )

    for model, v in sorted(refs.items()):
        if not v.get("whitener_valid", True):
            print(f"  ! {model}: shrinkage {v['shrinkage']:.2f} — whitened column is NOT "
                  f"measuring anisotropy. Do not report it.")
        depth = v["layer"] / v["n_layers"]
        if depth > 0.8:
            print(f"  ! {model}: direction taken at {depth:.0%} depth, past the 0.8L "
                  f"cutoff Arditi et al. use.")

    print(f"wrote anisotropy.json and geometry_refs.json for {len(refs)} models")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
