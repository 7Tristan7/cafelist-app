import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: cafes } = await supabase.from('cafes').select('*');

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">CaféList - Hradec Králové</h1>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cafes?.map((cafe) => (
          <div key={cafe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{cafe.name}</h2>
                {cafe.rating && <span className="text-amber-500 font-bold">★ {cafe.rating}</span>}
              </div>
              <p className="text-gray-600 text-sm mb-4">{cafe.address}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {cafe.has_wifi && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">WiFi</span>}
                {cafe.noise_level === 'tiché' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Tiché</span>}
              </div>
            </div>
          </div>
        ))}
        {(!cafes || cafes.length === 0) && (
          <p className="text-center text-gray-500 col-span-full">Žádné kavárny nenalezeny. Zkontrolujte připojení k databázi.</p>
        )}
      </div>
    </main>
  );
}
