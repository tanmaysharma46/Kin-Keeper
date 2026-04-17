import AddFriendSection from "@/components/AddFrinedSection";
import FriendCard from "@/components/FriendCard";
import FriendsSection from "@/components/FriendsSection";
import StatCard from "@/components/StatCard";

async function getFriends() {
  const url = new URL(
    "/friends.json",
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const friends = await getFriends();
  const totalFriends = friends.length;
  const overdueCount = friends.filter((friend) => friend.status?.toLowerCase() === "overdue").length;
  const onTrackCount = friends.filter((friend) => friend.status?.toLowerCase() === "active").length;
  const needAttentionCount = friends.filter(
    (friend) =>
      friend.status?.toLowerCase() === "almost due" || friend.status?.toLowerCase() === "overdue"
  ).length;
  const displayFriends = friends.slice(0, 12);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">



      <main className="mx-auto max-w-7xl px-6 py-16">
        <AddFriendSection/>
        <FriendsSection/>
      </main>

    </div>
  );
}
