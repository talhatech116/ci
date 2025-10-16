import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Automation Successfull 🎉</h1>
      <p>Congratulations 🎉</p>
    </div>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}
