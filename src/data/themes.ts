/**
 * The six buckets papers get sorted into. `order` fixes the order of sections on
 * the home page; `hue` is fed straight into the chip colours in global.css so a
 * theme only ever needs its colour defined in one place.
 */
export const THEMES = {
  geometry: {
    label: 'Geometry of the space',
    blurb:
      'What the inside of a model actually looks like, and whether our usual tools for measuring it are trustworthy.',
    order: 1,
    hue: 258
  },
  erasure: {
    label: 'Erasing a concept',
    blurb:
      'Methods for removing information from activations or weights, and what they cost you.',
    order: 2,
    hue: 194
  },
  attack: {
    label: 'Attacks',
    blurb: 'Ways to take the safety behaviour off a model that already has it.',
    order: 3,
    hue: 8
  },
  defense: {
    label: 'Defenses',
    blurb: 'Attempts to make that harder.',
    order: 4,
    hue: 152
  },
  internals: {
    label: 'How the computation works',
    blurb:
      'Papers about the mechanism itself rather than about the shape of the space.',
    order: 5,
    hue: 34
  },
  tooling: {
    label: 'Benchmarks and tooling',
    blurb: 'The things you need before you can measure any of the above.',
    order: 6,
    hue: 320
  }
} as const

export type ThemeKey = keyof typeof THEMES

export const THEME_KEYS = Object.keys(THEMES) as ThemeKey[]

export const THEMES_IN_ORDER = THEME_KEYS.map((key) => ({
  key,
  ...THEMES[key]
})).sort((a, b) => a.order - b.order)
