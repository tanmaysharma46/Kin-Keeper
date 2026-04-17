import Image from 'next/image';
import Link from 'next/link';

export default function FriendCard({ friend }) {
  const statusConfig = {
    overdue: { label: "Overdue", class: "bg-rose-500 text-white" },
    active: { label: "On Track", class: "bg-emerald-900 text-white" },
    almost_due: { label: "Almost Due", class: "bg-amber-400 text-white" },
  };

  const currentStatus = statusConfig[friend.status] || { label: friend.status, class: "bg-slate-100 text-slate-700" };

  return (
    <Link href={`/friends-details/${friend.id}`}>
      <article className="rounded-sm border border-slate-100 bg-white p-8 shadow-sm transition flex flex-col items-center cursor-pointer h-full">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-slate-50">
          <Image
            src={friend.picture}
            alt={friend.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="mt-5 text-center w-full">
          <h3 className="text-xl font-bold text-slate-800">{friend.name}</h3>
          <p className="mt-1 text-sm text-slate-400 font-medium">
            {friend.days_since_contact}d ago
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <span className={`inline-flex rounded-full px-5 py-1.5 text-xs font-bold ${currentStatus.class}`}>
              {currentStatus.label}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}