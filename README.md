# ☕ CaféList - Kavárny v Hradci Králové

Webová aplikace pro vyhledávání a hodnocení kaváren v Hradci Králové. Najdi tu nejlepší kavárnu pro práci, studium nebo posezení s přáteli.

🔗 **Živá aplikace:** [cafelist-app.vercel.app](https://cafelist-app.vercel.app/)

## ✨ Funkce

- **🗺️ Interaktivní mapa** - Zobrazení kaváren na mapě s piny a vaší polohou
- **⭐ Hodnocení a recenze** - Hvězdičkové hodnocení 1-5 s textovými recenzemi
- **🔍 Vyhledávání** - Hledání podle názvu nebo adresy
- **🏷️ Filtry** - Specialty káva, klidné prostředí, zákusky, historické
- **📍 Řazení podle vzdálenosti** - Nejbližší kavárny na základě vaší polohy
- **📥 Import/Export CSV** - Hromadný import a export dat (admin)
- **👤 Uživatelské role** - Admin může přidávat, editovat a mazat kavárny

## 🛠️ Použité technologie

- **Next.js 15** - React framework s App Router
- **TypeScript** - Typovaný JavaScript
- **Supabase** - Backend as a Service (databáze, auth)
- **Leaflet.js** - Interaktivní mapy
- **Vercel** - Hosting a deployment

## 🚀 Lokální spuštění

1. **Naklonuj repozitář:**
   ```bash
   git clone https://github.com/7Tristan7/cafelist-app.git
   cd cafelist-app
   ```

2. **Nainstaluj závislosti:**
   ```bash
   npm install
   ```

3. **Nastav environment proměnné:**
   Vytvoř soubor `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Spusť vývojový server:**
   ```bash
   npm run dev
   ```

5. **Otevři v prohlížeči:**
   [http://localhost:3000](http://localhost:3000)

## 📁 Struktura projektu

```
cafelist-app/
├── app/
│   ├── components/     # React komponenty (CafeMap, CafeGrid, StarRating...)
│   ├── cafes/          # Stránky kaváren (detail, edit, new)
│   ├── api/            # API routes (export, import)
│   ├── hooks/          # Custom hooks
│   └── page.tsx        # Hlavní stránka
├── utils/
│   └── supabase/       # Supabase client
└── public/             # Statické soubory
```

## 👨‍💻 Autor

Vytvořeno jako školní projekt pro rok 2024/2025.

## 📄 Licence

MIT
