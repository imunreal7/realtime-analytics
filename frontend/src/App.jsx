import { useEffect, useState } from 'react';
import { fetchMetrics, initSocket } from './api';
import ActiveUsersCard from './components/ActiveUsersCard';
import PageViewsChart from './components/PageViewsChart';
import SessionGauge from './components/SessionGauge';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const useWebSocket = true;

    if (useWebSocket) {
      const socket = initSocket(metric => {
        setData(prev => [...prev.slice(-19), metric]);
      });
      return () => socket.disconnect();
    } else {
      const poll = async () => {
        const metric = await fetchMetrics();
        setData(prev => [...prev.slice(-19), metric]);
      };
      poll();
      const id = setInterval(poll, 2000);
      return () => clearInterval(id);
    }
  }, []);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">📊 Real-Time Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActiveUsersCard value={data.at(-1)?.active_users} />
        <SessionGauge value={data.at(-1)?.avg_session_duration} />
      </div>
      <PageViewsChart data={data} />
    </main>
  );
}

export default App;
