const modules = (import.meta as any).glob(['./**/*.md', '../docs/**/*.md', '../README.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const findContent = (link: string) => {
  for (const path in modules) {
    if (path.endsWith(link)) {
      return modules[path];
    }
  }
  return '';
};

export const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\uAC00-\uD7A3-]/g, '');
};

export const getSnippet = (content: string, term: string) => {
  if (!term || !content) return '';
  const lowerContent = content.toLowerCase();
  const index = lowerContent.indexOf(term);
  if (index === -1) return '';
  const start = Math.max(0, index - 30);
  const end = Math.min(content.length, index + term.length + 30);
  let snippet = content.substring(start, end).replace(/\s+/g, ' ');
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet += '...';
  return snippet;
};