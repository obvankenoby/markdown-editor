import { ThemeProvider } from '@app/providers/ThemeProvider.tsx';
import { SplitPane, ThemeToggle } from '@shared/ui';
import './styles/App.css';
import { Editor } from '@features/editor/ui';
import { Preview } from '@features/preview/ui';
import { useState } from 'react';

function App() {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello World\n\nStart writing your markdown here!'
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
