import { useState } from 'react';

function App() {
  const [theme] = useState<'light' | 'dark'>('light');

  document.documentElement.setAttribute('data-theme', theme);

  return (
    <div className="app">
      <h1>Markdown Editor</h1>
      <p>Theme: {theme}</p>
    </div>
  );
}

export default App;
