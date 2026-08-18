/**
 * Flattens everything on a card into one lowercase haystack for the search box.
 * Card fields may contain inline HTML, so tags are stripped — otherwise typing
 * "a" would match every entry that happens to contain a link.
 */
export function searchText(data: {
  title: string
  authors?: string
  venue?: string
  why: string
  question: string
  contributions: string[]
  evaluation?: string
  results: string[]
  notes: string[]
  limitations: string[]
}): string {
  return [
    data.title,
    data.authors,
    data.venue,
    data.why,
    data.question,
    data.evaluation,
    ...data.contributions,
    ...data.results,
    ...data.notes,
    ...data.limitations
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}
