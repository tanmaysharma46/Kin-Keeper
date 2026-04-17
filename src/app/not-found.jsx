import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-slate-600 mb-6">Page Not Found</h2>
                <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    Go Home
                </Link>
            </div>
        </div>
    );
}