-- SQL Fix pro CaféList
-- Tento skript spustíte v Supabase SQL Editoru (Dashboard -> SQL Editor -> New Query)

-- 1. Přidání sloupce pro otevírací dobu
ALTER TABLE cafes ADD COLUMN IF NOT EXISTS opening_hours JSONB;

-- 2. Vytvoření tabulky pro oblíbené (pokud neexistuje)
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cafe_id BIGINT REFERENCES cafes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cafe_id)
);

-- 3. Aktualizace View pro hodnocení a souřadnice
CREATE OR REPLACE VIEW cafes_with_ratings AS
SELECT 
    c.*,
    COALESCE(AVG(r.stars), 0) as avg_rating,
    COUNT(r.stars) as rating_count
FROM cafes c
LEFT JOIN ratings r ON c.id = r.cafe_id
GROUP BY c.id;

-- 4. RLS Politiky pro oblíbené
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own favorites" ON favorites;
CREATE POLICY "Users can manage their own favorites"
ON favorites FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. Seeding všech 10 kaváren (staré i nové)
-- Poznámka: ON CONFLICT vyžaduje unikátní index na jménu
CREATE UNIQUE INDEX IF NOT EXISTS cafes_name_idx ON cafes (name);

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic, opening_hours)
VALUES 
('Kavárna U Stříbrného groše', 'Malé náměstí 12, Hradec Králové', 'Tradiční kavárna s historií sahající až do 19. století.', 50.2092, 15.8328, true, 'střední', true, true, false, true, '{"mon": {"open": "08:00", "close": "20:00"}, "tue": {"open": "08:00", "close": "20:00"}, "wed": {"open": "08:00", "close": "20:00"}, "thu": {"open": "08:00", "close": "20:00"}, "fri": {"open": "08:00", "close": "22:00"}, "sat": {"open": "09:00", "close": "22:00"}, "sun": {"open": "10:00", "close": "18:00"}}'),
('Coffee Time', 'Gočárova třída 123, Hradec Králové', 'Moderní prostor pro práci i odpočinek. Výborná výběrová káva.', 50.2103, 15.8256, true, 'tiché', true, false, true, false, '{"mon": {"open": "07:00", "close": "18:00"}, "tue": {"open": "07:00", "close": "18:00"}, "wed": {"open": "07:00", "close": "18:00"}, "thu": {"open": "07:00", "close": "18:00"}, "fri": {"open": "07:00", "close": "19:00"}, "sat": {"open": "08:00", "close": "17:00"}, "sun": {"open": "closed", "close": "closed"}}'),
('Café Adria', 'Pospíšilova 345, Hradec Králové', 'Útulná kavárna s velkým výběrem zákusků.', 50.2078, 15.8412, false, 'hlučné', false, true, false, false, '{"mon": {"open": "09:00", "close": "21:00"}, "tue": {"open": "09:00", "close": "21:00"}, "wed": {"open": "09:00", "close": "21:00"}, "thu": {"open": "09:00", "close": "21:00"}, "fri": {"open": "09:00", "close": "22:00"}, "sat": {"open": "10:00", "close": "22:00"}, "sun": {"open": "10:00", "close": "20:00"}}'),
('Black Coffee', 'Okružní 789, Hradec Králové', 'Minimalistický design a maximální chuť.', 50.2156, 15.8234, true, 'střední', true, false, true, false, '{"mon": {"open": "08:00", "close": "18:00"}, "tue": {"open": "08:00", "close": "18:00"}, "wed": {"open": "08:00", "close": "18:00"}, "thu": {"open": "08:00", "close": "18:00"}, "fri": {"open": "08:00", "close": "18:00"}, "sat": {"open": "09:00", "close": "16:00"}, "sun": {"open": "closed", "close": "closed"}}'),
('Čokoládovna', 'Eliščino nábřeží 12, Hradec Králové', 'Ráj pro milovníky čokolády v srdci HK.', 50.2089, 15.8341, true, 'střední', false, true, false, false, '{"mon": {"open": "10:00", "close": "19:00"}, "tue": {"open": "10:00", "close": "19:00"}, "wed": {"open": "10:00", "close": "19:00"}, "thu": {"open": "10:00", "close": "19:00"}, "fri": {"open": "10:00", "close": "20:00"}, "sat": {"open": "10:00", "close": "20:00"}, "sun": {"open": "13:00", "close": "18:00"}}'),
('Kavárna U Kocoura', 'Velké náměstí 123, Hradec Králové', 'Historická kavárna s útulnou atmosférou. Oblíbené místo místních umělců.', 50.2092, 15.8328, true, 'tiché', true, true, false, true, '{"mon": {"open": "08:00", "close": "20:00"}, "tue": {"open": "08:00", "close": "20:00"}, "wed": {"open": "08:00", "close": "20:00"}, "thu": {"open": "08:00", "close": "20:00"}, "fri": {"open": "08:00", "close": "22:00"}, "sat": {"open": "09:00", "close": "22:00"}, "sun": {"open": "10:00", "close": "18:00"}}'),
('Espresso Bar HK', 'Gočárova třída 501, Hradec Králové', 'Moderní specialty kavárna s vlastní pražírnou.', 50.2105, 15.8256, true, 'střední', false, false, true, false, '{"mon": {"open": "07:00", "close": "18:00"}, "tue": {"open": "07:00", "close": "18:00"}, "wed": {"open": "07:00", "close": "18:00"}, "thu": {"open": "07:00", "close": "18:00"}, "fri": {"open": "07:00", "close": "19:00"}, "sat": {"open": "08:00", "close": "17:00"}, "sun": {"open": "closed", "close": "closed"}}'),
('Café Mozart', 'Třída ČSA 200, Hradec Králové', 'Elegantní kavárna s vynikajícími zákusky přímo z vlastní cukrárny.', 50.2078, 15.8345, true, 'střední', true, true, false, false, '{"mon": {"open": "09:00", "close": "21:00"}, "tue": {"open": "09:00", "close": "21:00"}, "wed": {"open": "09:00", "close": "21:00"}, "thu": {"open": "09:00", "close": "21:00"}, "fri": {"open": "09:00", "close": "22:00"}, "sat": {"open": "10:00", "close": "22:00"}, "sun": {"open": "10:00", "close": "20:00"}}'),
('Studentská kavárna', 'Hradecká 1227, Hradec Králové', 'Příjemná kavárna u univerzity s rychlým WiFi a studentskými cenami.', 50.2034, 15.8312, true, 'hlučné', true, true, false, false, '{"mon": {"open": "07:30", "close": "22:00"}, "tue": {"open": "07:30", "close": "22:00"}, "wed": {"open": "07:30", "close": "22:00"}, "thu": {"open": "07:30", "close": "22:00"}, "fri": {"open": "07:30", "close": "23:00"}, "sat": {"open": "10:00", "close": "23:00"}, "sun": {"open": "12:00", "close": "20:00"}}'),
('Bio Caffé', 'Malé náměstí 78, Hradec Králové', 'Organická kavárna s bio kávou a veganskými možnostmi.', 50.2088, 15.8290, true, 'tiché', true, true, true, false, '{"mon": {"open": "08:00", "close": "19:00"}, "tue": {"open": "08:00", "close": "19:00"}, "wed": {"open": "08:00", "close": "19:00"}, "thu": {"open": "08:00", "close": "19:00"}, "fri": {"open": "08:00", "close": "20:00"}, "sat": {"open": "09:00", "close": "18:00"}, "sun": {"open": "10:00", "close": "17:00"}}')
ON CONFLICT (name) DO UPDATE SET
  address = EXCLUDED.address,
  description = EXCLUDED.description,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  has_wifi = EXCLUDED.has_wifi,
  noise_level = EXCLUDED.noise_level,
  good_for_study = EXCLUDED.good_for_study,
  has_food = EXCLUDED.has_food,
  is_specialty = EXCLUDED.is_specialty,
  is_historic = EXCLUDED.is_historic,
  opening_hours = EXCLUDED.opening_hours;
