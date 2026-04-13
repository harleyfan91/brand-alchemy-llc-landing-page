/**
 * Splits Vite-imported `.md?raw` files that start with YAML frontmatter (`---`).
 * Returns body markdown and optional `title_tag` / `meta_description` for document head.
 */
export type ParsedArticleFile = {
  body: string;
  titleTag: string | null;
  metaDescription: string | null;
};

export function parseArticleFile(raw: string): ParsedArticleFile {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    return { body: raw, titleTag: null, metaDescription: null };
  }

  const end = trimmed.indexOf('\n---', 3);
  if (end === -1) {
    return { body: raw, titleTag: null, metaDescription: null };
  }

  const yamlBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 4).trimStart();

  const titleMatch = yamlBlock.match(/title_tag:\s*"([^"]*)"/);
  const metaMatch = yamlBlock.match(/meta_description:\s*"([^"]*)"/);

  return {
    body,
    titleTag: titleMatch?.[1] ?? null,
    metaDescription: metaMatch?.[1] ?? null,
  };
}
