import React from "react";
import StatCard from "./StatCard";

const AddFriendSection = () => {
  const stats = [
    { value: 16, label: "Total Friends" },
    { value: 3, label: "On Track" },
    { value: 6, label: "Need Attention" },
    { value: 12, label: "Interactions This Month" },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h1 className="text-3xl font-bold text-slate-800 sm:text-5xl">
          Friends to keep close in your life
        </h1>

        <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mt-6">
          <button className="rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition">
            + Add a Friend
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard key={index} value={item.value} label={item.label} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AddFriendSection;