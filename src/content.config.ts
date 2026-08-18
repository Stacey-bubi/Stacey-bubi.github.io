import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'zod'
import { THEME_KEYS, type ThemeKey } from './data/themes'

/**
 * Frontmatter is everything that shows on the home page card. The MDX body is
 * optional: if a paper has one, it gets its own /papers/<slug>/ page and the
 * card grows a "read the full note" link. If it does not, the card is the
 * whole entry.
 *
 * Card fields are rendered as HTML, so inline <a>, <em> and <code> are allowed,
 * and `$...$` is rendered by utils/math.ts. Keep display equations in the body.
 *
 * The split between fields matters: `contributions` is what the paper itself
 * claims, `notes` is mine. Never let a baseline the paper compares against leak
 * into `contributions`.
 */
const papers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.string().optional(),
    year: z.number().int().min(1990).max(2100),
    venue: z.string().optional(),
    theme: z.enum(THEME_KEYS as [ThemeKey, ...ThemeKey[]]),

    /** Link to the paper. Omitted rather than guessed when unverified. */
    url: z.url().optional(),
    code: z.url().optional(),

    /** The opinionated one-liner. Always visible on the card. */
    why: z.string(),

    question: z.string(),

    /**
     * The only bulleted list on the site, and deliberately so. What this paper
     * contributes in its own right — never the baseline it beats.
     *
     * Everything else (datasets, metrics, baselines, headline numbers, my notes,
     * limitations) belongs in the MDX body as prose. Bulleted lists of those made
     * the page heavy and repeated what the body already said.
     */
    contributions: z.array(z.string()).min(1),

    /** Position in the "start here" reading path. Absent = not in the path. */
    pathOrder: z.number().int().positive().optional(),
    /** One line explaining the paper's role in that path. */
    pathNote: z.string().optional()
  })
})

export const collections = { papers }
