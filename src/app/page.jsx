import { Suspense } from 'react';
import AddFriendSection from "@/components/AddFrinedSection";
import FriendsSection from "@/components/FriendsSection";
import Loader from "@/components/Loader";

export const dynamic = 'force-dynamic';

async function HomeContent() {
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
