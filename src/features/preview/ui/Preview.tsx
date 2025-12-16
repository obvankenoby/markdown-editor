import { parseMarkdown } from '@shared/lib/markdown';

import './Preview.css';
import { useMemo } from 'react';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  const html = useMemo(() => parseMarkdown(content), [content]);
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
