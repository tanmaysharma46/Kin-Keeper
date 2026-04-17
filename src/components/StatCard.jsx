export default function StatCard({ value, label }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}