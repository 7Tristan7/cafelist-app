-- =====================================================
-- SQL SKRIPT PRO PŘIDÁNÍ OBRÁZKŮ KE KAVÁRNÁM
-- =====================================================
-- INSTRUKCE:
-- 1. Otevři Supabase Dashboard: https://supabase.com/dashboard
-- 2. Vyber projekt "hk cafe"
-- 3. Jdi do SQL Editor
-- 4. Zkopíruj a vlož celý tento skript
-- 5. Klikni na "Run" (nebo Ctrl+Enter)
-- =====================================================

-- Aktualizace obrázků pro všechny kavárny cyklicky
WITH image_urls AS (
  SELECT * FROM (VALUES
    (1, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop'),
    (2, 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'),
    (3, 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop'),
    (4, 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=300&fit=crop'),
    (5, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'),
    (6, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'),
    (7, 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop'),
    (8, 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop'),
    (9, 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=300&fit=crop'),
    (10, 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&h=300&fit=crop'),
    (11, 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop'),
    (12, 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop'),
    (13, 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=300&fit=crop'),
    (14, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop'),
    (15, 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop'),
    (16, 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=400&h=300&fit=crop'),
    (17, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop'),
    (18, 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=400&h=300&fit=crop'),
    (19, 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&h=300&fit=crop'),
    (20, 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=300&fit=crop'),
    (21, 'https://images.unsplash.com/photo-1524081684673-faa13f6e8a58?w=400&h=300&fit=crop'),
    (22, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'),
    (23, 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop'),
    (24, 'https://images.unsplash.com/photo-1554116154-e92f78a3e0fb?w=400&h=300&fit=crop'),
    (25, 'https://images.unsplash.com/photo-1501747315-124a0eaca060?w=400&h=300&fit=crop'),
    (26, 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop'),
    (27, 'https://images.unsplash.com/photo-1462917882517-e150c5ce02c2?w=400&h=300&fit=crop'),
    (28, 'https://images.unsplash.com/photo-1516486392848-8b67ef89f113?w=400&h=300&fit=crop'),
    (29, 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=400&h=300&fit=crop'),
    (30, 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=400&h=300&fit=crop'),
    (31, 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=400&h=300&fit=crop')
  ) AS t(idx, url)
),
numbered_cafes AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) as rn
  FROM cafes
)
UPDATE cafes c
SET image_url = i.url
FROM numbered_cafes nc
JOIN image_urls i ON ((nc.rn - 1) % 31) + 1 = i.idx
WHERE c.id = nc.id;

-- Kontrola výsledku - zobrazí všechny kavárny s jejich obrázky
SELECT id, name, image_url 
FROM cafes 
ORDER BY id;
