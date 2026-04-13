/**
 * Splits Vite-imported `.md?raw` files that start with YAML frontmatter (`---`).
 * Returns body markdown and optional `title_tag` / `meta_description` for document head.
 */
export type ParsedArticleFile = {
  body: string;
  titleTag: string | null;
  metaDescription: string | null;
  /** ISO date `YYYY-MM-DD` from frontmatter `date_published`, for article page chrome. */
  datePublished: string | null;
  /** Optional; omit for house pieces. Guest or named co-author only. */
  author: string | null;
};

export function parseArticleFile(raw: string): ParsedArticleFile {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    return { body: raw, titleTag: null, metaDescription: null, datePublished: null, author: null };
  }

  const end = trimmed.indexOf('\n---', 3);
  if (end === -1) {
    return { body: raw, titleTag: null, metaDescription: null, datePublished: null, author: null };
  }

  const yamlBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 4).trimStart();

  const titleMatch = yamlBlock.match(/title_tag:\s*"([^"]*)"/);
  const metaMatch = yamlBlock.match(/meta_description:\s*"([^"]*)"/);
  const dateMatch = yamlBlock.match(/date_published:\s*"([^"]*)"/);
  const authorMatch = yamlBlock.match(/^\s*author:\s*"([^"]*)"/m);

  return {
    body,
    titleTag: titleMatch?.[1] ?? null,
    metaDescription: metaMatch?.[1] ?? null,
    datePublished: dateMatch?.[1]?.trim() ?? null,
    author: authorMatch?.[1]?.trim() || null,
  };
}
