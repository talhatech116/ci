import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '100px',
      backgroundColor: 'red',
      color: 'white',
      padding: '50px',
      fontSize: '30px',
      border: '5px solid yellow'
    }}>
      <h1>🚀 DEPLOYMENT TEST - SEE THIS RED BOX?</h1>
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