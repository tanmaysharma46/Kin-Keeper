"use client"; // Next.js App Router হলে এটি প্রয়োজন
import React, { useEffect, useState } from 'react';
import FriendCard from './FriendCard';

const FriendsSection = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // public/friends.json থেকে ডেটা লোড করা
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Error loading friends data:", err));
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-10 ml-2">Your Friends</h2>
        
        {/* ৪ কলামের গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FriendsSection;