"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Bell, Archive, Trash2, Phone, MessageSquare, Video } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STORAGE_KEY = 'keenkeeper_interactions';

const FriendsDetails = () => {
    const { id } = useParams();
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        fetch('/friends.json')
            .then((res) => res.json())
            .then((data) => {
                const foundFriend = data.find((f) => f.id === parseInt(id, 10));
                setFriend(foundFriend);
            })
            .catch((err) => console.error('Error loading friend details:', err));
    }, [id]);

    const loadInteractions = () => {
        if (typeof window === 'undefined') return [];
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    };

    const saveInteraction = (interaction) => {
        const existing = loadInteractions();
        const next = [interaction, ...existing];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
    };

    const handleAction = (type) => {
        if (!friend) return;

        const message = `${type} with ${friend.name}`;
        toast.success(message, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: false,
            theme: 'dark',
        });

        saveInteraction({
            id: Date.now(),
            type,
            person: friend.name,
            timestamp: Date.now(),
        });
    };

    if (!friend) return <div className="p-8 text-center">Loading...</div>;

    const statusConfig = {
        overdue: { label: 'Overdue', class: 'bg-rose-500 text-white' },
        active: { label: 'On Track', class: 'bg-emerald-900 text-white' },
        almost_due: { label: "Almost Due", class: "bg-amber-400 text-white" },

    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
                        <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden border-2 border-slate-50">
                            <Image src={friend.picture} alt={friend.name} fill className="object-cover" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">{friend.name}</h2>
                        <div className="mt-2 flex flex-col items-center gap-2">
                            <span className={`text-[10px] font-bold px-4 py-1 rounded-full uppercase ${statusConfig[friend.status]?.class || 'bg-slate-100'}`}>
                                {statusConfig[friend.status]?.label || friend.status}
                            </span>
                            <div className="flex gap-2 flex-wrap justify-center">
                                {friend.tags.map((tag) => (
                                    <span key={tag} className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-4 py-1 rounded-full uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="mt-6 text-slate-400 italic text-sm font-medium">&ldquo;{friend.bio}&rdquo;</p>
                        <p className="text-slate-400 text-xs mt-1">Email: {friend.email}</p>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full bg-white border border-slate-100 py-3 rounded-xl shadow-sm text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                            <Bell size={18} /> Snooze 2 Weeks
                        </button>
                        <button className="w-full bg-white border border-slate-100 py-3 rounded-xl shadow-sm text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                            <Archive size={18} /> Archive
                        </button>
                        <button className="w-full bg-white border border-slate-100 py-3 rounded-xl shadow-sm text-rose-500 font-semibold flex items-center justify-center gap-2 hover:bg-rose-50 transition">
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-8 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                            <h4 className="text-3xl font-bold text-slate-700">{friend.days_since_contact}</h4>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Days Since Contact</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                            <h4 className="text-3xl font-bold text-slate-700">{friend.goal}</h4>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Goal (Days)</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                            <h4 className="text-xl font-bold text-emerald-900">{friend.next_due_date}</h4>
                            <p className="text-slate-400 text-xs mt-1 font-medium">Next Due</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-emerald-900">Relationship Goal</h3>
                            <button className="bg-slate-50 text-slate-600 px-4 py-1 rounded-md text-sm font-semibold border border-slate-200">Edit</button>
                        </div>
                        <p className="text-slate-500 text-sm">Connect every <span className="font-bold text-slate-800">{friend.goal} days</span></p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-emerald-900 mb-6">Quick Check-In</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => handleAction('Call')}
                                className="flex flex-col items-center justify-center gap-3 bg-slate-50/50 border border-slate-100 p-6 rounded-2xl hover:bg-slate-100 transition"
                            >
                                <Phone className="text-slate-700" size={24} />
                                <span className="text-slate-700 font-semibold">Call</span>
                            </button>
                            <button
                                onClick={() => handleAction('Text')}
                                className="flex flex-col items-center justify-center gap-3 bg-slate-50/50 border border-slate-100 p-6 rounded-2xl hover:bg-slate-100 transition"
                            >
                                <MessageSquare className="text-slate-700" size={24} />
                                <span className="text-slate-700 font-semibold">Text</span>
                            </button>
                            <button
                                onClick={() => handleAction('Video')}
                                className="flex flex-col items-center justify-center gap-3 bg-slate-50/50 border border-slate-100 p-6 rounded-2xl hover:bg-slate-100 transition"
                            >
                                <Video className="text-slate-700" size={24} />
                                <span className="text-slate-700 font-semibold">Video</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default FriendsDetails;
