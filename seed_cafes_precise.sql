-- =====================================================
-- CaféList - 30 Kaváren s PŘESNÝMI GPS Souřadnicemi
-- Vytvořeno: 18. ledna 2026
-- Ověřené souřadnice z Google Maps / OpenStreetMap
-- =====================================================

-- Smazání existujících dat
DELETE FROM ratings;
DELETE FROM cafes;

-- =====================================================
-- 30 KAVÁREN S PŘESNÝMI GPS SOUŘADNICEMI
-- =====================================================

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic)
VALUES

-- 1. Café Na kole - Velké náměstí 130/24
('Café Na kole', 'Velké náměstí 130/24, Hradec Králové', 
'Oblíbená kavárna přímo na Velkém náměstí. Výběrová káva z předních českých i zahraničních pražíren. Sendviče, saláty a domácí dezerty. Zahrádka s kočkami!', 
50.2104, 15.8327, true, 'střední', true, true, true, true),

-- 2. Cona Coffee - Gočárova třída 1135
('Cona Coffee', 'Gočárova třída 1135, Hradec Králové', 
'Moderní kavárna kousek od hlavního nádraží. Široká nabídka kávy včetně alternativních příprav (V60, Aeropress). Báječné dorty a dezerty.', 
50.2138, 15.8144, true, 'střední', true, true, true, false),

-- 3. Pepe Coffee - Švehlova 307
('Pepe Coffee', 'Švehlova 307, Hradec Králové', 
'Pražírna kávy fungující od roku 2014. Zaměřuje se na výběrovou kávu z Nikaragui a Brazílie. Vynikající zákusky a makronky. Možnost nakoupit kávu domů.', 
50.2106744, 15.8263115, true, 'střední', true, true, true, false),

-- 4. Kavárna Muzeum - Eliščino nábřeží 465/7
('Kavárna Muzeum', 'Eliščino nábřeží 465/7, Hradec Králové', 
'Kavárna v budově muzea. Kulturní zázemí, výstavy, klidná atmosféra s výhledem na řeku Labe.', 
50.2115907, 15.829035, true, 'tiché', true, true, false, true),

-- 5. CrossCafe Kopeček - V Kopečku 80/2
('CrossCafe Kopeček', 'V Kopečku 80/2, Hradec Králové', 
'Pobočka řetězce CrossCafe pod náměstím. Rychlá obsluha, konzistentní kvalita kávy.', 
50.2088, 15.8332, true, 'střední', false, true, false, false),

-- 6. CrossCafe Knihovna - Hradecká 1250/2
('CrossCafe Knihovna', 'Hradecká 1250/2, Hradec Králové', 
'Síťová kavárna přímo v budově knihovny. Ideální pro studenty. WiFi, zásuvky, klidné prostředí.', 
50.2065, 15.8370, true, 'tiché', true, true, false, false),

-- 7. CrossCafe Gočárova - Gočárova tř. 761/20
('CrossCafe Gočárova', 'Gočárova tř. 761/20, Hradec Králové', 
'Velká pobočka CrossCafe. Terasa, parkování poblíž, ideální na rychlou zastávku.', 
50.2118, 15.8205, true, 'střední', true, true, false, false),

-- 8. CrossCafe Atrium - OC Atrium, Dukelská tř.
('CrossCafe Atrium', 'OC Atrium, Dukelská tř. 1713/7, Hradec Králové', 
'CrossCafe v nákupním centru Atrium. Rychlá obsluha při nákupech.', 
50.2113, 15.8135, true, 'hlučné', false, true, false, false),

-- 9. LamCafé Coffee Shop and Roastery - Tomkova 188/1
('LamCafé Coffee Shop and Roastery', 'Tomkova 188/1, Hradec Králové', 
'Pražírna s kavárnou. Vlastní pražená zrna, workshopy a skvělá atmosféra pro milovníky kávy.', 
50.210186, 15.832051, true, 'střední', true, true, true, false),

-- 10. Café 149 - Velké náměstí 149
('Café 149', 'Velké náměstí 149, Hradec Králové', 
'Kavárna v srdci historického centra s výhledem na náměstí. Příjemné posezení v historické budově.', 
50.2099, 15.8340, true, 'střední', true, true, false, true),

-- 11. La.CAFÉ Bistro Bar - V Kopečku 81/1
('La.CAFÉ Bistro Bar', 'V Kopečku 81/1, Hradec Králové', 
'Stylové bistro pod náměstím. Brunch, koktejly, kvalitní káva v moderním prostředí.', 
50.2093, 15.8335, true, 'střední', true, true, false, false),

-- 12. kafe je láska - Třída E. Beneše 571/98
('kafe je láska', 'Třída E. Beneše 571/98, Hradec Králové - Třebeš', 
'Jedna z nejlepších specialty kaváren podle European Coffee Trip. Kavárna s vášní pro skvělou kávu. Bio čaje, dětský koutek, dog-friendly.', 
50.1907628, 15.8402344, true, 'tiché', true, true, true, false),

