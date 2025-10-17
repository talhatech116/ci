import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>🚀 Automation working !</h1>
      <p>If you see this, Laravel and React is working!</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}