import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}