import { Suspense } from 'react';
import AddFriendSection from "@/components/AddFrinedSection";
import FriendCard from "@/components/FriendCard";
import FriendsSection from "@/components/FriendsSection";
import StatCard from "@/components/StatCard";
import Loader from "@/components/Loader";

async function getFriends() {
  const url = new URL(
    "/friends.json",
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];

  // Small delay to ensure loader shows during development
  await new Promise(resolve => setTimeout(resolve, 1000));

  return res.json();
}

async function HomeContent() {
  await getFriends();
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <AddFriendSection />
      <FriendsSection />
    </main>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={<Loader />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
