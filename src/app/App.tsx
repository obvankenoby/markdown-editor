import { ThemeProvider } from '@app/providers/ThemeProvider.tsx';
import { SplitPane, ThemeToggle } from '@shared/ui';
import './styles/App.css';
import { Editor } from '@features/editor/ui';
import { Preview } from '@features/preview/ui';
import { useLocalStorage } from '@shared/hooks';

const DEFAULT_MARKDOWN = `# Welcome to Markdown Editor

  Start writing your markdown here!

  ## Features

  - **Live Preview** with syntax highlighting
  - **Dark/Light Theme** support
  - **Auto-save** to localStorage
  - **Resizable panels**

  ## Code Example

  \`\`\`javascript
  function greet(name) {
    console.log(\`Hello, \${name}!\`);
  }

  greet('World');
  \`\`\`

  > Happy writing! 🚀
  `;

function App() {
  const [markdown, setMarkdown] = useLocalStorage(
    'markdown-content',
    DEFAULT_MARKDOWN
  );

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app__header">
          <h1>Markdown Editor</h1>
          <ThemeToggle />
        </header>
        <main className="app__main">
          <SplitPane
            left={<Editor value={markdown} onChange={setMarkdown} />}
            right={<Preview content={markdown} />}
            defaultSize={50}
            minSize={30}
            maxSize={70}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
