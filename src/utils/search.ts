/**
 * Flattens a paper into one lowercase haystack for the search box.
 *
 * Since notes and limitations now live in the MDX body rather than frontmatter,
 * the body has to be indexed too, or searching for a term from someone's own
 * notes would find nothing. HTML tags, maths and markdown punctuation are
 * stripped so a query like "a" does not match every entry containing a link,
 * and so LaTeX control words never surface as matches.
 */
export function searchText(
  data: {
    title: string
    authors?: string
    venue?: string
    why: string
    question: string
    contributions: string[]
  },
  /** Raw MDX body, so search reaches the prose that is no longer in frontmatter. */
  body = ''
): string {
  return [
    data.title,
    data.authors,
    data.venue,
    data.why,
    data.question,
    ...data.contributions,
    body
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ') // display maths
    .replace(/\$[^$\n]*\$/g, ' ') // inline maths
    .replace(/<[^>]+>/g, ' ') // html tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links, keep the text
    .replace(/[#*_`>|-]+/g, ' ') // markdown punctuation
    .replace(/\s+/g, ' ')
    .toLowerCase()
}
