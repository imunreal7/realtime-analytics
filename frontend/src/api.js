import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function fetchMetrics() {
  const res = await fetch(`${API_URL}/metrics`);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
}

export function initSocket(onData) {
  const socket = io(API_URL);
  socket.on('metrics', onData);
  return socket;
}
