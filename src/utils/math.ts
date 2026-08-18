import katex from 'katex'

/**
 * Renders `$...$` spans inside a card field.
 *
 * Card fields are plain frontmatter strings, so they never pass through remark —
 * this is the only route maths has into them. Display maths ($$) stays a body-only
 * feature; a card is not the place for a centred equation.
 */
export function inlineMath(input: string): string {
  return input.replace(/\$([^$\n]+)\$/g, (_match, tex: string) =>
    katex.renderToString(tex, { throwOnError: false, displayMode: false })
  )
}
