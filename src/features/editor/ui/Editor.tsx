import './Editor.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="editor">
      <div className="editor__toolbar">
        <span className="editor__label">Markdown</span>
      </div>
      <textarea
        className="editor__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your markdown..."
        spellCheck={false}
      />
    </div>
  );
}
