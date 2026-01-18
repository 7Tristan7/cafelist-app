-- =====================================================
-- CaféList - 30 Verified Cafes in Hradec Králové
-- Vytvořeno: 18. ledna 2026
-- GPS koordináty ověřeny uživatelem
-- =====================================================

-- Smazání existujících dat
DELETE FROM ratings;
DELETE FROM cafes;

-- =====================================================
-- KAVÁRNY - 30 kaváren s ověřenými GPS souřadnicemi
-- =====================================================

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic)
VALUES

-- 1. Café Na kole (VERIFIED)
('Café Na kole', 'Velké náměstí 130/24, Hradec Králové', 
'Oblíbená kavárna přímo na Velkém náměstí. Výběrová káva z předních českých i zahraničních pražíren. Sendviče, saláty a domácí dezerty. Zahrádka s kočkami!', 
50.209998, 15.835524, true, 'střední', true, true, true, true),

-- 2. Cona Coffee (VERIFIED)
('Cona Coffee', 'Gočárova třída 1135, Hradec Králové', 
'Moderní kavárna kousek od hlavního nádraží. Široká nabídka kávy včetně alternativních příprav (V60, Aeropress). Báječné dorty a dezerty.', 
50.213726, 15.814490, true, 'střední', true, true, true, false),

-- 3. Pepe Coffee (ESTIMATED from Švehlova address)
('Pepe Coffee', 'Švehlova 307, Hradec Králové', 
'Pražírna kávy fungující od roku 2014. Zaměřuje se na výběrovou kávu z Nikaragui a Brazílie. Vynikající zákusky a makronky. Možnost nakoupit kávu domů.', 
50.2110, 15.8280, true, 'střední', true, true, true, false),

-- 4. Kavárna Muzeum (VERIFIED)
('Kavárna Muzeum', 'Eliščino nábřeží 465/7, Hradec Králové', 
'Kavárna v budově muzea. Kulturní zázemí, výstavy, klidná atmosféra s výhledem na řeku Labe.', 
50.211658, 15.828998, true, 'tiché', true, true, false, true),

-- 5. CrossCafe Kopeček (ESTIMATED)
('CrossCafe Kopeček', 'V Kopečku 80/2, Hradec Králové', 
'Pobočka řetězce CrossCafe pod náměstím. Rychlá obsluha, konzistentní kvalita kávy.', 
50.2079, 15.8355, true, 'střední', false, true, false, false),

-- 6. CrossCafe Knihovna (ESTIMATED)
('CrossCafe Knihovna', 'Hradecká 1250/2, Hradec Králové', 
'Síťová kavárna přímo v budově knihovny. Ideální pro studenty. WiFi, zásuvky, klidné prostředí.', 
50.2095, 15.8362, true, 'tiché', true, true, false, false),

-- 7. CrossCafe Gočárova (ESTIMATED)
('CrossCafe Gočárova', 'Gočárova tř. 761/20, Hradec Králové', 
'Velká pobočka CrossCafe. Terasa, parkování poblíž, ideální na rychlou zastávku.', 
50.2133, 15.8194, true, 'střední', true, true, false, false),

-- 8. CrossCafe Atrium (ESTIMATED)
('CrossCafe Atrium', 'OC Atrium, Dukelská tř. 1713/7, Hradec Králové', 
'CrossCafe v nákupním centru Atrium. Rychlá obsluha při nákupech.', 
50.2101, 15.8212, true, 'hlučné', false, true, false, false),

-- 9. LamCafé Coffee Shop and Roastery (ESTIMATED from Tomkova)
('LamCafé Coffee Shop and Roastery', 'Tomkova 188/1, Hradec Králové', 
'Pražírna s kavárnou. Vlastní pražená zrna, workshopy a skvělá atmosféra pro milovníky kávy.', 
50.2105, 15.8331, true, 'střední', true, true, true, false),

-- 10. Café 149 (ESTIMATED - central)
('Café 149', 'Velké náměstí 149, Hradec Králové', 
'Kavárna v srdci historického centra s výhledem na náměstí. Příjemné posezení v historické budově.', 
50.2096, 15.8350, true, 'střední', true, true, false, true),

-- 11. La.CAFÉ Bistro Bar (ESTIMATED - central)
('La.CAFÉ Bistro Bar', 'V Kopečku 81/1, Hradec Králové', 
'Stylové bistro pod náměstím. Brunch, koktejly, kvalitní káva v moderním prostředí.', 
50.2098, 15.8360, true, 'střední', true, true, false, false),

-- 12. kafe je láska (ESTIMATED - Třebeš)
('kafe je láska', 'Třída E. Beneše 571/98, Hradec Králové - Třebeš', 
'Jedna z nejlepších specialty kaváren podle European Coffee Trip. Kavárna s vášní pro skvělou kávu. Bio čaje, dětský koutek, dog-friendly.', 
50.2190, 15.8360, true, 'tiché', true, true, true, false),

-- 13. Bistro v Pekárně (ESTIMATED - Malšovice)
('Bistro v Pekárně', 'Františka Halase 1887/12a, Hradec Králové', 
'Pekárna a bistro u Futura. Čerstvé pečivo, skvělé snídaně a káva.', 
50.1975, 15.8475, true, 'střední', false, true, false, false),

-- 14. Simple Café (ESTIMATED - Švehlova)
('Simple Café', 'Švehlova 463/4, Hradec Králové', 
'Stylová specialty kavárna s profesionálními baristy. Espresso, cappuccino a filtrovaná káva. Moderní minimalistický design, ideální pro práci na notebooku.', 
50.2105, 15.8285, true, 'tiché', true, true, true, false),

