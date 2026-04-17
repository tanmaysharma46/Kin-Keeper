"use client";

import { useEffect, useMemo, useState } from "react";
import TimelineCard from "@/components/TimelineCard";

const STORAGE_KEY = 'keenkeeper_interactions';

const TimelinePage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : [];

    const formatted = stored.map((event) => ({
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

    setSavedEvents(formatted);
  }, []);

  const mergedEvents = useMemo(
    () => [...savedEvents].sort((a, b) => b.timestamp - a.timestamp),
    [savedEvents]
  );

  const filteredEvents = useMemo(() => {
    let events = mergedEvents;

    if (filter !== 'all') {
      events = events.filter((item) => item.type.toLowerCase() === filter);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.trim().toLowerCase();
      events = events.filter((item) => item.person.toLowerCase().includes(lowerSearch));
    }

    return events;
  }, [filter, mergedEvents, searchTerm]);

  const visibleEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      switch (sortOption) {
        case 'oldest':
          return a.timestamp - b.timestamp;
        case 'name-asc':
          return a.person.localeCompare(b.person);
        case 'name-desc':
          return b.person.localeCompare(a.person);
        default:
          return b.timestamp - a.timestamp;
      }
    });
  }, [filteredEvents, sortOption]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Timeline</h1>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">Showing {visibleEvents.length} activities</span>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name"
                className="w-full max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="name-asc">Name A → Z</option>
                <option value="name-desc">Name Z → A</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="w-full max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Activity</option>
              <option value="call">Call</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
          </div>
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
