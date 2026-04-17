export default function FriendCard({ friend }) {
  const statusStyles = {
    Overdue: "bg-rose-500/10 text-rose-600",
    "Almost Due": "bg-amber-200/80 text-amber-900",
    "On Track": "bg-emerald-600/10 text-emerald-900",
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-center">
        <img src={friend.avatar} alt={friend.name} className="h-24 w-24 rounded-full object-cover" />
      </div>
      <div className="mt-5 text-center">
        <h3 className="text-lg font-semibold text-slate-900">{friend.name}</h3>
        <p className="mt-2 text-sm text-slate-500">{friend.lastSeen}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
          {friend.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-800">
              {tag}
            </span>
          ))}
        </div>
        <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[friend.status] ?? "bg-slate-100 text-slate-700"}`}>
          {friend.status}
        </span>
      </div>
    </article>
  );
}
