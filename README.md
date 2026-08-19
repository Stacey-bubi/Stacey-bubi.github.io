# Papers I keep coming back to

An annotated, opinionated list of papers on the geometry of representation spaces
inside language models, and the attacks and defenses that live in that geometry.

Built with Astro, deployed to GitHub Pages at
<https://stacey-bubi.github.io/>.

## Running it

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on <http://localhost:4321> |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serves the built site on <http://localhost:4322> |
| `npm run check` | Type-checks Astro, TypeScript and content frontmatter |

## Adding a paper

Create `src/content/papers/<slug>.mdx`. The slug becomes the URL and the anchor
on the home page.

```mdx
---
title: Paper title exactly as published
authors: Surname, Surname, Surname
year: 2025
venue: NeurIPS 2025          # omit if unpublished
theme: geometry              # geometry | erasure | attack | defense | internals | tooling
url: https://arxiv.org/abs/…  # omit rather than guess
code: https://github.com/…    # optional
why: One line. The opinionated hook, always visible on the card.
question: What the paper is asking. One short paragraph.
contributions:
  - What the paper contributes, in its own right. 3–4 bullets.
pathOrder: 3                 # optional: position in the "start here" path
pathNote: One line on its role in that path.
---

The MDX body. Datasets, metrics, baselines, headline numbers, my notes and the
limitations all live here, as prose. Its presence creates the /papers/<slug>/ page
and the "read the full note" link on the card.
```

Notes on the fields:

- **`contributions` is the only bulleted list on the site, and that is deliberate.**
  Lists of results, notes and limitations made every entry heavy and repeated what
  the body already said, so they were folded into the prose. Resist adding them back.
- **`contributions` is what the paper claims; the body is where I argue with it.**
  A baseline the paper compares against does not belong in `contributions`.
- Do not restate datasets and metrics unless they *are* the contribution. Name a
  method in a few words if it matters (RDO, MSO, concept scrubbing) and let the body
  explain it.
- Card fields accept inline HTML (`<em>`, `<code>`, `<a>`) and inline maths with
  `$…$`, rendered by `src/utils/math.ts`. Display maths (`$$…$$`) only works in
  the body.
- Escape backslashes in frontmatter maths: `$r = \\mu - \\nu$`.
- The body is indexed by the search box (see `src/utils/search.ts`), so notes stay
  findable even though they are no longer structured fields.
- **Never guess a URL.** Omit the field instead. Check links with:

  ```bash
  grep -ohE 'https?://[^ )"<>]+' src/content/papers/*.mdx | sort -u | while read -r u; do echo "$(curl -sIL -o /dev/null -w '%{http_code}' "$u")  $u"; done
  ```

Papers not yet written up go in `src/data/reading-list.ts` as title, theme and a
verified link — no invented summaries.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. The repository needs **Settings → Pages → Source: GitHub
Actions** set once, by hand.

`site` and `base` are the first two constants in `astro.config.mjs`. A repo named
`<user>.github.io` uses `base: '/'`; any other name needs `base: '/<repo>'`.
Getting this wrong is the classic "site deploys but every stylesheet 404s".

