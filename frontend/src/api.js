// src/api.js
export const fetchMetrics = () =>
  fetch('http://localhost:4000/metrics').then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  });
