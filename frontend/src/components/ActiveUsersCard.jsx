import React from 'react';

export function ActiveUsersCard({ value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-sm uppercase text-gray-500">Active Users</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