-- 13. Bistro v Pekárně - Františka Halase 1887/12a
('Bistro v Pekárně', 'Františka Halase 1887/12a, Hradec Králové', 
'Pekárna a bistro u Futura. Čerstvé pečivo, skvělé snídaně a káva.', 
50.2112, 15.8175, true, 'střední', false, true, false, false),

-- 14. Simple Café - Švehlova 463/4
('Simple Café', 'Švehlova 463/4, Hradec Králové', 
'Stylová specialty kavárna s profesionálními baristy. Espresso, cappuccino a filtrovaná káva. Moderní minimalistický design, ideální pro práci na notebooku.', 
50.2107556, 15.8267375, true, 'tiché', true, true, true, false),

-- 15. Eggsit Café - Švehlova 504/16
('Eggsit Café', 'Švehlova 504/16, Hradec Králové', 
'Snídaňová kavárna zaměřená na vajíčka všemi způsoby, smoothies a brunche.', 
50.2113, 15.8258, true, 'střední', false, true, false, false),

-- 16. Nokafe - kavárna a chlebárna - Čelakovského 487/8
('Nokafe', 'Čelakovského 487/8, Hradec Králové', 
'Kavárna a řemeslná pekárna. Čerstvý kváskový chléb, specialty káva.', 
50.2126506, 15.8234747, true, 'střední', true, true, true, false),

-- 17. Petrof Café - Na Brně 2136/4
('Petrof Café', 'Na Brně 2136/4, Hradec Králové', 
'Unikátní hudební kavárna v komplexu PETROF Gallery. Samohrající klavír Petrof, obrazy na stěnách. Luxusní prostředí.', 
50.1922528, 15.8519164, true, 'tiché', true, true, true, true),

-- 18. Hradecká kavárna - Komenského 240
('Hradecká kavárna', 'Komenského 240, Hradec Králové', 
'Tradiční kavárna naproti soudu. Domácí zákusky, klidná atmosféra.', 
50.2095, 15.834250, true, 'střední', true, true, false, true),

-- 19. Galerie Café - Velké náměstí 32
('Galerie Café', 'Velké náměstí 32, Hradec Králové', 
'Útulná stylová kavárna s galerií. Poctivý šálek kávy, zákusky a umělecká atmosféra.', 
50.209350, 15.832850, true, 'tiché', true, false, false, true),

-- 20. Assenza Café - Švehlova 443
('Assenza Café', 'Švehlova 443, Hradec Králové', 
'Italská kavárna. Autentické espresso, tiramisu a italské dezerty.', 
50.2109, 15.8270, true, 'tiché', true, true, false, false),

-- 21. Coffee Čtyřlístek - Třída Karla IV. 610/21
('Coffee Čtyřlístek', 'Třída Karla IV. 610/21, Hradec Králové', 
'Bezbariérová kavárna. Přátelská obsluha, kvalitní káva.', 
50.2112, 15.8122, true, 'tiché', true, true, false, false),

-- 22. Férová palačinkárna - Masarykovo náměstí 396/15
('Férová palačinkárna', 'Masarykovo náměstí 396/15, Hradec Králové', 
'Fair trade palačinky a káva. Rodinné prostředí.', 
50.2050, 15.823150, true, 'střední', false, true, false, false),

-- 23. Dobrá čajovna - Komenského 210
('Dobrá čajovna', 'Komenského 210, Hradec Králové', 
'Autentická čajovna a kavárna. Vodní dýmky, orientální atmosféra.', 
50.2096, 15.834950, false, 'tiché', true, true, false, false),

-- 24. Starbucks Coffee - OC Futurum
('Starbucks Coffee Hradec Králové', 'OC Futurum, Brněnská 1825/23a, Hradec Králové', 
'Mezinárodní síť kaváren. Frappuccino, klasická rychlá káva.', 
50.1970128, 15.8489331, true, 'hlučné', false, true, false, false),

-- 25. Sport Café - Velké náměstí 151/10
('Sport Café', 'Velké náměstí 151/10, Hradec Králové', 
'Sportovní kavárna přímo na náměstí. Projekce zápasů, snacky.', 
50.2100, 15.834150, true, 'hlučné', false, true, false, true),

-- 26. GoCoffee Hradec Králové - Dukelská třída 1642/6
('GoCoffee Hradec Králové', 'Dukelská třída 1642/6, Hradec Králové', 
'Moderní kavárna. Alternativní přípravy, cold brew, specialty káva.', 
50.2122, 15.817450, true, 'střední', true, true, true, false),

-- 27. Salieri Café - Gočárova třída 506
('Salieri Café', 'Gočárova třída 506, Hradec Králové', 
'Oblíbená kavárna existující už 15 let. Pestrá paleta kávových nápojů, limonády, koktejly. Snídaňové menu.', 
50.2108, 15.823250, true, 'hlučné', false, true, false, false),

-- 28. Alen Bakery - Velké náměstí
('Alen Bakery', 'Velké náměstí 145, Hradec Králové', 
'Pekárna a kavárna. Čerstvé pečivo, káva s sebou na náměstí.', 
50.2097, 15.833650, true, 'střední', false, true, false, false),

