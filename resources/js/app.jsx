// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import HomePage from './pages/HomePage';


// function App() {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// }

// const app = document.getElementById('app');
// if (app) {
//   const root = createRoot(app);
//   root.render(<App />);
// }

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import HomePage from './pages/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <AuthProvider> {/* Wrap everything with AuthProvider */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const app = document.getElementById('app');
if (app) {
  const root = createRoot(app);
  root.render(<App />);
}

export default App;