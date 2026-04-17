import React from 'react';
import InteractionChart from '@/components/InteractionChart';

const StatsPage = () => {
    return (
        <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-10">Friendship Analytics</h1>
                
                <div className="flex justify-center">
                    <InteractionChart />
                </div>
            </div>
        </main>
    );
};

export default StatsPage;