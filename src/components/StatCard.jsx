export default function StatCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-200/60">
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  );
}