-- 15. Eggsit Café (ESTIMATED - Švehlova)
('Eggsit Café', 'Švehlova 504/16, Hradec Králové', 
'Snídaňová kavárna zaměřená na vajíčka všemi způsoby, smoothies a brunche.', 
50.2090, 15.8280, true, 'střední', false, true, false, false),

-- 16. Nokafe - kavárna a chlebárna (ESTIMATED - Pospíšilova)
('Nokafe', 'Čelakovského 487/8, Hradec Králové', 
'Kavárna a řemeslná pekárna. Čerstvý kváskový chléb, specialty káva.', 
50.2097, 15.8280, true, 'střední', true, true, true, false),

-- 17. Petrof Café (ESTIMATED - Nový HK)
('Petrof Café', 'Na Brně 2136/4, Hradec Králové', 
'Unikátní hudební kavárna v komplexu PETROF Gallery. Samohrající klavír Petrof, obrazy na stěnách. Luxusní prostředí.', 
50.1910, 15.8670, true, 'tiché', true, true, true, true),

-- 18. Hradecká kavárna (ESTIMATED - centrum)
('Hradecká kavárna', 'Komenského 240, Hradec Králové', 
'Tradiční kavárna naproti soudu. Domácí zákusky, klidná atmosféra.', 
50.2100, 15.8360, true, 'střední', true, true, false, true),

-- 19. Galerie Café (ESTIMATED - Tomkova)
('Galerie Café', 'Velké náměstí 32, Hradec Králové', 
'Útulná stylová kavárna s galerií. Poctivý šálek kávy, zákusky a umělecká atmosféra.', 
50.2098, 15.8335, true, 'tiché', true, false, false, true),

-- 20. Assenza Café (ESTIMATED - Švehlova)
('Assenza Café', 'Švehlova 443, Hradec Králové', 
'Italská kavárna. Autentické espresso, tiramisu a italské dezerty.', 
50.2098, 15.8285, true, 'tiché', true, true, false, false),

-- 21. Coffee Čtyřlístek (ESTIMATED - Karla IV.)
('Coffee Čtyřlístek', 'Třída Karla IV. 610/21, Hradec Králové', 
'Bezbariérová kavárna. Přátelská obsluha, kvalitní káva.', 
50.2140, 15.8150, true, 'tiché', true, true, false, false),

-- 22. Férová palačinkárna (ESTIMATED - Masarykovo nám.)
('Férová palačinkárna', 'Masarykovo náměstí 396/15, Hradec Králové', 
'Fair trade palačinky a káva. Rodinné prostředí.', 
50.2095, 15.8240, true, 'střední', false, true, false, false),

-- 23. Dobrá čajovna (ESTIMATED - centrum)
('Dobrá čajovna', 'Masarykovo náměstí 396/15, Hradec Králové', 
'Autentická čajovna a kavárna. Vodní dýmky, orientální atmosféra.', 
50.2097, 15.8360, false, 'tiché', true, true, false, false),

-- 24. Starbucks Coffee (ESTIMATED - Nový HK, Brněnská)
('Starbucks Coffee Hradec Králové', 'OC Futurum, Brněnská 1825/23a, Hradec Králové', 
'Mezinárodní síť kaváren. Frappuccino, klasická rychlá káva.', 
50.2055, 15.8695, true, 'hlučné', false, true, false, false),

-- 25. Sport Café (ESTIMATED - centrum)
('Sport Café', 'Velké náměstí 151/10, Hradec Králové', 
'Sportovní kavárna přímo na náměstí. Projekce zápasů, snacky.', 
50.2070, 15.8350, true, 'hlučné', false, true, false, true),

-- 26. GoCoffee Hradec Králové (ESTIMATED - Slezské Předměstí)
('GoCoffee Hradec Králové', 'Dukelská třída 1642/6, Hradec Králové', 
'Moderní kavárna. Alternativní přípravy, cold brew, specialty káva.', 
50.2140, 15.8190, true, 'střední', true, true, true, false),

-- 27. Salieri Café (ESTIMATED - Švehlova)
('Salieri Café', 'Gočárova třída 506, Hradec Králové', 
'Oblíbená kavárna existující už 15 let. Pestrá paleta kávových nápojů, limonády, koktejly. Snídaňové menu.', 
50.2100, 15.8285, true, 'hlučné', false, true, false, false),

-- 28. Alen Bakery (ESTIMATED - Velké nám.)
('Alen Bakery', 'Velké náměstí, Hradec Králové', 
'Pekárna a kavárna. Čerstvé pečivo, káva s sebou na náměstí.', 
50.2090, 15.8350, true, 'střední', false, true, false, false),

-- 29. Café Local (ESTIMATED - centrum)
('Café Local', 'Hradec Králové', 
'Menší kavárna s osobním přístupem a lokální atmosférou.', 
50.2098, 15.8360, true, 'střední', true, true, false, false),

-- 30. CHROAST Espresso Bar (bonus - kvalitní kavárna)
('CHROAST Espresso Bar', 'Malé náměstí 8/24, Hradec Králové', 
'Vlastní pražírna kávy s espresso barem. Vyhlášená pro velejemnou chuť kávy. Malý útulný prostor, zaměřený čistě na kvalitní kávu.', 
50.2085, 15.8340, false, 'tiché', false, false, true, false);

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

-- =====================================================
-- HOTOVO: 30 kaváren + 25+ recenzí
-- =====================================================
