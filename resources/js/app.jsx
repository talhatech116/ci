import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Hello from React inside Laravel 🎉</h1>
      <p>This React component is rendered within a Blade view.</p>
    </div>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}
