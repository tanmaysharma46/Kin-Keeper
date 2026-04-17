"use client";

import { useEffect, useMemo, useState } from "react";
import TimelineCard from "@/components/TimelineCard";

const STORAGE_KEY = 'keenkeeper_interactions';

const timelineData = [
  { id: 1, type: "Meetup", person: "Tom Baker", date: "March 29, 2026", timestamp: 1711747200000 },
  { id: 2, type: "Text", person: "Sarah Chen", date: "March 28, 2026", timestamp: 1711660800000 },
  { id: 3, type: "Meetup", person: "Olivia Martinez", date: "March 26, 2026", timestamp: 1711497600000 },
  { id: 4, type: "Video", person: "Aisha Patel", date: "March 23, 2026", timestamp: 1711248000000 },
  { id: 5, type: "Meetup", person: "Sarah Chen", date: "March 21, 2026", timestamp: 1710892800000 },
  { id: 6, type: "Call", person: "Marcus Johnson", date: "March 19, 2026", timestamp: 1710729600000 },
  { id: 7, type: "Meetup", person: "Aisha Patel", date: "March 17, 2026", timestamp: 1710566400000 },
  { id: 8, type: "Text", person: "Olivia Martinez", date: "March 13, 2026", timestamp: 1710201600000 },
  { id: 9, type: "Call", person: "Lisa Nakamura", date: "March 11, 2026", timestamp: 1710048000000 },
  { id: 10, type: "Call", person: "Sarah Chen", date: "March 11, 2026", timestamp: 1710048000000 },
  { id: 11, type: "Video", person: "Marcus Johnson", date: "March 6, 2026", timestamp: 1709644800000 },
  { id: 12, type: "Video", person: "Ryan O'Brien", date: "February 24, 2026", timestamp: 1708771200000 },
];

const TimelinePage = () => {
  const [filter, setFilter] = useState('all');
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    const localEvents = stored.map((event) => ({
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
    setSavedEvents(localEvents);
  }, []);

  const mergedEvents = useMemo(
    () => [...savedEvents, ...timelineData].sort((a, b) => b.timestamp - a.timestamp),
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
          {visibleEvents.map((item) => (
            <TimelineCard key={`${item.id}-${item.timestamp}`} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TimelinePage;
