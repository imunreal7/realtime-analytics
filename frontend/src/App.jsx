// src/App.jsx
import { useState, useEffect } from 'react';
import { fetchMetrics } from './api';
import { PageViewsChart } from './components/PageViewsChart';
import { SessionGauge } from './components/SessionGauge';
import { ActiveUsersCard } from './components/ActiveUsersCard';

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const poll = async () => {
      try {
        const metric = await fetchMetrics();
        setHistory(prev => [...prev.slice(-19), metric]);
      } catch (err) {
        console.error('Failed to fetch metrics', err);
      }
    };
    poll();
    const id = setInterval(poll, 2000);
    return () => clearInterval(id);
  }, []);

  // Derive latest values
  const latest = history[history.length - 1] || {
    active_users: 0,
    page_views: 0,
    avg_session_duration: 0,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActiveUsersCard value={latest.active_users} />
        <SessionGauge value={latest.avg_session_duration} />
      </div>

      <div className="mt-6">
        <PageViewsChart data={history} />
      </div>
    </div>
  );
}

export default App;
