/**
 * Pilot-run data, loaded at build time.
 *
 * The CSVs are imported with Vite's `?raw` so their contents are inlined into the
 * bundle. Reading them with `fs` relative to this module looks fine in dev and
 * breaks in the build, because the module ends up in a chunk directory and the
 * relative path no longer points at the data. This way a rerun means dropping new
 * CSVs in this folder, and the rebuild picks them up.
 */
import summaryCsv from './summary_all.csv?raw'
import denominatorCsv from './denominator_all.csv?raw'
import reproJson from './repro.json'
import anisotropyJson from './anisotropy.json'
import geometryRefsJson from './geometry_refs.json'

const geometryFiles = import.meta.glob('./geometry_*.csv', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const perLayerFiles = import.meta.glob('./per_layer_*.csv', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

function parse<T>(text: string): T[] {
  const [head, ...lines] = text.trim().split('\n')
  const cols = head.split(',')
  return lines.map(
    (line) => Object.fromEntries(line.split(',').map((v, i) => [cols[i], v])) as T
  )
}

/** Short model label, since the full names are long and repetitive. */
export const shortName = (m: string) =>
  m.replace('-Instruct', '').replace('-instruct', '')

export interface SummaryRow extends Record<string, string> {
  model: string
  task: string
  kind: string
  chain: string
  n: string
  clean: string
  abl: string
  delta: string
  lo: string
  hi: string
  sig: string
  gen_tokens: string
}

export const summary = parse<SummaryRow>(summaryCsv)

export const denominator = parse<{
  model: string
  alpha: string
  kl_token: string
  ppl_clean: string
  ppl_abl: string
  ppl_ratio: string
}>(denominatorCsv)

export const repro = reproJson as {
  date: string
  profile: string
  seed: number
  gpu: string
  models: string[]
  refusal_classifier: string
  n_boot: number
}

export const anisotropy = anisotropyJson as {
  model: string
  participation_ratio: number
  d: number
  layer: number
}[]

/**
 * Values the CSV export dropped but the run recorded: the random-subspace null,
 * the split-half ceiling, the harmless-vs-harmless noise reference, the whitener
 * shrinkage, and where the chosen layer sits in the network. Without the null in
 * particular, none of the overlap numbers can be read.
 */
export const geometryRefs = geometryRefsJson as {
  model: string
  split_half: number
  harmless_noise: number
  null_reduced: number
  null_full: number
  P: number
  d: number
  K: number
  shrinkage: number
  whitener_valid: boolean
  n_pool: number
  layer: number
  n_layers: number
}[]

export interface GeometryRow extends Record<string, string> {
  estimator: string
  k: string
  energy_full: string
  min_ang_full: string
  energy_reduced: string
  min_ang_reduced: string
  energy_whitened: string
  min_ang_whitened: string
  model: string
}

export const geometry: GeometryRow[] = Object.values(geometryFiles)
  .flatMap((text) => parse<GeometryRow>(text))
  .sort((a, b) => a.model.localeCompare(b.model))

/**
 * Mean overlap across every layer, reduced vs whitened. The run's own figure
 * caption is explicit that full-d and whitened numbers sit on different chance
 * scales, so reduced-vs-whitened is the only honest comparison.
 */
export const perLayer = Object.values(perLayerFiles)
  .map((text) => {
    const rows = parse<{
      energy_reduced: string
      energy_whitened: string
      model: string
    }>(text)
    const mean = (k: 'energy_reduced' | 'energy_whitened') =>
      rows.reduce((s, r) => s + Number(r[k]), 0) / rows.length
    const red = mean('energy_reduced')
    const whit = mean('energy_whitened')
    return {
      model: rows[0].model,
      layers: rows.length,
      reduced: red,
      whitened: whit,
      dropPct: (1 - whit / red) * 100
    }
  })
  .sort((a, b) => a.model.localeCompare(b.model))

export const models = [...new Set(summary.map((r) => r.model))]

/** The primary math-subspace estimator. The others are controls. */
export const PRIMARY_ESTIMATOR = 'diff_general'

/** diff_general overlap against chance, which is the comparison that carries the result. */
export const primaryOverlap = geometryRefs.map((ref) => {
  const g = geometry.find(
    (x) => x.model === ref.model && x.estimator === PRIMARY_ESTIMATOR
  )!
  return {
    model: ref.model,
    reduced: Number(g.energy_reduced),
    whitened: Number(g.energy_whitened),
    chance: ref.null_reduced,
    reducedVsChance: Number(g.energy_reduced) / ref.null_reduced,
    whitenedVsChance: Number(g.energy_whitened) / ref.null_reduced,
    dropPct: (1 - Number(g.energy_whitened) / Number(g.energy_reduced)) * 100,
    splitHalf: ref.split_half,
    noiseRef: ref.harmless_noise
  }
})
