"use client";

import { useEffect, useState } from 'react';
import InteractionChart from '@/components/InteractionChart';

const STORAGE_KEY = 'keenkeeper_interactions';

const StatsPage = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    setInteractions(raw ? JSON.parse(raw) : []);
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E293B] mb-10">Friendship Analytics</h1>

        <div className="flex justify-center">
          <InteractionChart interactions={interactions} />
        </div>
      </div>
    </main>
  );
};

export default StatsPage;
