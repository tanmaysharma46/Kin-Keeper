"use client";

import { useEffect, useMemo, useState } from "react";
import TimelineCard from "@/components/TimelineCard";

const STORAGE_KEY = 'keenkeeper_interactions';

const TimelinePage = () => {
  const [filter, setFilter] = useState('all');
  const [savedEvents] = useState(() => {
    if (typeof window === 'undefined') return [];

    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : [];

    return stored.map((event) => ({
      id: event.id,
      type: event.type,
      person: event.person,
      timestamp: event.timestamp,
      date: new Date(event.timestamp).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }));
  });

  const mergedEvents = useMemo(
    () => savedEvents.sort((a, b) => b.timestamp - a.timestamp),
    [savedEvents]
  );

  const visibleEvents = useMemo(
    () =>
      filter === 'all'
        ? mergedEvents
        : mergedEvents.filter((item) => item.type.toLowerCase() === filter),
    [filter, mergedEvents]
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Timeline</h1>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-slate-500">Showing {visibleEvents.length} activities</span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="bg-white border border-slate-200 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xs p-2.5"
          >
            <option value="all">All Activity</option>
            <option value="call">Call</option>
            <option value="text">Text</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="space-y-2">
          {visibleEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No interactions yet.</p>
              <p className="text-slate-400 text-sm mt-2">Start connecting with your friends to see your timeline here.</p>
            </div>
          ) : (
            visibleEvents.map((item) => (
              <TimelineCard key={`${item.id}-${item.timestamp}`} item={item} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default TimelinePage;
