import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const code = text;
  const language = lang || '';

  if (language && hljs.getLanguage(language)) {
    try {
      const highlighted = hljs.highlight(code, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    } catch (err) {
      console.error('Highlight error:', err);
    }
  }

  const escaped = code.replace(/[&<>"']/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[char];
  });

  return `<pre><code>${escaped}</code></pre>`;
};

marked.use({ renderer });

export function parseMarkdown(markdown: string): string {
  if (!markdown.trim()) {
    return '<p class="empty-state">Start writing to see preview...</p>';
  }

  try {
    // 1. Парсим markdown в HTML
    const rawHtml = marked.parse(markdown) as string;

    // 2. Санитизируем HTML (защита от XSS)
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'strong',
        'em',
        'u',
        'del',
        's',
        'a',
        'img',
        'ul',
        'ol',
        'li',
        'blockquote',
        'pre',
        'code',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'hr',
        'span', // Для highlight.js
      ],
      ALLOWED_ATTR: [
        'href',
        'target',
        'rel', // Для ссылок
        'src',
        'alt',
        'title', // Для изображений
        'class', // Для highlight.js и стилизации
        'id', // Для якорей заголовков
      ],
    });

    return cleanHtml;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p class="error-state">Error parsing markdown</p>';
  }
}
