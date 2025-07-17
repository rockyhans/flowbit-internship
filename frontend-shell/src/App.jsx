import React, { useEffect, useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const SupportTicketsApp = React.lazy(() => import('SupportTicketsApp/TicketApp'));

const App = () => {
  const [screens, setScreens] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/me/screens', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setScreens(data));
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar screens={screens} />
        <div style={{ marginLeft: '2rem' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {screens.map((s, i) => (
                <Route key={i} path={`/${s.screenUrl}`} element={<SupportTicketsApp />} />
              ))}
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
