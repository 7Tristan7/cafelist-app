-- Aktualizace obrázků pro kavárny s rozbitými/chybějícími obrázky
-- Spustit v Supabase SQL Editoru

-- Kavárna Vozáb
UPDATE cafes 
SET image_url = '/images/kavarna-vozab.png'
WHERE name ILIKE '%Vozáb%' OR name ILIKE '%Vozab%';

-- Café Polštrin
UPDATE cafes 
SET image_url = '/images/cafe-polstrin.png'
WHERE name ILIKE '%Polštrin%' OR name ILIKE '%Polstrin%';

-- Starbucks Futurum
UPDATE cafes 
SET image_url = '/images/starbucks-hk.png'
WHERE name ILIKE '%Starbucks%' AND (name ILIKE '%Futurum%' OR name ILIKE '%HK%');

-- Ověření - zobrazí aktualizované záznamy
SELECT id, name, image_url FROM cafes 
WHERE name ILIKE '%Vozáb%' 
   OR name ILIKE '%Vozab%'
   OR name ILIKE '%Polštrin%' 
   OR name ILIKE '%Polstrin%'
   OR (name ILIKE '%Starbucks%');
