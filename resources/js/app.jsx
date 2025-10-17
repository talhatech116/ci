import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>🚀 Automation Successfull Testing </h1>
      <p>If you see this, deployment is working!</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}