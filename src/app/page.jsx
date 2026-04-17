

async function getFriends() {
  const url = new URL(
    "/friends.json",
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">



      <main className="mx-auto max-w-7xl px-6 py-16">


    


      </main>

    </div>
  );
}
