-- =====================================================
-- CaféList - OPRAVA VŠECH GPS souřadnic
-- Březen 2026
-- Zdroje: mapy.com, maptons.com, firmy.cz, Google Maps
-- =====================================================
-- SPUSŤ CELÝ TENTO SKRIPT v Supabase SQL Editoru!
-- =====================================================

-- 1. Simple Café - Švehlova 463/4
-- Zdroj: mapy.com (50.2107556, 15.8267375)
UPDATE cafes 
SET latitude = 50.2107556, longitude = 15.8267375
WHERE name ILIKE '%Simple%Caf%';

-- 2. Café Na kole - Velké náměstí 130/24
-- Zdroj: Velké náměstí, centrum HK
UPDATE cafes 
SET latitude = 50.2104, longitude = 15.8327
WHERE name ILIKE '%Na kole%';

-- 3. CHROAST Espresso Bar - Malé náměstí 8/24
-- Zdroj: maptons.com (50.2101409, 15.8364720)
UPDATE cafes 
SET latitude = 50.2101409, longitude = 15.8364720
WHERE name ILIKE '%CHROAST%';

-- 4. Pepe Coffee - Švehlova 307
-- Zdroj: maptons.com (50.2106744, 15.8263115)
UPDATE cafes 
SET latitude = 50.2106744, longitude = 15.8263115
WHERE name ILIKE '%Pepe%';

-- 5. Petrof Café - Na Brně 2136/4
-- Zdroj: apetee.com (50.1922528, 15.8519164)
UPDATE cafes 
SET latitude = 50.1922528, longitude = 15.8519164
WHERE name ILIKE '%Petrof%';

