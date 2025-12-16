import { useMemo } from 'react';
import { parseMarkdown } from '@shared/lib/markdown';
import { useDebounce } from '@shared/hooks';
import './Preview.css';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  // Debounce контента - парсим только после 300ms тишины
  const debouncedContent = useDebounce(content, 300);

  // useMemo - парсим только при изменении debouncedContent
  const html = useMemo(
    () => parseMarkdown(debouncedContent),
    [debouncedContent]
  );

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <span className="preview__label">Preview</span>
      </div>
      <div
        className="preview__content markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