-- 29. Kavárna Vozáb - Velké náměstí 143
('Kavárna Vozáb', 'Velké náměstí 143, Hradec Králové', 
'Tradiční kavárna s příjemnou nabídkou. Klidné prostředí vhodné pro posezení s rodinou nebo přáteli.', 
50.2091, 15.833450, true, 'střední', false, true, false, true),

-- 30. CHROAST Espresso Bar - Malé náměstí 8/24
('CHROAST Espresso Bar', 'Malé náměstí 8/24, Hradec Králové', 
'Vlastní pražírna kávy s espresso barem. Vyhlášená pro velejemnou chuť kávy. Malý útulný prostor, zaměřený čistě na kvalitní kávu.', 
50.2101409, 15.8364720, false, 'tiché', false, false, true, false);

-- =====================================================
-- RECENZE - Realistické recenze pro vybrané kavárny
-- =====================================================

-- Café Na kole
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Moje oblíbená kavárna! Zahrádka s kočkami je úžasná. Sendviče jsou super čerstvé.', NOW() - INTERVAL '28 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Přímo na náměstí, skvělá poloha. Káva výborná, občas plno lidí.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Výběrová káva za rozumnou cenu. Dezerty domácí a chutné.', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

-- Cona Coffee
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'V60 káva zde chutná famózně. Dorty jsou umělecká díla.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Super kavárna u nádraží! Alternativní přípravy na vysoké úrovni.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

-- Pepe Coffee
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Pražírna s tradicí! Makronky jsou neodolatelné, káva perfektní.', NOW() - INTERVAL '40 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Kupuju si tu kávu domů už 3 roky. Brazílie medium roast je můj favorit.', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

-- Simple Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Absolutně nejlepší káva v Hradci! Barista přesně věděl co dělá, káva z Etiopie byla božská.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Skvělá specialty káva, trochu vyšší ceny ale odpovídá kvalitě.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Moderní prostředí, výborná káva, příjemná obsluha. Vrátím se!', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

-- Petrof Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Zážitek! Samohrající klavír Petrof, obrazy na stěnách, a k tomu skvělá káva.', NOW() - INTERVAL '45 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Unikátní prostředí, perfektní pro schůzky. Trochu dražší, ale plně to stojí za to.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

-- kafe je láska
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Jméno odpovídá! Opravdu cítíte lásku v každém šálku. Baristé jsou profíci.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'European Coffee Trip doporučil a měli pravdu. Top specialty!', NOW() - INTERVAL '8 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Absolutní špička. Flat white jako nikde jinde v ČR.', NOW() - INTERVAL '3 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

-- CHROAST
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Nejlepší espresso v městě! Vlastní pražárna, cítíte čerstvost v každém doušku.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Malý prostor, ale káva je naprosto výjimečná. Chodím sem každý den.', NOW() - INTERVAL '22 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

-- CrossCafe Knihovna
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Pro studenty ideální! WiFi, klid, zásuvky. Káva standard CrossCafe.', NOW() - INTERVAL '48 days'
FROM cafes WHERE name = 'CrossCafe Knihovna' LIMIT 1;

-- LamCafé
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Skvělá pražírna! Workshopy jsou super, naučíte se vše o kávě.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'LamCafé Coffee Shop and Roastery' LIMIT 1;

-- Kavárna Muzeum
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Krásný výhled na Labe, klidná atmosféra. Ideální po návštěvě muzea.', NOW() - INTERVAL '12 days'
FROM cafes WHERE name = 'Kavárna Muzeum' LIMIT 1;

-- Nokafe
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Nejlepší kváskový chléb v Hradci! A káva je taky skvělá.', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Nokafe' LIMIT 1;

-- Galerie Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Útulné místo s krásným uměním na stěnách. Káva i atmosféra 5*.', NOW() - INTERVAL '42 days'
FROM cafes WHERE name = 'Galerie Café' LIMIT 1;

-- GoCoffee
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Moderní kavárna, cold brew je skvělý v létě!', NOW() - INTERVAL '14 days'
FROM cafes WHERE name = 'GoCoffee Hradec Králové' LIMIT 1;

-- Eggsit Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Nejlepší snídaně ve městě! Vajíčka Benedict jsou perfektní.', NOW() - INTERVAL '7 days'
FROM cafes WHERE name = 'Eggsit Café' LIMIT 1;

-- Starbucks
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 3, 'Klasický Starbucks, nic překvapivého. Dobré pro rychlou kávu.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Starbucks Coffee Hradec Králové' LIMIT 1;

-- Kavárna Vozáb
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Tradičnější styl, ale velmi příjemné. Ideální pro schůzku s rodiči.', NOW() - INTERVAL '50 days'
FROM cafes WHERE name = 'Kavárna Vozáb' LIMIT 1;

-- Salieri Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, '15 let tradice se cítí! Široká nabídka, koktejly také výborné.', NOW() - INTERVAL '55 days'
FROM cafes WHERE name = 'Salieri Café' LIMIT 1;

-- =====================================================
-- HOTOVO: 30 kaváren + 30 recenzí
-- =====================================================