-- 6. Cona Coffee - Gočárova třída 1135
-- Zdroj: east-bohemia.info (50°12'49.59"N, 15°48'51.92"E → 50.2138, 15.8144)
UPDATE cafes 
SET latitude = 50.2138, longitude = 15.8144
WHERE name ILIKE '%Cona%Coffee%';

-- 7. Kavárna Vozáb - Velké náměstí 143
-- Na Velkém náměstí, blízko ostatních kaváren
UPDATE cafes 
SET latitude = 50.2098, longitude = 15.8335
WHERE name ILIKE '%Vozáb%';

-- 8. Kavárna Muzeum - Eliščino nábřeží 465/7
-- Zdroj: near-place.com (50.2115907, 15.829035)
UPDATE cafes 
SET latitude = 50.2115907, longitude = 15.8290350
WHERE name ILIKE '%Muzeum%';

-- 9. LamCafé - Tomkova 188/1
-- Zdroj: mapy.com (50.210186, 15.832051)
UPDATE cafes 
SET latitude = 50.210186, longitude = 15.832051
WHERE name ILIKE '%LamCaf%';

-- 10. Café 149 - Velké náměstí 149
-- Na Velkém náměstí
UPDATE cafes 
SET latitude = 50.2099, longitude = 15.8340
WHERE name ILIKE '%Café 149%' OR name ILIKE '%Cafe 149%';

-- 11. La.CAFÉ Bistro Bar / La Café - V Kopečku 81/1 / Velké náměstí
UPDATE cafes 
SET latitude = 50.2093, longitude = 15.8330
WHERE name ILIKE '%La.%Caf%' OR (name ILIKE '%La Caf%' AND name NOT ILIKE '%LamCaf%');

-- 12. kafe je láska - Třída E. Beneše 571/98
-- Zdroj: mapy.com (50.1907628, 15.8402344)
UPDATE cafes 
SET latitude = 50.1907628, longitude = 15.8402344
WHERE name ILIKE '%kafe je láska%';

-- 13. Bistro v Pekárně / Café V Pekárně - Gočárova
UPDATE cafes 
SET latitude = 50.2112, longitude = 15.8175
WHERE name ILIKE '%Pekárn%' OR name ILIKE '%Pekarn%';

-- 14. Eggsit Café - Švehlova 504/16
-- Zdroj: maptons.com (50.2113, 15.8258)
UPDATE cafes 
SET latitude = 50.2113, longitude = 15.8258
WHERE name ILIKE '%Eggsit%';

-- 15. Nokafe - Čelakovského 487/8
-- Zdroj: kurzy.cz (50.2126506, 15.8234747)
UPDATE cafes 
SET latitude = 50.2126506, longitude = 15.8234747
WHERE name ILIKE '%Nokafe%';

-- 16. Galerie Café - Velké náměstí 32
-- Na Velkém náměstí
UPDATE cafes 
SET latitude = 50.2095, longitude = 15.8322
WHERE name ILIKE '%Galerie%Caf%';

-- 17. CrossCafe Kopeček - V Kopečku 80/2
-- Pod Velkým náměstím
UPDATE cafes 
SET latitude = 50.2088, longitude = 15.8332
WHERE name ILIKE '%CrossCafe%Kopeč%' OR name ILIKE '%CrossCafe%Kopec%';

-- 18. CrossCafe Knihovna - Hradecká / Hradební
UPDATE cafes 
SET latitude = 50.2065, longitude = 15.8370
WHERE name ILIKE '%CrossCafe%Knihov%';

-- 19. CrossCafe Gočárova - Gočárova tř. 761/20
UPDATE cafes 
SET latitude = 50.2118, longitude = 15.8205
WHERE name ILIKE '%CrossCafe%Gočár%' OR name ILIKE '%CrossCafe%Gocar%';

-- 20. CrossCafe Atrium - OC Atrium, Dukelská tř.
UPDATE cafes 
SET latitude = 50.2113, longitude = 15.8135
WHERE name ILIKE '%CrossCafe%Atrium%';

-- 21. Starbucks Coffee - OC Futurum, Brněnská 1825/23a
-- Zdroj: mapy.com (50.1970128, 15.8489331)
UPDATE cafes 
SET latitude = 50.1970128, longitude = 15.8489331
WHERE name ILIKE '%Starbucks%';

-- 22. Sport Café - Velké náměstí 151/10
UPDATE cafes 
SET latitude = 50.2100, longitude = 15.8338
WHERE name ILIKE '%Sport%Caf%';

-- 23. GoCoffee - Dukelská třída 1642/6
UPDATE cafes 
SET latitude = 50.2122, longitude = 15.8150
WHERE name ILIKE '%GoCoffee%';

-- 24. Salieri Café - Gočárova třída 506
UPDATE cafes 
SET latitude = 50.2108, longitude = 15.8215
WHERE name ILIKE '%Salieri%';

-- 25. Alen Bakery - Velké náměstí 145
UPDATE cafes 
SET latitude = 50.2097, longitude = 15.8330
WHERE name ILIKE '%Alen%Bak%';

-- 26. Hradecká kavárna - Komenského 240
UPDATE cafes 
SET latitude = 50.2095, longitude = 15.8350
WHERE name ILIKE '%Hradecká kavárna%';

-- 27. Assenza Café - Švehlova 443
UPDATE cafes 
SET latitude = 50.2109, longitude = 15.8270
WHERE name ILIKE '%Assenza%';

-- 28. Coffee Čtyřlístek - Třída Karla IV. 610/21
UPDATE cafes 
SET latitude = 50.2112, longitude = 15.8122
WHERE name ILIKE '%Čtyřlístek%' OR name ILIKE '%Ctyrlistek%';

-- 29. Férová palačinkárna - Masarykovo náměstí 396/15
UPDATE cafes 
SET latitude = 50.2050, longitude = 15.8250
WHERE name ILIKE '%palačink%' OR name ILIKE '%palacink%';

-- 30. Dobrá čajovna - Komenského 210
UPDATE cafes 
SET latitude = 50.2092, longitude = 15.8355
WHERE name ILIKE '%čajovna%' OR name ILIKE '%cajovna%';

-- Další kavárny z seed_cafes_hradec.sql (pokud existují v DB)

-- Diverse Café - Gočárova třída 1520
UPDATE cafes 
SET latitude = 50.2130, longitude = 15.8130
WHERE name ILIKE '%Diverse%';

-- Kafe Stánek - Hlavní nádraží
UPDATE cafes 
SET latitude = 50.2122, longitude = 15.8188
WHERE name ILIKE '%Kafe Stánek%' OR name ILIKE '%Kafe Stanek%';

-- Bio Central - Kavčí plácek 121
UPDATE cafes 
SET latitude = 50.2090, longitude = 15.8355
WHERE name ILIKE '%Bio Central%';

-- To je Bistro - Chelčického 380
UPDATE cafes 
SET latitude = 50.2075, longitude = 15.8295
WHERE name ILIKE '%To je Bistro%';

-- MOKKA ODA - Třída Karla IV. 502
UPDATE cafes 
SET latitude = 50.2102, longitude = 15.8145
WHERE name ILIKE '%MOKKA%ODA%';

-- Café Montaná - Pražská 392
UPDATE cafes 
SET latitude = 50.2055, longitude = 15.8240
WHERE name ILIKE '%Montaná%' OR name ILIKE '%Montana%';

-- Kavárna Artičok - Dukelská 1713
UPDATE cafes 
SET latitude = 50.2115, longitude = 15.8105
WHERE name ILIKE '%Artičok%' OR name ILIKE '%Articok%';

-- Café Dragon - Gočárova třída 800
UPDATE cafes 
SET latitude = 50.2110, longitude = 15.8185
WHERE name ILIKE '%Dragon%';

-- Kavárna U Elišky - Eliščino nábřeží 456
UPDATE cafes 
SET latitude = 50.2108, longitude = 15.8280
WHERE name ILIKE '%U Elišky%' OR name ILIKE '%U Elisky%';

-- =====================================================
-- OVĚŘENÍ - zkontroluj výsledky
-- =====================================================
SELECT name, address, latitude, longitude
FROM cafes
ORDER BY name;
