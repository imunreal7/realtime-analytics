function ActiveUsersCard({ value }) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <h2 className="text-lg font-semibold">👥 Active Users</h2>
      <p className="text-3xl font-bold">{value ?? '--'}</p>
    </div>
  );
}
export default ActiveUsersCard;
